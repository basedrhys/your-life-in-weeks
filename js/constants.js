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
const boxSize = 12, boxMargin = 6;
const currWeekBoxIncrease = 6;
const lineWidth = 3
const boxAndMarginSize = boxSize + boxMargin

/**
 * Color Constants
 */
const pastColor = "#FF5252";
const currentColor = "#4CAF50"
const futureColor = "#BDBDBD"

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
