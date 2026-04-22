import { clearEntryFields } from './clearEntries.js';
//This function will delete the corresponding row of the table when user clicks on delete(X) button.
export function deleteRow(r) {
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

export function editRow(r) {//alert("edit");
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

export function saveEditedData(){//alert("save edit");
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
