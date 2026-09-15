const KEY='almoxarifado_pages_v1';
const users=[{user:'admin',pass:'1234',name:'Administrador',role:'admin'},{user:'lucas',pass:'1234',name:'Lucas',role:'operador'},{user:'operador',pass:'1234',name:'Operador',role:'operador'}];
const initial={products:[
{id:1,code:'MAT-001',name:'Papel A4',category:'Escritório',unit:'pacote',qty:18,min:10},
{id:2,code:'MAT-002',name:'Caneta azul',category:'Escritório',unit:'un',qty:7,min:10},
{id:3,code:'MAT-003',name:'Luva de proteção',category:'EPI',unit:'par',qty:25,min:8},
{id:4,code:'MAT-004',name:'Cabo USB',category:'Informática',unit:'un',qty:12,min:5}],moves:[],next:5};
let state=JSON.parse(localStorage.getItem(KEY)||'null')||initial;
let session=sessionStorage.getItem('alm_user');
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function el(s){return document.querySelector(s)}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function login(){const u=el('#u').value,p=el('#p').value,found=users.find(x=>x.user===u&&x.pass===p);if(!found)return alert('Usuário ou senha inválidos.');sessionStorage.setItem('alm_user',JSON.stringify(found));session=found;render()}
function logout(){sessionStorage.removeItem('alm_user');session=null;render()}
function addProduct(){const f={code:el('#code').value.trim(),name:el('#name').value.trim(),category:el('#cat').value.trim(),unit:el('#unit').value.trim(),qty:+el('#qty').value,min:+el('#min').value};if(!f.code||!f.name||!f.category||!f.unit||f.qty<0||f.min<0)return alert('Preencha os campos corretamente.');if(state.products.some(p=>p.code===f.code))return alert('Código já cadastrado.');state.products.push({id:state.next++,...f});save();render('products')}
function move(){const id=+el('#prod').value,n=+el('#amount').value,type=el('#type').value,obs=el('#obs').value.trim(),p=state.products.find(x=>x.id===id);if(!p||n<=0)return alert('Informe uma quantidade válida.');if(type==='SAIDA'&&n>p.qty)return alert('Estoque insuficiente.');p.qty+=type==='ENTRADA'?n:-n;state.moves.unshift({id:Date.now(),product:p.name,type,amount:n,user:session.name,date:new Date().toLocaleString('pt-BR'),obs});save();render('moves')}
function delProduct(id){if(!confirm('Excluir este produto?'))return;state.products=state.products.filter(p=>p.id!==id);save();render('products')}
function render(page='dashboard'){
if(!session){el('#app').innerHTML=`<div class="wrap"><div class="card login"><h1>📦 Almoxarifado</h1><p class="muted">Sistema de Gestão de Estoque</p><input id="u" placeholder="Usuário" value="admin"><br><br><input id="p" type="password" placeholder="Senha" value="1234"><br><br><button onclick="login()">Entrar</button><p class="muted">Demo: admin / 1234</p></div></div>`;return}
const low=state.products.filter(p=>p.qty<=p.min),ins=state.moves.filter(m=>m.type==='ENTRADA').length,outs=state.moves.filter(m=>m.type==='SAIDA').length;
el('#app').innerHTML=`<div class="wrap"><div class="card"><div class="row"><div><h1>📦 Almoxarifado</h1><span class="muted">Olá, ${esc(session.name)}</span></div><span style="margin-left:auto"></span><button onclick="logout()">Sair</button></div>
<div class="nav">${['dashboard','products','moves','history','alerts'].map(x=>`<button onclick="render('${x}')">${{dashboard:'Dashboard',products:'Produtos',moves:'Movimentações',history:'Histórico',alerts:'Alertas'}[x]}</button>`).join('')}</div></div>${view(page,low,ins,outs)}</div>`}
function view(page,low,ins,outs){
if(page==='dashboard')return `<div class="grid"><div class="card"><h2>Produtos</h2><b>${state.products.length}</b></div><div class="card"><h2>Estoque baixo</h2><b>${low.length}</b></div><div class="card"><h2>Entradas</h2><b>${ins}</b></div><div class="card"><h2>Saídas</h2><b>${outs}</b></div></div><div class="card"><h2>Resumo</h2><p>Use o menu para cadastrar produtos, registrar movimentações, consultar o histórico e verificar alertas.</p></div>`;
if(page==='products')return `<div class="card"><h2>Novo produto</h2><div class="grid"><input id="code" placeholder="Código"><input id="name" placeholder="Nome"><input id="cat" placeholder="Categoria"><input id="unit" placeholder="Unidade"><input id="qty" type="number" min="0" placeholder="Quantidade"><input id="min" type="number" min="0" placeholder="Estoque mínimo"></div><br><button onclick="addProduct()">Cadastrar</button></div><div class="card"><h2>Produtos cadastrados</h2><table class="table"><tr><th>Código</th><th>Produto</th><th>Categoria</th><th>Qtd.</th><th>Mín.</th><th>Ação</th></tr>${state.products.map(p=>`<tr><td>${esc(p.code)}</td><td>${esc(p.name)}</td><td>${esc(p.category)}</td><td>${p.qty}</td><td>${p.min}</td><td><button class="danger" onclick="delProduct(${p.id})">Excluir</button></td></tr>`).join('')}</table></div>`;
if(page==='moves')return `<div class="card"><h2>Registrar movimentação</h2><div class="grid"><select id="prod">${state.products.map(p=>`<option value="${p.id}">${esc(p.code)} — ${esc(p.name)} (${p.qty})</option>`).join('')}</select><select id="type"><option>ENTRADA</option><option>SAIDA</option></select><input id="amount" type="number" min="1" placeholder="Quantidade"><input id="obs" placeholder="Observação"></div><br><button onclick="move()">Registrar</button></div>`;
if(page==='history')return `<div class="card"><h2>Histórico</h2><table class="table"><tr><th>Data</th><th>Produto</th><th>Tipo</th><th>Qtd.</th><th>Responsável</th><th>Obs.</th></tr>${state.moves.map(m=>`<tr><td>${esc(m.date)}</td><td>${esc(m.product)}</td><td><span class="badge">${m.type}</span></td><td>${m.amount}</td><td>${esc(m.user)}</td><td>${esc(m.obs)}</td></tr>`).join('')||'<tr><td colspan="6">Nenhuma movimentação.</td></tr>'}</table></div>`;
return `<div class="card alert"><h2>⚠️ Alertas de estoque</h2>${low.map(p=>`<p><b>${esc(p.name)}</b> — saldo ${p.qty}, mínimo ${p.min}</p>`).join('')||'<p>Nenhum produto abaixo do estoque mínimo.</p>'}</div>`;
}
render();
