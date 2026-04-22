function saveData(){
  var name = document.getElementById("userName").value;//alert(name);
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var gender = document.getElementById("gender").value;//alert(gender);
  var err; 

  if(name == "" && email == "" && phone == "" ){
    document.getElementById("mandatoryName").style.display= 'inline';
    document.getElementById("mandatoryEmail").style.display= 'inline';
    document.getElementById("mandatoryPhone").style.display= 'inline';
    err = "Please fill details in all required fields";
  }
  else if (name == "" || name.trim() === "") {
    document.getElementById("mandatoryName").style.display= 'inline';
    err = "Name is required!";
  }
  else if (email == "") {
    document.getElementById("mandatoryEmail").style.display= 'inline';
    err = "Email is required!";
  }
  else if (phone == "") {
    document.getElementById("mandatoryPhone").style.display= 'inline';
    err = "PhoneNo is required!";
  }    
    
  if(name != "" )
  {
    var errValidateName = checkNotIsEmpty(name);
    if(errValidateName != "" && errValidateName != undefined){
      document.getElementById("mandatoryName").style.display= '';
      return;// Stop form submission
    }     
  }  

  if(email != "" )
  { 
    var errValidateEmail = validateEmail(email);
    if(errValidateEmail != "" && errValidateEmail != undefined){
      document.getElementById("mandatoryEmail").style.display= '';
      return;// Stop form submission
    }      
  }  

  if(phone != "" )
  {   
    var errValidatePhone = validateFlexiblePhone(phone); 
    if(errValidatePhone != "" && errValidatePhone == "error in phone number"){ //alert("here" + errValidatePhone);
      document.getElementById("mandatoryPhone").style.display= ''; 
      return;// Stop form submission
    }       
  }

  if(err != "" && err != undefined){
    alert(err); // Alert error message if any validation error occurs.
    return; // Stop form submission
  }else{
    alert("Data saved successfully!");
  }

  //Create table from entered data and store to local storage 
  createTableFromData(name, email, phone,gender);

  //alert(document.getElementById("viewData").innerHTML);

  // clear entry fields after submission
  clearEntryFields();

  // Start - Store a JSON array in local storage
  // Storing data:
  const setLocalStorageJSON = JSON.parse(localStorage.getItem("setLocalStorageJSON")) || [];
  let entryDataObj = { name: name, email: email, phone: phone, gender: gender };
  setLocalStorageJSON.push(entryDataObj);
  localStorage.setItem("setLocalStorageJSON", JSON.stringify(setLocalStorageJSON));
  const allEnteredvalues = JSON.parse(localStorage.getItem("setLocalStorageJSON")) || []; // Parse string to array
  // End of code for storing data in local storage JSON array


}

//This function will delete the corresponding row of the table when user clicks on delete(X) button.
function deleteRow(r) {
  if (confirm("Are you sure you want to delete this rec?")) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("viewData").deleteRow(i);

    //It will remove the data from localstorage JSON array as well. So on page it will not visible as data is deleted from table.  
    let data = JSON.parse(localStorage.getItem("setLocalStorageJSON")) || []; // Parse string to array
    const index = 0; // position to delete
    if (index > -1 && index < data.length) {
      //if (index > -1 && index < data.length) {
      data.splice(index, 1); // remove 1 item at index
    }
    localStorage.setItem("setLocalStorageJSON", JSON.stringify(data));
    // End of code for deleting data from local storage JSON array as well. 

  } else {
    alert("Deletion action is cancelled.");
  }
}

function editRow(r) {//alert("edit");
  var i = r.parentNode.parentNode.rowIndex; 
  const rowId = r.parentNode.parentNode.id;//alert(rowId);
  document.getElementById("editTableRowNo").innerHTML= rowId;
  //alert(i);
  var nameForEdit = document.getElementById("viewData").rows[i].cells[0].innerHTML;
  var emailForEdit = document.getElementById("viewData").rows[i].cells[1].innerHTML;
  var phoneForEdit = document.getElementById("viewData").rows[i].cells[2].innerHTML;
  var genderForEdit = document.getElementById("viewData").rows[i].cells[3].innerHTML;

  //alert(nameForEdit + " " + emailForEdit + " " + phoneForEdit + " " + genderForEdit);
  document.getElementById("userName").value = nameForEdit;
  document.getElementById("email").value = emailForEdit;
  document.getElementById("phone").value = phoneForEdit;
  document.getElementById("gender").value = genderForEdit;
    
  document.getElementById("btnAddData").style.display= 'none';
  document.getElementById("btnEditData").style.display= 'block';
}

