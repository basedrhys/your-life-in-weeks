'use strict';

/**
 * Set the default birthdate when this extension is installed
 */
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({birthYear: 1996, birthMonth: 11, birthDay: 17});
});
