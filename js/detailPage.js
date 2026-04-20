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
        errValidateName = checkNotIsEmpty(name);
        if(errValidateName != "" && errValidateName != undefined){
            document.getElementById("mandatoryName").style.display= 'block';
            return;// Stop form submission
        }     
    }    
    if(email != "" )
    { 
        errValidateEmail = validateEmail(email);
        if(errValidateEmail != "" && errValidateEmail != undefined){
            document.getElementById("mandatoryEmail").style.display= 'block';
            return;// Stop form submission
        }      
    }    
    if(phone != "" )
    {   
        errValidatePhone = validateFlexiblePhone(phone); 
        if(errValidatePhone != "" && errValidatePhone == "error in phone number"){ //alert("here" + errValidatePhone);
            document.getElementById("mandatoryPhone").style.display= 'block'; 
            return;// Stop form submission
        }       
    }

    if(err != "" && err != undefined){
        alert(err); 
        return; // Stop form submission
    }else{
        alert("Data saved successfully!");
    }

    //save to local storage
    localStorage.setItem("userName", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("gender", gender);   

    let table = document.getElementById("viewData"); 
    // Insert a new row at the end (-1 adds to the last position)
    let newRow = table.insertRow(-1); 
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

    //alert(document.getElementById("viewData").innerHTML);
    // clear entry fields after submission
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("mandatoryName").style.display= 'block';
    document.getElementById("mandatoryEmail").style.display= 'block';
    document.getElementById("mandatoryPhone").style.display= 'block';

}

//This function will delete the corresponding row of the table when user clicks on delete(X) button.
function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("viewData").deleteRow(i);
}

/*function editRow(r) {//alert("edit");
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
  
}*/

//This function will check if the name is empty or not. Can be used for other fields as well if needed to check NotIsEmpty.
function checkNotIsEmpty(name) {  
  if(name.trim() === "" || name == null) {//alert(name);
    document.getElementById("mandatoryName").style.display= 'block';
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
    document.getElementById("mandatoryEmail").style.display= 'block';
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
    document.getElementById("mandatoryPhone").style.display= 'block';
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