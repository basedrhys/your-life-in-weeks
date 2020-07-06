import { saveCanvasToImage } from "./util.js";

export function setupCanvas() {
    // Set the canvas size
    let width = numWeeks * boxAndMarginSize - boxMargin
    let height = numYears * boxAndMarginSize - boxMargin;

    width += (canvasPadding * 2)
    height += (canvasPadding * 2)

    canvas.width = width;
    canvas.height = height;

    clearCanvas();
}

export function clearCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawDay(week, year, color) {
    let xPos = week * boxAndMarginSize
    let yPos = year * boxAndMarginSize

    drawRect(xPos, yPos, boxSize, boxSize, color)
}

export function drawMyLife(doneWeeks) {
    let weekCount = 0
    
    let currWeek, currYear;

    let currColor;
    
    for (let year = 0; year < numYears; year++) {
      for (let week = 0; week < numWeeks; week++) {        
        // Set the current fill style
        currColor = pastColor;
                
        if (weekCount > doneWeeks) {
          currColor = futureColor;
          
          if (testMode) {
              currColor = testBorder(week, year)
          } 
        }
        
        drawDay(week, year, currColor)

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

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color

    x += canvasPadding
    y += canvasPadding

    ctx.fillRect(x, y, width, height)
}

function drawThisWeek(currWeek, currYear) {
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

function testBorder(week, year) {
    if (year == 0 || year == numYears - 1 ||
        week == 0 || week == numWeeks - 1) 
        return testOutsideColor
    else
        return futureColor;
}