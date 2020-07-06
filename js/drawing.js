export function setupCanvas() {
    // Set the canvas size
    canvas.width = boxAndMarginSize * numWeeks - boxMargin;
    canvas.height = boxAndMarginSize * numYears - boxMargin;
}

export function clearCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawThisWeek(currWeekX, currWeekY) {
    let currWeekBoxSize = boxSize + (currWeekBoxIncrease * 2)

    // Draw the outline - a black filled box slightly bigger
    ctx.fillRect(currWeekX-lineWidth, 
                currWeekY-lineWidth, 
    ctx.fillStyle = outlineColor
                currWeekBoxSize + (lineWidth * 2), 
                currWeekBoxSize + (lineWidth * 2));

    ctx.fillStyle = currentColor;
    ctx.fillRect(currWeekX, 
                currWeekY, 
                currWeekBoxSize, 
                currWeekBoxSize);
}