'use strict';

import { calcDoneWeeks, setMessage, setupButtonListeners, saveCanvasToImage } from "./util.js";
import { clearCanvas, drawThisWeek, setupCanvas } from "./drawing.js"

setupCanvas();
clearCanvas();


setupButtonListeners();

// Set the input values if we've already saved a birthdate
chrome.storage.sync.get(['birthDateSet'], function(result) {
  let birthDateSet = result.birthDateSet
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
    let doneWeeks = calcDoneWeeks(
      birthValues.birthYear,
      birthValues.birthMonth,
      birthValues.birthDay)

    let weekCount = 0

    let currWeekX, currWeekY;
    
    for (let year = 0; year < numYears; year++) {
      for (let week = 0; week < numWeeks; week++) {        
        weekCount++;

        let xPos = week * boxAndMarginSize
        let yPos = year * boxAndMarginSize

        ctx.fillStyle = pastColor;
        
        if (weekCount === doneWeeks) {
          currWeekX = xPos - currWeekBoxIncrease;
          currWeekY = yPos - currWeekBoxIncrease;
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

    drawThisWeek(currWeekX, currWeekY)

    saveCanvasToImage();
  })
});


