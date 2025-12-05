let expenses = [];

const title = document.getElementById("title");
const amount = document.getElementById("amount");
// const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const filterCategory = document.getElementById("filterCategory");
const totalAmount = document.getElementById("total");
const expenseTable = document.getElementById("expenseTable");
const exportBtn = document.getElementById("exportBtn");
let chart;

// Add Expense
addBtn.addEventListener("click", () => {
  if (title.value === "" || amount.value === "") {
    alert("Please fill all fields");
    return;
  }
  
  const expense = {
    title: title.value,
    amount: Number(amount.value),
    
  };

  expenses.push(expense);
  renderTable(expenses);
  calculateTotal(expenses);
  updateChart(); 

  title.value = "";
  amount.value = "";
  
});

// Show Expenses in Table 
function renderTable(list) {
  expenseTable.innerHTML = "";

  list.forEach(item => {
    const row = `
      <tr>
        <td>${item.title}</td>
        <td>₹${item.amount}</td>
      
      </tr>
    `;
    expenseTable.innerHTML += row;
  });
}

// Calculate Total
function calculateTotal(list) {
  const total = list.reduce((sum, item) => sum + item.amount, 0);
  totalAmount.textContent = total;
}

// Filter by Category
filterCategory.addEventListener("change", () => {
  const selected = filterCategory.value;

  if (selected === "") {
    renderTable(expenses);
    calculateTotal(expenses);
    updateChart();
  } else {
    const filtered = expenses.filter(exp => exp.category === selected);
    renderTable(filtered);
    calculateTotal(filtered);
    updateChart(filtered);
  }
});

// Export JSON
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(expenses, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "expenses.json";
  link.click();
});

// Chart.js - Category Chart
function updateChart(dataList = expenses) {
  const labels = dataList.map()(item=>item.title)

  const totals = dataList.map(item => item.amount);

  const ctx = document.getElementById("expenseChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: totals,
        backgroundColor: [
          "#3498db",
          "#f1c40f",
          "#9b59b6",
          "#2ecc71"
        ]
      }]
    },
    options: {
      responsive: true
    }
  });
}









