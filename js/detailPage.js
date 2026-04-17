function saveData(){
    var name = document.getElementById("userName").value;//alert(name);
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var gender = document.getElementById("gender").value;//alert(gender);
    var err; 

    if(name == "" && email == "" && password == "" ){
        //alert("Please fill details in all required fields");
        document.getElementById("mandatoryName").style.display= 'inline';
        document.getElementById("mandatoryEmail").style.display= 'inline';
        document.getElementById("mandatoryPassword").style.display= 'inline';
        err = "Please fill details in all required fields";
        //return; // Stop form submission
    }
    else if (name == "") {
        //alert("Name is required!");
        document.getElementById("mandatoryName").style.display= 'inline';
        err = "Name is required!";
        //return;// Stop form submission
    }
    else if (email == "") {
        //alert("Email is required!");
        document.getElementById("mandatoryEmail").style.display= 'inline';
        err = "Email is required!";
        //return;// Stop form submission
    }
    else if (password == "") {
        //alert("Password is required!");
        document.getElementById("mandatoryPassword").style.display= 'inline';
        err = "Password is required!";
        //return; // Stop form submission
    }
    
    
    if(name != "" )
    {
        document.getElementById("mandatoryName").style.display= 'none';        
    }    
    if(email != "" )
    {
        document.getElementById("mandatoryEmail").style.display= 'none';        
    }    
    if(password != "" )
    {
        document.getElementById("mandatoryPassword").style.display= 'none';        
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
    localStorage.setItem("password", password);
    localStorage.setItem("gender", gender);

    
    // Retrieve
    /*document.getElementById("displayName").innerHTML = localStorage.getItem("userName");
    document.getElementById("displayEmail").innerHTML = localStorage.getItem("email");
    document.getElementById("displayPassword").innerHTML = localStorage.getItem("password");
    document.getElementById("displayGender").innerHTML = localStorage.getItem("gender");*/

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

    // Add content to the new cells
    cellOne.innerHTML = localStorage.getItem("userName");
    cellTwo.innerHTML = localStorage.getItem("email");
    cellThree.innerHTML = localStorage.getItem("password");
    cellFour.innerHTML = localStorage.getItem("gender");

    //alert(document.getElementById("viewData").innerHTML);
    // clear entry fields after submission
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("gender").value = "";

}