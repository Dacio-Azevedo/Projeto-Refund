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

//Captura o evento de submit do form
form.onsubmit = (event) => {
    event.preventDefault();

    //Cria um objeto com os detalhes da despesa
    const newExpense = {
        id: new Date().getTime(), //Pegar timestamp como id
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    };
    
    //Adiciona a despesa na lista
    expenseAdd(newExpense);
}

function expenseAdd(newExpense) {
    try {
    
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error);
    }
}