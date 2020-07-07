'use strict';

import { setInputValues, saveInputValues } from "./util.js";

// Set the inputs to the previously saved values
let inputYear = document.getElementById("inputYear")
let inputMonth = document.getElementById("inputMonth")
let inputDay = document.getElementById("inputDay")

setInputValues(inputYear, inputMonth, inputDay)

// When the save button is clicked, save the values
let saveButton = document.getElementById("saveButton")
saveButton.addEventListener('click', function() {
  saveInputValues(inputYear, inputMonth, inputDay)
})
