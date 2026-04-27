/*
****************************************************************************************************************************
* Filename    : displaytable
* Description : This file hold functions to display already saved info from browser localstorage even on page refresh data stays.
* Functions   : "displayData"
* Imported Functions: "createTableFromData"
* Author      : Elishree Dey Chand
* Created     : 2026-05-21
****************************************************************************************************************************
*/

//First import the required functions
import { createTableFromData } from './createTable.js';

//This function will display already entered data from browser's localstorage.
export function displayData(){
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