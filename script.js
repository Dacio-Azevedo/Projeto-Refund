//Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

//Seleciona a lista 
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");


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

//Cria o item da lista
function expenseAdd(newExpense) {
    try {
        //Cria elemento para adicionar o item (li) lista
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        //Cria o ícone da categoria e adiciona seus atributos.
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", "Ícone de tipo da despesa.");

        //Adicionando a info da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");
        //Cria o nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;
        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;
        //Adiciona nome e categoria na div das insformaçãoes da despesa
        expenseInfo.append(expenseName, expenseCategory);

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        //Cria o ícone(x) de remover
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", `./img/remove.svg`);
        removeIcon.setAttribute("alt", `remover`);

        //Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
        //Adiciona o item na lista
        expenseList.append(expenseItem);

        //Atualiza os totais
        updateTotals();

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error);
    }
}

//Atualiza os totais
function updateTotals() {
    try {
        //Recupera todos os itens da lista
        const items = expenseList.children;
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

        //Variável para incrementar o total
        let total = 0;

        //Percorre cada item da lista
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount");
            //Remover caracteres não númericos e substitui a (,) pelo (.)
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".");

            value = Number(value); //Converte value para Number

            if(isNaN(value)){
                return alert("Não foi possível calcular o total. O valor não parece ser um número.")
            }

            total += value;
        }

        //Criar small para adicionar o R$
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";
        
        //Formata o valor e remove o R$, esse que será exibido pelo small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$","");

        expensesTotal.innerHTML = "";
        expensesTotal.append(symbolBRL, total);

    } catch (error) {
        console.log(error);
        alert("Não foi possível atualizar os totais.");
    }
}

//Evento para capturar os cliques nos items da lista
expenseList.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-icon")){
        //Obtém o item(li) inteiro, pai do elemento button(x)
        const item = event.target.closest(".expense");
        item.remove();
    }

    updateTotals();
});