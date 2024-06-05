// This variable is initially empty and will be used to store employee data if localStorage is not available
var localStoreData = [];
// Function to validate an email address using a regular expression
function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}
// Check if there's existing user data in localStorage, if not, initialize with an empty array
if (!localStorage.getItem('user')) {
  localStorage.setItem('user', JSON.stringify([]));
}
// Function to save user data from the employee form
function saveUserData() {
  // Get a reference to the employee form element
  var formElement = document.getElementById("employeeForm");
  // Convert form data to an object using FormData and Object.fromEntries
  const data = Object.fromEntries(new FormData(formElement).entries());
  // Check if there's existing data in localStorage
  if (JSON.parse(localStorage.getItem('user')).length > 0) {
    const storeData = JSON.parse(localStorage.getItem('user'));
    data.id = JSON.parse(localStorage.getItem('user')).length;// Assign a unique ID to the new data based on the existing data length
    // Add the new data to the existing data in localStorage
    storeData.push(data);
    localStorage.setItem('user', JSON.stringify(storeData));
    displayEmployees(); // Call the displayEmployees function to update the employee table

  } else {
    data.id = 0;// If no data exists, assign ID 0 to the new data
    localStoreData.push(data);
    localStorage.setItem('user', JSON.stringify(localStoreData))
    displayEmployees();
  }
  // Reset the employee form after successful submission
  document.getElementById("employeeForm").reset();
}
function displayEmployees() {
  let dtd = '';
  // Use map function to iterate through user data and create table rows
  const tableRows = JSON.parse(localStorage.getItem('user')).map((data, index) => {

    dtd += `
      <tr>
        <td>${data.firstname}</td>
        <td>${data.lastname}</td>
        <td>${data.username}</td>
        <td>${data.contact}</td>
        <td>${data.email}</td>
        <td>${data.address}</td>
        <td>${data.country}</td>
        <td>${data.state}</td>
        <td>${data.zip}</td>
        <td>
          <a class="text-sucess" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" id="editEmployeeModalBTn" onclick="EditUserData(${index})" id="${index}" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg></a>
          <a class="text-danger" onclick="DeleteUserData(${index})" id="${index}"><i class="bi bi-trash3 h3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg></i></a>
        </td>
      </tr>`;
  });
  // Set the innerHTML of the employeeTableBody element with the generated table rows
  document.getElementById("employeeTableBody").innerHTML = dtd;
}
// Function to pre-fill the edit form with user data based on ID
function EditUserData(id) {
  const userinfo = JSON.parse(localStorage.getItem('user'));
  const userData = userinfo[id];
  // Set the values of the edit form fields using their IDs and user data
  document.getElementById('id').value = id;
  document.getElementById('firstname').value = userData.firstname;
  document.getElementById('lastname').value = userData.lastname;
  document.getElementById('username').value = userData.username;
  document.getElementById('contact').value = userData.contact;
  document.getElementById('email').value = userData.email;
  document.getElementById('address').value = userData.address;
  document.getElementById('country').value = userData.country;
  document.getElementById('state').value = userData.state;
  document.getElementById('zip').value = userData.zip;

  localStorage.setItem('user', JSON.stringify(storeData));
}
// Function to save edited user data
function EditSaveUserData(){
  var formElement = document.getElementById("employeeFormEdit");
  const newData = Object.fromEntries(new FormData(formElement).entries());
  var userinfo = JSON.parse(localStorage.getItem('user'));
  userinfo[newData.id] = newData;// Update the user data in the userinfo array based on the edited data's ID
  localStorage.clear();// Clear the entire localStorage
  localStorage.setItem('user', JSON.stringify(userinfo));// Set the updated user data back in localStorage
  displayEmployees()

}
// Function to delete a user from localStorage based on ID
function DeleteUserData(id){
    const userString = localStorage.getItem('user');
    // Check if there's user data in localStorage, if not, exit the function
    if (!userString) {
      return; 
    }
    const userData = JSON.parse(userString);
    userData.splice(id, 1);// Use splice to remove the user data at the specified index
    const updatedUserData = JSON.stringify(userData);
    localStorage.setItem('user', updatedUserData);
    displayEmployees();
  } 
// Function to add employee data  
function addEmployee(data) {
  localStoreData.push(data);
  // Call the displayEmployees function to update the employee table with the new data
  displayEmployees();
}
// Call the displayEmployees function to populate the table on page load
displayEmployees();


