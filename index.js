function addExpense() {
  const amount = document.getElementById('expense-amount').value.trim();
  const description = document.getElementById('expense-description').value.trim();
  const  category = document.getElementById('expense-category').value;

  if(amount !== '' && description !== '' && category !== '')
  {
    const expensObject = {
      amount: parseFloat(amount).toFixed(2),
      description,
      category,
      Id:Date.now()
    };
      const expenseObj = JSON.parse(localStorage.getItem("expenseObj")) || [];
      expenseObj.push(expensObject);
      localStorage.setItem("expenseObj", JSON.stringify(expenseObj));
      console.log('hi')
      clearInputFields();
      displayExpenses();
  }
  else{
    alert("Please fill the all details")
  }
}

window.addEventListener("load", displayExpenses());

//clear fields
function clearInputFields(){
  document.getElementById("expense-amount").value = "";
  document.getElementById("expense-description").value = "";
  document.getElementById("expense-category").value = '';
}

// Display Function to list expenses
function displayExpenses() {
  let grabElement = document.getElementById("expense-details");
  grabElement.innerHTML = "";

  const expenseObj  = JSON.parse(localStorage.getItem("expenseObj")) || [];

  expenseObj.forEach((expense , index) => {
    const tr = document.createElement('tr');

    //serial Number
    const tdIndex = document.createElement('td');
    tdIndex.innerText = index+1;
    tr.appendChild(tdIndex);
    
    
    //Amount
    const tdAmount = document.createElement('td');
    tdAmount.textContent = expense.amount;
    tr.appendChild(tdAmount);

    //Description
    const tdDescription = document.createElement('td')
    tdDescription.textContent = expense.description;
    tr.appendChild(tdDescription);
    //category
    const tdCategory = document.createElement('td');
    tdCategory.textContent = expense.category;
    tr.appendChild(tdCategory);

    //Actions
    const  tdActions = document.createElement('td');

    //edit button
    const editbtn = document.createElement('button');
    editbtn.className = "btn btn-primary btn-sm action-btn";
    editbtn.innerText = 'Edit';
    editbtn.addEventListener('click' ,()=>editExpense(expense.Id));
    tdActions.appendChild(editbtn);
    tr.appendChild(tdActions);

    //delete button
    const deletebtn = document.createElement('button');
    deletebtn.className = "btn btn-danger btn-sm action-btn"
    deletebtn.textContent = 'Delete'
    deletebtn.addEventListener('click' , ()=>deleteExpense(expense.Id))
    tdActions.appendChild(deletebtn);
    tr.appendChild(tdActions);

    grabElement.appendChild(tr);
    
  });
}
// Edit fuctionality
function editExpense(Id)
{
  const expenseObj = JSON.parse(localStorage.getItem('expenseObj'))||[];
  const expenseToedit = expenseObj.find(expense => expense.Id === Id)
  if(expenseToedit)
  {
    document.getElementById('expense-amount').value = expenseToedit.amount;
    document.getElementById('expense-description').value = expenseToedit.description;
    document.getElementById('expense-category').value = expenseToedit.category
    
    //remove the expense being edited from the list
    const updatedExpenses = expenseObj.filter(expense => expense.Id !== Id);
    localStorage.setItem('expenseObj' , JSON.stringify(updatedExpenses));
    
  }

}

function deleteExpense(Id){
  const expenseObj = JSON.parse(localStorage.getItem('expenseObj')) || [];
  const updatedExpenses = expenseObj.filter(expense => expense.Id !== Id);
  localStorage.setItem('expenseObj' , JSON.stringify(updatedExpenses));
  displayExpenses();
}

