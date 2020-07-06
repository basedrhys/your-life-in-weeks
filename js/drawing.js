import { saveCanvasToImage } from "./util.js";

export function setupCanvas() {
    // Set the canvas size
    canvas.width = boxAndMarginSize * numWeeks - boxMargin;
    canvas.height = boxAndMarginSize * numYears - boxMargin;

    clearCanvas();
}

export function clearCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawDay(week, year) {
    let xPos = week * boxAndMarginSize
    let yPos = year * boxAndMarginSize

    ctx.fillRect(xPos, yPos, boxSize, boxSize);
}

export function drawMyLife(doneWeeks) {
    let weekCount = 0
    
    let currWeek, currYear;
    
    for (let year = 0; year < numYears; year++) {
      for (let week = 0; week < numWeeks; week++) {        
        // Set the current fill style
        ctx.fillStyle = pastColor;
                
        if (weekCount > doneWeeks) {
          ctx.fillStyle = futureColor;
          
          if (testMode) {
            drawBorder(week, year);
          } 
        }
        
        drawDay(week, year)

        // Save the position for drawing this week later
        if (weekCount === doneWeeks) {
          currWeek = week;
          currYear = year;
        } 

        weekCount++;
      }
    }
    
    drawThisWeek(currWeek, currYear)
    
    saveCanvasToImage();
}

export function drawThisWeek(currWeek, currYear) {
    let currWeekBoxSize = boxSize + (currWeekBoxIncrease * 2)

    // Convert week and year to actual x and y positions
    let xCorrected = (currWeek * boxAndMarginSize)
    let yCorrected = (currYear * boxAndMarginSize)

    // This week is drawn bigger so set the x and y to match that
    xCorrected = xCorrected - currWeekBoxIncrease;
    yCorrected = yCorrected - currWeekBoxIncrease;

    // Draw the outline - a black filled box slightly bigger
    ctx.fillStyle = outlineColor
    ctx.fillRect(xCorrected-lineWidth, 
                yCorrected-lineWidth, 
                currWeekBoxSize + (lineWidth * 2), 
                currWeekBoxSize + (lineWidth * 2));

    ctx.fillStyle = currentColor;
    ctx.fillRect(xCorrected, 
                yCorrected, 
                currWeekBoxSize, 
                currWeekBoxSize);
}

export function drawBorder(week, year) {
    if (year == 0 || year == numYears - 1 ||
        week == 0 || week == numWeeks - 1) 
        ctx.fillStyle = testOutsideColor
    else
        ctx.fillStyle = futureColor;
}