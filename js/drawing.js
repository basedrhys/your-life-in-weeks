export function setupCanvas() {
    // Set the canvas size
    canvas.width = boxAndMarginSize * numWeeks - boxMargin;
    canvas.height = boxAndMarginSize * numYears - boxMargin;
}

export function clearCanvas() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawThisWeek(currWeekX, currWeekY) {
    let currWeekBoxSize = boxSize + (currWeekBoxIncrease * 2)

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
}