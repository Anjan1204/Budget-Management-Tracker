window.onload = () => {
  renderData();
};
document.getElementById("incomeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("incomeTitle").value;
  const amount = Number(document.getElementById("incomeAmount").value);

  if (!title || amount <= 0) return alert("Kindly enter valid details");

  const income = { id: Date.now(), title, amount };
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  incomes.push(income);
  localStorage.setItem("incomes", JSON.stringify(incomes));
  this.reset();
  renderData();
});

document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("expenseTitle").value;
  const amount = Number(document.getElementById("expenseAmount").value);

  if (!title || amount <= 0) return alert("Please Enter a valid amount");

  const expense = { id: Date.now(), title, amount };
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  this.reset();
  renderData();
});

function deleteItem(id, type) {
  let data = JSON.parse(localStorage.getItem(type)) || [];
  data = data.filter((item) => item.id !== id);
  localStorage.setItem(type, JSON.stringify(data));
  renderData();
}

function renderData() {
  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const incomeList = document.getElementById("incomeList");
  incomeList.innerHTML = "";
  let totalIncome = 0;

  incomes.forEach((item) => {
    const amount = Number(item.amount); 
    totalIncome += amount;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.title}: ₹${amount.toLocaleString()}
      <button onclick="deleteItem(${item.id}, 'incomes')">❌</button>
    `;
    incomeList.appendChild(li);
  });

  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  let totalExpense = 0;

  expenses.forEach((item) => {
    const amount = Number(item.amount); 
    totalExpense += amount;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.title}: ₹${amount.toLocaleString()}
      <button onclick="deleteItem(${item.id}, 'expenses')">❌</button>
    `;
    expenseList.appendChild(li);
  });

  
  document.getElementById("totalIncome").innerText = totalIncome.toLocaleString();
  document.getElementById("totalExpense").innerText = totalExpense.toLocaleString();
  document.getElementById("balance").innerText = (totalIncome - totalExpense).toLocaleString();
}
