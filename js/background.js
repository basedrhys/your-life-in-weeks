'use strict';

/**
 * Set the default birthdate when this extension is installed
 */
chrome.runtime.onInstalled.addListener(function() {
  var today = new Date();
  var defaultYear = today.getFullYear();
  var defaultMonth = today.getMonth() + 1;
  var defualtDay = today.getDay();
  chrome.storage.sync.set({birthYear: defaultYear, birthMonth: defaultMonth, birthDay: defualtDay});
});
