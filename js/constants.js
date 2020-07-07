/**
 * Flags
 */
const testMode = false;

/**
 * Canvas vars
 */
const canvas = document.getElementById('myCanvas'); 
const ctx = canvas.getContext('2d');

/**
 * Constants
 */
const numWeeks = 52;
const numYears = 90;

// Size of each day
const boxSize = 8;
// Gap between each day
const boxMargin = 4;
// How many pixels to increase the current week's rectangle size
const currWeekBoxIncrease = 4;
// Width of the outline for the current week's rectangle
const lineWidth = 3
// Extra padding outside the canvas
const canvasPadding = 10;
// Extra padding to make space for the labels
const textPadding = 12;
// Gap between the labels and the rectangles
const textGraphSpace = 4;
// Total size of each week (size of the box and the margin)
const boxAndMarginSize = boxSize + boxMargin

/**
 * Color Constants
 */
const pastColor = "#FF5252";
const currentColor = "#4CAF50"
const futureColor = "#BDBDBD"

const testOutsideColor = "#FA0";

const backgroundColor = "#FFF";
const outlineColor = "#000";

/**
 * IDs
 */

// Canvas ID
const canvasImgID = "canvasImg"

// Notification ID
const notificationID = "notificationCard"

// Popup Button IDs
const copyBtnID = "btnCopy"
const lifeChaptersBtnID = "btnLifeChapters"
const yearSplitBtnID = "btnYearSplit"
const optionsBtnID = "btnOptions"
