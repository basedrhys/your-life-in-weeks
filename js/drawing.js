import { saveCanvasToImage } from "./util.js";

export function setupCanvas() {
    // Set the canvas size
    let width = numWeeks * boxAndMarginSize - boxMargin
    let height = numYears * boxAndMarginSize - boxMargin;

    width += (canvasPadding * 2)
    height += (canvasPadding * 2)

    width += (textPadding * 2)
    height += (textPadding * 2)

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

function shouldDrawLabel(num) {
    return num != 0 && num % 5 == 0;
}

function drawLabel(val, type) {
    let xPos, yPos;

    let distanceVal = val * boxAndMarginSize;
    let zeroVal = -textGraphSpace;

    if (type == "week") {
        xPos = distanceVal;
        yPos = zeroVal;
        xPos -= boxAndMarginSize * 0.8;
    } else if (type == "year") {
        xPos = zeroVal;
        yPos = distanceVal;
        yPos += boxAndMarginSize * 0.8
    }

    ctx.fillText(
        val.toString(),
        accountForPadding(xPos),
        accountForPadding(yPos)
    )
}

function drawLabels() {
    ctx.font = "12px Arial"
    ctx.fillStyle = "#000"
    
    ctx.textAlign = "right"
    for (let year = 0; year < numYears; year++) {
        
        if (!shouldDrawLabel(year))
            continue;

        drawLabel(year, "year")
    }

    ctx.textAlign = "center";

    for (let week = 0; week < numWeeks; week++) {
        let weekOut = week + 1

        if (!shouldDrawLabel(weekOut)) 
            continue;

        drawLabel(weekOut, "week")
    }
}

export function drawMyLife(doneWeeks) {
    let weekCount = 0
    
    let currWeek, currYear;

    let currColor;

    drawLabels();
    
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

function accountForPadding(val) {
    return val + canvasPadding + textPadding;
}

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color

    ctx.fillRect(
        accountForPadding(x), 
        accountForPadding(y), 
        width, 
        height)
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
    // ctx.fillStyle = outlineColor
    drawRect(xCorrected-lineWidth, 
        yCorrected-lineWidth, 
        currWeekBoxSize + (lineWidth * 2), 
        currWeekBoxSize + (lineWidth * 2),
        outlineColor)
    
    drawRect(xCorrected, 
                yCorrected, 
                currWeekBoxSize, 
                currWeekBoxSize,
                currentColor);
}

function testBorder(week, year) {
    if (year == 0 || year == numYears - 1 ||
        week == 0 || week == numWeeks - 1) 
        return testOutsideColor
    else
        return futureColor;
}