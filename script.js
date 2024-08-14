//Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

//Captura o evento de input para formatar o valor
amount.oninput = () => {
    //Regex para remover os caracteres não numericos
    let value = amount.value.replace(/\D/g, "");

    //Transforma o valor em centavos.
    value = Number(value) / 100;

    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
    //Formata o valor no padrão  BRL(Real)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    return value;
}

form.onsubmit = (event) => {
    event.preventDefault();
}