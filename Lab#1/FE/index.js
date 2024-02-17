function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee') //fetching data from BE
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
// 1- Get a reference to the submit button in the HTML document.
// 2- Attach an event listener to the submit button that listens for the "click" event.
// 3- Specify the action to be taken when the button is clicked, which is calling the createEmployee function.
const submitButton = document.getElementsByClassName("btn btn-primary mt-3")[0];
submitButton.addEventListener('click', createEmployee);

// TODO
// add event listener to delete button
// adding an EventListener to the whole document
document.addEventListener('click', function(event) 
{ //if an event happened to delete button
  if (event.target.classList.contains('btn-danger'))
  {
    // employee ID in the first column
    const employeeId = event.target.parentElement.parentElement.cells[0].textContent;
    deleteEmployee(employeeId);
  }
});


// TODO
function createEmployee (){
  // get data from input field
    const employeeName = document.getElementById('name').value;
    const employeeId = document.getElementById('id').value;
     if (employeeName==='' || employeeId==='')
    {alert("Please enter Name and ID");}
  // send data to BE
    else{
    fetch('http://localhost:3000/api/v1/employee', { //URL
      method: 'POST',
      headers: { //used when sending parameters using the body 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeName, employeeId }), //body parameter
    })}
    // Call fetchEmployees 
    fetchEmployees();
}


// TODO
function deleteEmployee(employeeId) {
  // get data from input field -> sent using fn parameter
  // send data to BE
    const URL = `http://localhost:3000/api/v1/employee/${employeeId}`;
    fetch(URL,{method: 'DELETE',});
    // Call fetchEmployees
    fetchEmployees();
}


fetchEmployees()
