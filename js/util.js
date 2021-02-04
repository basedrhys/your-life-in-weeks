export function setInputValues(inputYear, inputMonth, inputDay) {
    // Set the input values if we've already saved a birthdate
    
    chrome.storage.sync.get([
        'birthYear',
        'birthMonth',
        'birthDay'
    ], function(birthValues) {
        inputYear.value = birthValues.birthYear
        inputMonth.value = birthValues.birthMonth
        inputDay.value = birthValues.birthDay
    })
}

export function saveInputValues(inputYear, inputMonth, inputDay) {
    chrome.storage.sync.set({
        birthYear: inputYear.value,
        birthMonth: inputMonth.value,
        birthDay: inputDay.value
    }, function() {
        // Close the current tab when they save
        chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.remove(tab.id, function() { });
        });
    })    
}

export function setupButtonListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        addOptionsBtnListener();
        addCopyBtnListener();
        addDeleteBtnListener();
    });
}

function addDeleteBtnListener() {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        let $notification = $delete.parentNode;
        
        $delete.addEventListener('click', () => {
            $notification.style.display = "none"
        });
    });
}

function addCopyBtnListener() {
    var btn = document.getElementById(copyBtnID)
    // onClick's logic below:
    btn.addEventListener('click', function() {
        copyImgToClipboard();
        showNotification();
    });
}

function addOptionsBtnListener() {
    var btn = document.getElementById(optionsBtnID);
    // onClick's logic below:
    btn.addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
    });
}

function copyImgToClipboard() {
    var img = document.getElementById(canvasImgID)
    var r = document.createRange();
    r.setStartBefore(img);
    r.setEndAfter(img);
    r.selectNode(img);
    var sel = window.getSelection();
    sel.addRange(r);
    document.execCommand('Copy');
    sel.removeAllRanges();
}

function showNotification() {
    var notification = document.getElementById(notificationID)
    notification.style.display = "block"
}

export function calcDoneWeeks(birthYear, birthMonth, birthDay) {
    var fixedBirthMonth = birthMonth - 1;
    let d1 = new Date(birthYear, fixedBirthMonth, birthDay)
    let d2 = new Date();
    return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

export function saveCanvasToImage() {
    // save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL();
    
    // set canvasImg image src to dataURL
    // so it can be saved as an image
    var img = document.getElementById('canvasImg')
    img.src = dataURL;
    img.style = "";
}
