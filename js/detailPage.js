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
    else if (name == "") {
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
        document.getElementById("mandatoryName").style.display= 'none';        
    }    
    if(email != "" )
    { 
        errValidateEmail = validateEmail(email);
        if(errValidateEmail != "" && errValidateEmail != undefined){
            return;// Stop form submission
        }
        document.getElementById("mandatoryEmail").style.display= 'none';        
    }    
    if(phone != "" )
    {
        document.getElementById("mandatoryPhone").style.display= 'none';        
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

    // Setting colors
    cellFive.style.color = "blue";
    cellSix.style.color = "red";

    //alert(document.getElementById("viewData").innerHTML);
    // clear entry fields after submission
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("Phone").value = "";
    document.getElementById("gender").value = "";

}

function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("viewData").deleteRow(i);
}

function validateEmail(email) {
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
  var isValid = pattern.test(email);
  if(!isValid) {
    document.getElementById("mandatoryEmail").innerHTML= 'invalid email';
    //alert("Please enter a valid email address.");
    return "Please enter a valid email address.";
    ;
  }
}