function saveEditedData(){//alert("save edit");
  var rowId = document.getElementById("editTableRowNo").innerHTML; //alert(rowId);
  var i = Number(rowId.split("_")[1]); //alert(i);
  document.getElementById("cellOne_" + i).innerHTML= document.getElementById("userName").value;
  document.getElementById("cellTwo_" + i).innerHTML= document.getElementById("email").value;
  document.getElementById("cellThree_" + i).innerHTML= document.getElementById("phone").value;
  document.getElementById("cellFour_" + i).innerHTML= document.getElementById("gender").value;
  document.getElementById("btnAddData").style.display= 'block';
  document.getElementById("btnEditData").style.display= 'none';  

  //const key = "setLocalStorageJSON";
  const index = i-1; // position to update

  // 1. Get and parse
  let data = JSON.parse(localStorage.getItem("setLocalStorageJSON")) || []; //alert(index);

  // 2. New updated object
  const updatedNode = {
    name: document.getElementById("userName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    gender: document.getElementById("gender").value
  }; //alert(updatedNode);

  // 3. Replace using splice
  if (index > -1 && index < data.length) {//alert("here");
    data.splice(index, 1, updatedNode); // remove 1, insert updatedNode
  }
  localStorage.setItem("setLocalStorageJSON", JSON.stringify(data));


  // clear entry fields after submission
  clearEntryFields();
}

//This function will check if the name is empty or not. Can be used for other fields as well if needed to check NotIsEmpty.
function checkNotIsEmpty(name) {  
  if(name.trim() === "" || name == null) {//alert(name);
    document.getElementById("mandatoryName").style.display= '';
    document.getElementById("mandatoryName").innerHTML= '*'; 
    return false;    
  }else{
    document.getElementById("mandatoryName").style.display= 'none';
    document.getElementById("mandatoryName").innerHTML= '';    
  }
}

//This function will check if the email is valid or not.
function validateEmail(email) {
  var pattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
  var isValid = pattern.test(email);//alert(isValid);
  if(!isValid) {
    document.getElementById("mandatoryEmail").style.display= '';
    //document.getElementById("mandatoryEmail").style.display= 'block';
    document.getElementById("mandatoryEmail").innerHTML= 'invalid email address';
    return false;    
  }else{
    document.getElementById("mandatoryEmail").style.display= 'none';
    document.getElementById("mandatoryEmail").innerHTML= '';    
  }
}

//This function will check if the phone number is valid or not.
function validateFlexiblePhone(phone) {
  var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  var isValid = regex.test(phone); 
  if (!isValid) {//alert("here" + isValid);
    document.getElementById("mandatoryPhone").style.display= '';
    //document.getElementById("mandatoryPhone").style.display= 'block';
    document.getElementById("mandatoryPhone").innerHTML= 'invalid phone number';
    return "error in phone number";
  }else
  {//alert(isValid);
    document.getElementById("mandatoryPhone").style.display= 'none';
    document.getElementById("mandatoryPhone").innerHTML= '';

    const formatted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // basic phone format as xxx-xxx-xxxx
    document.getElementById("phone").value = formatted;
  }
}

function clearEntryFields(){
  // clear entry fields after submission
  document.getElementById("userName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("mandatoryName").style.display= '';
  document.getElementById("mandatoryEmail").style.display= '';
  document.getElementById("mandatoryPhone").style.display= '';
  /*document.getElementById("mandatoryName").style.display= 'block';
  document.getElementById("mandatoryEmail").style.display= 'block';
  document.getElementById("mandatoryPhone").style.display= 'block';*/
  document.getElementById("mandatoryName").innerHTML= '*';
  document.getElementById("mandatoryEmail").innerHTML= '*';
  document.getElementById("mandatoryPhone").innerHTML= '*';
}

function displayData(){
  //alert("on load display data");
  const allEnteredvalues = JSON.parse(localStorage.getItem("setLocalStorageJSON")) || []; // Parse string to array
  const data = JSON.stringify(allEnteredvalues);

  const totalCount = allEnteredvalues.length;
  //alert(totalCount);

  for (let loopCount = 0; loopCount < totalCount; loopCount++) {
    const firstJSONNode = allEnteredvalues[loopCount]; // Gets one node of json object based on loop count
    const firstJSONNodeString = JSON.stringify(firstJSONNode); // Convert json object to string to display in alert
    //alert(firstJSONNodeString); // to access individual values
    const obj = JSON.parse(firstJSONNodeString); // Convert string back to json object to access values in createTableFromData function

    //alert(obj);
    //alert(obj[0].name + " " + obj[1].email + " " + obj[3].phone + " " + obj[4].gender);
    createTableFromData(obj.name, obj.email, obj.phone, obj.gender);
  }     
}

function createTableFromData(name, email, phone,gender){
  //alert("create table from data");
  //save to local storage
  localStorage.setItem("userName", name);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("gender", gender);  


  let table = document.getElementById("viewData"); 
  // Insert a new row at the end (-1 adds to the last position)
  //let newRow = table.insertRow(-1);
  let newRow = table.insertRow(1); // Insert new row at position 1 to add new data at top of the table. 
  var setRowNumber = table.rows.length - 1;

  // Set the dynamic ID to created table row.
  newRow.id = "row_" + setRowNumber; 

  // Insert new cells into that created row and set dynamic IDs to each cell.
  let cellOne = newRow.insertCell(0); cellOne.id = "cellOne_" + setRowNumber; 
  let cellTwo = newRow.insertCell(1); cellTwo.id = "cellTwo_" + setRowNumber; 
  let cellThree = newRow.insertCell(2); cellThree.id = "cellThree_" + setRowNumber; 
  let cellFour = newRow.insertCell(3); cellFour.id = "cellFour_" + setRowNumber; 
  let cellFive = newRow.insertCell(4); cellFive.id = "cellFive_" + setRowNumber; 
  let cellSix = newRow.insertCell(5); cellSix.id = "cellSix_" + setRowNumber; 

  // Add content to the new cells
  cellOne.innerHTML = localStorage.getItem("userName");
  cellTwo.innerHTML = localStorage.getItem("email");
  cellThree.innerHTML = localStorage.getItem("phone");
  cellFour.innerHTML = localStorage.getItem("gender");
  cellFive.innerHTML = "<span value='Edit' onclick='editRow(this)'>Edit</span>";
  cellSix.innerHTML = "<span value='X' onclick='deleteRow(this)'>X</span>";

  // Setting colors to edit and delete(X) buttons
  cellFive.style.color = "blue";
  cellSix.style.color = "red";

}