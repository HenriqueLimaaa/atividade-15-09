const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;
const db = new Database(path.join(__dirname, 'data', 'almoxarifado_db.sqlite'));
db.pragma('foreign_keys = ON');

db.exec(`CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, usuario TEXT NOT NULL UNIQUE, senha TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT NOT NULL UNIQUE, nome TEXT NOT NULL, categoria TEXT NOT NULL, unidade TEXT NOT NULL, estoque_atual INTEGER NOT NULL DEFAULT 0 CHECK(estoque_atual>=0), estoque_minimo INTEGER NOT NULL DEFAULT 0 CHECK(estoque_minimo>=0));
CREATE TABLE IF NOT EXISTS movimentacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, produto_id INTEGER NOT NULL, usuario_id INTEGER NOT NULL, tipo TEXT NOT NULL CHECK(tipo IN ('entrada','saida')), quantidade INTEGER NOT NULL CHECK(quantidade>0), data_movimentacao TEXT NOT NULL, FOREIGN KEY(produto_id) REFERENCES produtos(id), FOREIGN KEY(usuario_id) REFERENCES usuarios(id));`);

const count = db.prepare('SELECT COUNT(*) c FROM usuarios').get().c;
if (!count) {
  db.prepare('INSERT INTO usuarios (nome,usuario,senha) VALUES (?,?,?)').run('Administrador','admin','1234');
  db.prepare('INSERT INTO usuarios (nome,usuario,senha) VALUES (?,?,?)').run('Lucas','lucas','1234');
  db.prepare('INSERT INTO usuarios (nome,usuario,senha) VALUES (?,?,?)').run('Operador','operador','1234');
}
if (db.prepare('SELECT COUNT(*) c FROM produtos').get().c === 0) {
  const ins = db.prepare('INSERT INTO produtos (codigo,nome,categoria,unidade,estoque_atual,estoque_minimo) VALUES (?,?,?,?,?,?)');
  ins.run('CX001','Caixa de papelão 30x20','Embalagens','un',120,30);
  ins.run('FR001','Frasco plástico 500ml','Frascos','un',50,20);
  ins.run('TA001','Tampa plástica padrão','Tampas','un',15,20);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sessions = new Map();
function auth(req,res,next){ const token=req.headers.authorization?.replace('Bearer ',''); const user=sessions.get(token); if(!user) return res.status(401).json({erro:'Sessão expirada. Faça login novamente.'}); req.user=user; next(); }

app.post('/api/login',(req,res)=>{
  const {usuario,senha}=req.body;
  const user=db.prepare('SELECT id,nome,usuario FROM usuarios WHERE usuario=? AND senha=?').get(usuario,senha);
  if(!user) return res.status(401).json({erro:'Usuário ou senha inválidos.'});
  const token=Math.random().toString(36).slice(2)+Date.now().toString(36); sessions.set(token,user);
  res.json({token,user});
});
app.post('/api/logout',auth,(req,res)=>{ const token=req.headers.authorization.replace('Bearer ',''); sessions.delete(token); res.json({ok:true}); });

app.get('/api/dashboard',auth,(req,res)=>{
  const total=db.prepare('SELECT COUNT(*) c FROM produtos').get().c;
  const baixo=db.prepare('SELECT COUNT(*) c FROM produtos WHERE estoque_atual < estoque_minimo').get().c;
  const unidades=db.prepare('SELECT COALESCE(SUM(estoque_atual),0) s FROM produtos').get().s;
  const mov=db.prepare(`SELECT m.*,p.nome produto,u.nome responsavel FROM movimentacoes m JOIN produtos p ON p.id=m.produto_id JOIN usuarios u ON u.id=m.usuario_id ORDER BY m.id DESC LIMIT 8`).all();
  res.json({total,baixo,unidades,mov,user:req.user});
});

app.get('/api/produtos',auth,(req,res)=>{
  const q=(req.query.q||'').trim();
  const rows=q?db.prepare(`SELECT * FROM produtos WHERE codigo LIKE ? OR nome LIKE ? OR categoria LIKE ? ORDER BY nome COLLATE NOCASE`).all(`%${q}%`,`%${q}%`,`%${q}%`):db.prepare('SELECT * FROM produtos ORDER BY nome COLLATE NOCASE').all();
  res.json(rows);
});
app.post('/api/produtos',auth,(req,res)=>{
  const {codigo,nome,categoria,unidade,estoque_atual,estoque_minimo}=req.body;
  if(!codigo||!nome||!categoria||!unidade||estoque_atual===''||estoque_minimo==='') return res.status(400).json({erro:'Preencha todos os campos.'});
  const atual=Number(estoque_atual), minimo=Number(estoque_minimo);
  if(!Number.isInteger(atual)||atual<0||!Number.isInteger(minimo)||minimo<0) return res.status(400).json({erro:'Estoque deve ser um número inteiro válido.'});
  try { const r=db.prepare('INSERT INTO produtos (codigo,nome,categoria,unidade,estoque_atual,estoque_minimo) VALUES (?,?,?,?,?,?)').run(codigo.trim(),nome.trim(),categoria.trim(),unidade.trim(),atual,minimo); res.status(201).json({id:r.lastInsertRowid}); }
  catch(e){ res.status(400).json({erro:e.message.includes('UNIQUE')?'Código já cadastrado.':'Não foi possível cadastrar.'}); }
});
app.put('/api/produtos/:id',auth,(req,res)=>{
  const {codigo,nome,categoria,unidade,estoque_atual,estoque_minimo}=req.body; const atual=Number(estoque_atual), minimo=Number(estoque_minimo);
  if(!codigo||!nome||!categoria||!unidade||!Number.isInteger(atual)||atual<0||!Number.isInteger(minimo)||minimo<0) return res.status(400).json({erro:'Dados inválidos.'});
  try{db.prepare('UPDATE produtos SET codigo=?,nome=?,categoria=?,unidade=?,estoque_atual=?,estoque_minimo=? WHERE id=?').run(codigo.trim(),nome.trim(),categoria.trim(),unidade.trim(),atual,minimo,req.params.id);res.json({ok:true});}catch(e){res.status(400).json({erro:'Código já cadastrado ou dados inválidos.'});}
});
app.delete('/api/produtos/:id',auth,(req,res)=>{ try{ const n=db.prepare('DELETE FROM produtos WHERE id=?').run(req.params.id).changes; if(!n)return res.status(404).json({erro:'Produto não encontrado.'});res.json({ok:true}); }catch(e){res.status(400).json({erro:'Não é possível excluir produto que possui movimentações.'});} });

app.post('/api/movimentacoes',auth,(req,res)=>{
  const {produto_id,tipo,quantidade,data_movimentacao}=req.body; const qtd=Number(quantidade);
  if(!produto_id||!['entrada','saida'].includes(tipo)||!Number.isInteger(qtd)||qtd<=0||!data_movimentacao) return res.status(400).json({erro:'Informe produto, tipo, quantidade e data válidos.'});
  const produto=db.prepare('SELECT * FROM produtos WHERE id=?').get(produto_id); if(!produto)return res.status(404).json({erro:'Produto não encontrado.'});
  if(tipo==='saida' && qtd>produto.estoque_atual) return res.status(400).json({erro:'Quantidade de saída maior que o estoque disponível.'});
  const novo=tipo==='entrada'?produto.estoque_atual+qtd:produto.estoque_atual-qtd;
  const tx=db.transaction(()=>{db.prepare('UPDATE produtos SET estoque_atual=? WHERE id=?').run(novo,produto_id);db.prepare('INSERT INTO movimentacoes (produto_id,usuario_id,tipo,quantidade,data_movimentacao) VALUES (?,?,?,?,?)').run(produto_id,req.user.id,tipo,qtd,data_movimentacao);});
  tx(); res.json({ok:true,alerta:tipo==='saida'&&novo<produto.estoque_minimo,estoque_atual:novo});
});
app.get('/api/movimentacoes',auth,(req,res)=>res.json(db.prepare(`SELECT m.*,p.codigo,p.nome produto,u.nome responsavel FROM movimentacoes m JOIN produtos p ON p.id=m.produto_id JOIN usuarios u ON u.id=m.usuario_id ORDER BY m.id DESC`).all()));

app.get(/.*/,(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,()=>console.log(`Sistema em http://localhost:${PORT}`));
