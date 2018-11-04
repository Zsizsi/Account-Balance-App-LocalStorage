const incomeArr = [];
const expenseArr = [];

//=======DISPLAY current DATE and TIME====================================================

const displayTimeDate = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  const dateTime = `${date}/${month}/${year} ${hours}:${minutes}`;
  return dateTime;
};

//================ADD DATA to Local Storage========================================

const addData = () => {
  const selectID = document.querySelector("#accountType");
  const descrInput = document.querySelector("#description");
  const amountInput = document.querySelector("#amount"); 
  
  let myObj = {
    description: descrInput.value,
    amount: amountInput.value,
    timeOfData: displayTimeDate()
  }

  if (selectID.value === "income") {
    incomeArr.push(myObj);
    localStorage.setItem("income", JSON.stringify(incomeArr));
    descrInput.value = "";
    amountInput.value = "";
    
    
  } else if (selectID.value === "expense") {
    expenseArr.push(myObj);
    localStorage.setItem("expense", JSON.stringify(expenseArr));
    descrInput.value = "";
    amountInput.value = "";
  }
  window.location.reload();
};

//=======DISPLAY and COUNT Balance===========================================================

const countDisplayBalance = () => {
  const balanceDiv = document.querySelector(".balance")
  const balanceP = document.createElement("p");
  let totalIncome = 0;

  incomeArr.forEach((item) => {
  totalIncome +=item.amount;
  });
  
  let totalExpense = 0;
  expenseArr.forEach((item) => {
  totalExpense +=item.amount;
  })

  let balance = totalIncome - totalExpense;
  console.log(balance)

  balanceP.textContent = balance;

  balanceDiv.appendChild(balanceP);
}   

//=============DELETE entry===============================================================

const deleteIncEntry = (index) => {
  incomeArr.splice(index, 1);
  localStorage.setItem("income", JSON.stringify(incomeArr));
  window.location.reload();
}

const deleteExpEntry = (index) => {
  expenseArr.splice(index, 1);
  localStorage.setItem("expense", JSON.stringify(expenseArr));
  window.location.reload();
}

//=============DISPLAY DATA from Local Storage===================================================

const printData = () => {
  const incUl = document.querySelector("#incomeUl");
  const expUl = document.querySelector("#expenseUl");   
 
  let incomeDataLocal = JSON.parse(localStorage.getItem("income"));
  let expenseDataLocal = JSON.parse(localStorage.getItem("expense"));

  if (incomeDataLocal) {
    incomeDataLocal.forEach((element, i) => {
      incomeArr.push(element)

      let li = document.createElement("li");
      li.innerHTML =  `<span>${element.description}</span>
      <span>${element.amount}</span>
      <span>${element.timeOfData}</span>
      <button class="btn-delete" onclick="deleteIncEntry(${i})"><i class="fas fa-trash-alt"></i></button>
      `;
      incUl.appendChild(li);
    });
  }
  if (expenseDataLocal) {
    expenseDataLocal.forEach((element, i) => {
      expenseArr.push(element)

      let li = document.createElement("li");
      li.innerHTML =  `<span>${element.description}</span>
      <span>${element.amount}</span>
      <span>${element.timeOfData}</span>
      <button class="btn-delete" onclick="deleteExpEntry(${i})"><i class="fas fa-trash-alt"></i></button>
      `;
      expUl.appendChild(li);
    });
  }
}


//========Set up Event Listeners===================================================

const setUpAddData = () => {
  const addBtn = document.querySelector("#addBtn");
  addBtn.addEventListener("click", addData);
};

setUpAddData(() => addData(displayTimeDate()));
printData();
countDisplayBalance();








