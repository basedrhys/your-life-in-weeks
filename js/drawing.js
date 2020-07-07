import { saveCanvasToImage } from "./util.js";

/**
 * Setup the canvas size - altering width and height clears the canvas so 
 * do this before any drawing.
 */
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

/**
 * Draws a white rect over the canvas
 */
function clearCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw a day on the canvas, given a week and year
 * @param {number} week Week to draw for
 * @param {number} year Year to draw for
 * @param {string} color Color to draw this day with
 */
function drawDay(week, year, color) {
    let xPos = week * boxAndMarginSize
    let yPos = year * boxAndMarginSize

    drawRect(xPos, yPos, boxSize, boxSize, color)
}

/**
 * We don't want to draw every label, this allows only every 5th label to be drawn
 * @param {number} num Number to draw label for
 */
function shouldDrawLabel(num) {
    return num != 0 && num % 5 == 0;
}

/**
 * Draws the (week or year) label on the canvas
 * @param {number} val Week or Year value
 * @param {string} type Type of value we're dealing with - "week" or "year"
 */
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

/**
 * Draw the x and y labels for the week and year
 */
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

/**
 * Entrypoint for the drawing - draws a 90x52 grid of squares, colored in up
 * to the current week.
 * @param {number} doneWeeks Weeks through my life, as of today
 */
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

/**
 * Adds in the outside border to the co-ordinate.
 * @param {number} val Value to shift with padding
 */
function accountForPadding(val) {
    return val + canvasPadding + textPadding;
}

/**
 * Generic rectangle drawing method - corrects the x and y to account for padding.
 * All rect drawing should be done through this method.
 * @param {number} x X position of the rectangle
 * @param {number} y Y position of the rectangle
 * @param {number} width Width of the rectangle
 * @param {height} height Height of the rectangle
 * @param {string} color Color to draw the rectangle
 */
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color

    ctx.fillRect(
        accountForPadding(x), 
        accountForPadding(y), 
        width, 
        height)
}

/**
 * Draws an enlarged square for the current week we're currently in
 * @param {number} currWeek The current week today
 * @param {number} currYear The current year today
 */
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

/**
 * Draws a border on the edge squares of the diagram, useful for debugging
 * @param {number} week The current week we're iterating on
 * @param {number} year The current year we're iterating on
 */
function testBorder(week, year) {
    if (year == 0 || year == numYears - 1 ||
        week == 0 || week == numWeeks - 1) 
        return testOutsideColor
    else
        return futureColor;
}