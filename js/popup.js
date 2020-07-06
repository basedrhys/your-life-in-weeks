'use strict';

import { calcDoneWeeks, setupButtonListeners } from "./util.js";
import { setupCanvas, drawMyLife } from "./drawing.js"

setupButtonListeners();

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
    
    setupCanvas();
    drawMyLife(doneWeeks)
});
  
  
