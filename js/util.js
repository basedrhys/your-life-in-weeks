export function setInputValues(inputYear, inputMonth, inputDay) {
    // Set the input values if we've already saved a birthdate
    chrome.storage.sync.get(['birthDateSet'], function(result) {
        let birthDateSet = result.birthDateSet
        if (birthDateSet) {
            // Get the rest of the birth values
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
    });
}

export function saveInputValues(inputYear, inputMonth, inputDay) {
    chrome.storage.sync.set({
        birthDateSet: true,
        birthYear: inputYear.value,
        birthMonth: inputMonth.value,
        birthDay: inputDay.value
    }, function() {
        chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.remove(tab.id, function() { });
        });
    })    
}

export function weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
  }

export function setMessage(msg) {
    document.getElementById("message").innerHTML = msg;
}

