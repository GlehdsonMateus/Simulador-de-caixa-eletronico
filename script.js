let contas = [];
let proximoId = 0;

function cadastrar() {
    var nome = document.getElementById("nome").value;
    var saldo = parseFloat(document.getElementById("saldo").value);

    let conta = {
        id: proximoId++,
        nome: nome,
        saldo: saldo
    };

    contas.push(conta);
    alert("Conta cadastrada com sucesso!");

}

function atualizarlista() {
    var lista = document.getElementById("listaContas");
    lista.innerHTML = "";