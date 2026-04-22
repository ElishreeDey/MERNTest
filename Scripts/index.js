import { clearEntryFields } from './modules/clearEntries.js';
import { checkNotIsEmpty, validateEmail, validateFlexiblePhone } from './modules/validation.js';
import { createTableFromData } from './modules/createTable.js';
import { saveEditedData,deleteRow ,editRow} from './modules/editDeleteData.js';
import { saveData} from './modules/saveData.js';
import { displayData} from './modules/displayTable.js';

window.saveData = saveData;
window.saveEditedData = saveEditedData;
window.deleteRow = deleteRow;
window.editRow = editRow;
window.checkNotIsEmpty = checkNotIsEmpty;
window.validateEmail = validateEmail;
window.validateFlexiblePhone = validateFlexiblePhone;

// run on load
window.onload = displayData;