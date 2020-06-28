'use strict';

import { weeksBetween, setMessage } from "./util.js";

// CONSTANTS
const canvas = document.getElementById('myCanvas'); 
const ctx = canvas.getContext('2d');
const numWeeks = 52;
const numYears = 90;
const boxSize = 12, boxMargin = 6;
const currWeekBoxIncrease = 6;
const lineWidth = 3
const boxAndMarginSize = boxSize + boxMargin

// Set the canvas size
canvas.width = boxAndMarginSize * numWeeks - boxMargin;
canvas.height = boxAndMarginSize * numYears - boxMargin;
ctx.fillStyle = "#FFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    let currWeekX, currWeekY, currWeekBoxSize;
    
    for (let year = 0; year < numYears; year++) {
      for (let week = 0; week < numWeeks; week++) {        
        weekCount++;

        let xPos = week * boxAndMarginSize
        let yPos = year * boxAndMarginSize
        
        if (weekCount === doneWeeks) {
          currWeekX = xPos - currWeekBoxIncrease;
          currWeekY = yPos - currWeekBoxIncrease;
          currWeekBoxSize = boxSize + (currWeekBoxIncrease * 2)
        } else if (weekCount > doneWeeks) {
          // if (year == numYears - 1) 
          //   ctx.fillStyle = "#FF0"
          // else if (week == numWeeks - 1)
          //   ctx.fillStyle = "#F0F"
          // else
            ctx.fillStyle = futureColor;
        }


        ctx.fillRect(xPos, yPos, boxSize, boxSize);
      }
    }

    // Draw the outline - a black filled box slightly bigger
    ctx.fillStyle = "#000"
    ctx.fillRect(currWeekX-lineWidth, 
                currWeekY-lineWidth, 
                currWeekBoxSize + (lineWidth * 2), 
                currWeekBoxSize + (lineWidth * 2));

    ctx.fillStyle = currentColor;
    ctx.fillRect(currWeekX, 
                currWeekY, 
                currWeekBoxSize, 
                currWeekBoxSize);

    // save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL();

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    var img = document.getElementById('canvasImg')
    img.src = dataURL;
    img.style = "";
  })
});


