import { clearEntryFields } from './clearEntries.js';
import { checkNotIsEmpty, validateEmail, validateFlexiblePhone } from './validation.js';
import { createTableFromData } from './createTable.js';

export function saveData(){
  var name = document.getElementById("userName").value;
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