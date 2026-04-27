/*
****************************************************************************************************************************
* Filename    : clearEntries
* Description : This file holds function to clear all entry fields after entry.
* Functions   : "clearEntryFields"
* Author      : Elishree Dey Chand
* Created     : 2026-05-21
****************************************************************************************************************************
*/
//This function will clear all entry fields after entry.
export function clearEntryFields(){
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