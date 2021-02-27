const Modal = {
    open (){
//*1
     document
     .querySelector('.modal-overlay')
     .classList.add('active')
    },
   close (){
//2 
    document
      .querySelector('.modal-overlay')
      .classList.remove('active')
   }
}

//*3

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("Dev.finances:transactions")) || []
    },
    
    set(transactions) {
    localStorage.setItem("Dev.finances:transactions",JSON.stringify(transactions))
    
    }
}

const Transaction = {
    //*21
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
},
    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
},

    incomes(){
        let income = 0;
//*4
        Transaction.all.forEach(transaction => {
//*5 
            if(transaction.amount > 0) {
//*6      
                income = income + transaction.amount;
            }
        })
  return income;
},

   expenses(){
    let expense = 0;
//*7 
    Transaction.all.forEach(transaction => {
//*8      
        if(transaction.amount < 0) {
//*9       
            expense += transaction.amount;
        }
    })
 return expense;

},

    total(){
    return Transaction.incomes () + Transaction.expenses ();
}

}

//*10

const DOM = {
transactionsConteiner: document.querySelector('#data-table tbody'),

    addTransaction (transaction, index) {
    const tr = document.createElement ('tr')
    tr.innerHTML = DOM.innerHTMLTransaction (transaction, index)
    tr.dataset.index = index

    DOM.transactionsConteiner.appendChild(tr)
},

innerHTMLTransaction (transaction, index) {

    const CSSclass = transaction.amount > 0 ? "income": "expense"

    const amount = Utils.formatCurency(transaction.amount)

   const html = `
       <td class="description">${transaction.description}</td>
       <td class=${CSSclass}>${amount}</td>
       <td class="date">${transaction.date}</td>
       <td> <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação"> </td>
       `

   return html

},

updateBalance(){
    document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurency(Transaction.incomes())

        document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurency(Transaction.expenses())

        document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurency(Transaction.total())

},

clearTransactions(){
    DOM.transactionsConteiner.innerHTML = ""
}

}

const Utils = {
    formatAmount(value){
//*19
//*22
        value = value * 100
        return Math.round(value)
    
},
formatDate(date){
    const splittedDate = date.split("-")
return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
},

    formatCurency(value){
        const signal = Number (value) < 0 ? "-" : ""

        value = String (value).replace (/\D/g, "")  

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"

    })  

    return signal + value
 
}

}

const Form = {
    description:document.querySelector('input#description'),
    amount:document.querySelector('input#amount'),
    date:document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields(){
        const {description, amount, date} = Form.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos!") }
    },
    
    formatValues(){
    let {description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)
        
        date = Utils.formatDate(date)
//*11 
        return {
        description,
        amount,
        date
        }
    },

    clearFields(){
    Form.description.Value = ""
    Form.amount.Value = ""
    Form.date.Value = ""
    },

    submit(event) {
    event.preventDefault()

    try {
//*12 
    Form.validateFields()
//*13
    const transaction = Form.formatValues()
//*14
    Transaction.add(transaction)
//*15
    Form.clearFields()
//*16 
    Modal.close()
//*17 
    } catch (error) {
        alert(error.message)
    }
}
}

//*18

const App = {
    init() {
//*20
    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()

    Storage.set(Transaction.all)
    },

    reload() {
    DOM.clearTransactions()
    App.init()
    }
}

App.init()





// Comentarios e anotações  ( * + Numero )

// *1 
//abrir modal // adicionar class active ao modal//  alert('abrir modal') 

//*2 
//fechar o modal 

//*3
// levei um tempo para perceber a falta da "," entre os id's estava gerando erro 
//e não conseguia proseguir com o console.log.
//const transactions = 
//eu preciso somar as entradas depois eu preciso somar as saídas e 
//remover das entradas o valor das saidas assim, eu terei o total.

//*4 
//pegar todas as transaçoes
//para cada transação,

//*5   
//se ela for maior que zero

//*6 
//somar uma variavel e retornar uma variavel
//income += transaction.amount

//*7
//pegar todas as transaçoes
//para cada transação,

//*8
//se ela for menor que zero

//*9
//somar uma variavel e retornar uma variavel
//expense = expense + transaction.amount

//*10
// eu preciso pegar as minhas transaçoes do meu objeto e aqui no javascript e colocar lá no HTML
// substituir os dados HTML com os dados JS

//*11
//verificar se as datas estão ficando da forma correta
//console.log(date) 

//*12
//verificar se todas as informaçoes foram preenchidas

//*13
//formatar os dados

//*14
//salvar

//*15
//apagar os dados do formulario

//*16
// fechar modal

//*17
//atualizar a aplicação 
//App.reload() // como já possui reload no add.transaction não precisa colocar reload novamente.


//*18
//forma manual
//DOM.addTransaction (transactions [0])//DOM.addTransaction (transactions [1])//DOM.addTransaction (transactions [2])
// ou usando o for (let i = 0; i < 3; i++) {console.log (i)} //

//*19
// value = Number(value) * 100 
//caso a primeira não funcione pode usar a segunda
// value = Number(value.replace(/\,\./g,"")) * 100
//apenas por segurança e garantir que a pontuação estará no lugar certo 

//*20
//Transaction.all.forEach((transaction,index) => {
//    DOM.addTransaction(transaction, index)
// é possivel subtituir essa função por
//Transaction.all.forEach(DOM.addTransaction)

//*21
// dados utilizados para teste que foram retirados, para que o usuario coloque os dados na aplicação.
//[
//{description: 'luz',
//amount: -50001,
//date: '23/01/2021'
//},
//{
//description: 'website',
//amount: 500000,
//date: '23/01/2021'
//},
//{
//description: 'internet',
//amount: -20012,
//date: '23/01/2021'
//},
//{
//description: 'app',
//amount: 200000,
//date: '23/01/2021'
//},
//],

 //*22
// esse codigo gera um bug
// onde se digitar 0.56 por exemplo, gerava um numero com muitos 0 
// gerando um valor totalmente diferente do que foi inserido pelo usuario.

 // value = Number(value.replace(/\,\./g,"")) * 100 

 // no codigo já consta a correção.
