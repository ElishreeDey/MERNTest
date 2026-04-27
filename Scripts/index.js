/*
**********************************************************************
* Filename    : index.ts
* Description : Primary entry point for all functions. Imports required modules, and binds functions 
* to the global window object for interaction with HTML.
* Author      : Elishree Dey Chand
* Created     : 2026-05-21
**********************************************************************
*/

// Import functions
import { clearEntryFields } from './modules/clearEntries.js';
import { checkNotIsEmpty, validateEmail, validateFlexiblePhone } from './modules/validation.js';
import { createTableFromData } from './modules/createTable.js';
import { saveEditedData,deleteRow ,editRow} from './modules/editDeleteData.js';
import { saveData} from './modules/saveData.js';
import { displayData} from './modules/displayTable.js';

// This is required for window event handlers
window.saveData = saveData;
window.saveEditedData = saveEditedData;
window.deleteRow = deleteRow;
window.editRow = editRow;
window.checkNotIsEmpty = checkNotIsEmpty;
window.validateEmail = validateEmail;
window.validateFlexiblePhone = validateFlexiblePhone;

// run on load
window.onload = displayData;