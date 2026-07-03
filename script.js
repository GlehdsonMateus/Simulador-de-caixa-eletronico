let contas = [];
let historico = [];
let proximoId = 1;
const janela = document.querySelector("#dialogo")
const btn = document.querySelector("#botao")

btn.addEventListener("click", abrirtela);


function Deletar(){
    let id = Number(document.getElementById("listaContas").value);


    for (let i = 0; i < contas.length; i++) {
        if (contas[i].id === id) {
            contas.splice(i, 1);
            alert("Conta removida com sucesso!");
            atualizarlista();
            return;

        }
    }
}

function depositar(){
    let id = Number(document.getElementById("listaContas").value);
    let valor = Number(document.getElementById("valor").value);

    if (valor <= 0) {
        alert("Digite um valor válido para depósito.");
        return;
    }


    for (let i = 0; i < contas.length; i++) {
        if (contas[i].id === id) {
            contas[i].saldo += valor;
            registrarHistorico(contas[i], "Depósito", valor);
            alert("Depósito realizado com sucesso!");
            atualizarlista();
            return;
        }
    }
}

function sacar(){
    let id = Number(document.getElementById("listaContas").value);
    let valor = Number(document.getElementById("valor").value);

    if (valor <= 0) {
        alert("Digite um valor válido para saque.");
        return;
    }

    for (let i = 0; i < contas.length; i++) {
        if (contas[i].id === id) {
            if (contas[i].saldo >= valor) {
                contas[i].saldo -= valor;
                registrarHistorico(contas[i], "Saque", valor);
                alert("Saque realizado com sucesso!");
                atualizarlista();
                return;
            } else {
                alert("Saldo insuficiente.");
                return;
            }
        }
    }
}
function atualizarTransferencia() {
    let idOrigem = Number(document.getElementById("origem").value);
    let destino = document.getElementById("destino");

    destino.innerHTML = "";

    let opcao = document.createElement("option");
    opcao.value = "";
    opcao.text = "Selecione uma conta";
    destino.appendChild(opcao);

    for (let i = 0; i < contas.length; i++) {

        if (contas[i].id !== idOrigem) {

            let option = document.createElement("option");
            option.value = contas[i].id;
            option.text = contas[i].nome +
                          " - Saldo: " + contas[i].saldo.toFixed(2) +
                          " - ID: " + contas[i].id;

            destino.appendChild(option);
        }
    }
}


function cadastrar() {
    var nome = document.getElementById("nome").value;
    var saldo = parseFloat(document.getElementById("saldo").value);

    if (nome == ""){
        alert("Digite o nome da conta: ");
        return
    }

    if (isNaN(saldo)){
        saldo = 0;
    }

    let conta = {
        id: proximoId++,
        nome: nome,
        saldo: saldo
    };

    contas.push(conta);

    atualizarlista();  
    janela.close()
}


function atualizarlista() {

    let lista = document.getElementById("listaContas");
    let origem = document.getElementById("origem");

    lista.innerHTML = "";
    origem.innerHTML = "";

    let opcao1 = document.createElement("option");
    opcao1.value = "";
    opcao1.text = "Selecione uma conta";
    lista.appendChild(opcao1);

    let opcao2 = document.createElement("option");
    opcao2.value = "";
    opcao2.text = "Selecione uma conta";
    origem.appendChild(opcao2);

    for (let i = 0; i < contas.length; i++) {

        let option1 = document.createElement("option");
        option1.value = contas[i].id;
        option1.text = contas[i].nome +
                       " - Saldo: " + contas[i].saldo.toFixed(2) +
                       " - ID: " + contas[i].id;
        lista.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = contas[i].id;
        option2.text = contas[i].nome +
                       " - Saldo: " + contas[i].saldo.toFixed(2) +
                       " - ID: " + contas[i].id;
        origem.appendChild(option2);
    }
}




function abrirtela() {
    janela.showModal()
}

function transferir() {
    let idOrigem = Number(document.getElementById("origem").value);
    let idDestino = Number(document.getElementById("destino").value);
    let valor = Number(document.getElementById("valorTransferencia").value);

    let contaOrigem = contas.find(conta => conta.id === idOrigem);
    let contaDestino = contas.find(conta => conta.id === idDestino);

    if (!contaOrigem || !contaDestino) {
        alert("Selecione contas válidas para transferência.");
        return;
    }

    if (contaOrigem.saldo < valor) {
        alert("Saldo insuficiente para transferência.");
        return;
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    registrarHistorico(contaOrigem, "Transferência enviada", valor);
    registrarHistorico(contaDestino, "Transferência recebida", valor);

    alert("Transferência realizada com sucesso!");
    atualizarlista();
}

function registrarHistorico(conta, tipo, valor) {

    let operacao = {
        data: new Date().toLocaleString("pt-BR"),
        conta: conta.nome,
        tipo: tipo,
        valor: valor,
        saldo: conta.saldo
    };

    historico.push(operacao);

    atualizarHistorico();
}

function atualizarHistorico() {

    let tabela = document.getElementById("historico");

    tabela.innerHTML = "";

    for (let i = 0; i < historico.length; i++) {

        let linha = document.createElement("tr");

        linha.innerHTML =
        "<td>" + historico[i].data + "</td>" +
        "<td>" + historico[i].conta + "</td>" +
        "<td>" + historico[i].tipo + "</td>" +
        "<td>R$ " + historico[i].valor.toFixed(2) + "</td>" +
        "<td>R$ " + historico[i].saldo.toFixed(2) + "</td>";

        tabela.appendChild(linha);
    }
}