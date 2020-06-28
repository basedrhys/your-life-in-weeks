'use strict';

import { weeksBetween, setMessage } from "./util.js";

// CONSTANTS
const canvas = document.getElementById('myCanvas'); 
const ctx = canvas.getContext('2d');
const numWeeks = 52;
const numYears = 90;
const boxScale = 0.35;
const xMult = 30, yMult = 30, boxWidth = 20, boxHeight = 20;


let pastColor = "#FF5252";
let currentColor = "#4CAF50"
let futureColor = "#BDBDBD"

ctx.fillStyle = pastColor;

let birthDateSet;
let birthYear, birthMonth, birthDay;

setMessage("")
// Set the input values if we've already saved a birthdate
chrome.storage.sync.get(['birthDateSet'], function(result) {
  birthDateSet = result.birthDateSet
  if (!birthDateSet) {
    setMessage("No birthdate set, please set this in the extension options")
    return
  }
  // Get the rest of the birth values
  chrome.storage.sync.get([
    'birthYear',
    'birthMonth',
    'birthDay'
  ], function(birthValues) {
    birthYear = birthValues.birthYear
    birthMonth = birthValues.birthMonth
    birthDay = birthValues.birthDay
    
    let currDate = new Date()
    let birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`)
    
    let doneWeeks = weeksBetween(birthDate, currDate)
    let weekCount = 0
    
    for (let year = 0; year < numYears; year++) {
      for (let week = 0; week < numWeeks; week++) {
        ctx.fillRect((week * xMult) * boxScale, (year * yMult) * boxScale, boxWidth * boxScale, boxHeight * boxScale);
        
        weekCount++;
        if (weekCount === doneWeeks) {
          ctx.fillStyle = currentColor;
        } else if (weekCount > doneWeeks) {
          ctx.fillStyle = futureColor;
        }
      }
    }
  })
});


