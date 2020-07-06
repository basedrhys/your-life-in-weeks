// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({birthDateSet: true});
  chrome.storage.sync.set({birthYear: 1996, birthMonth: 11, birthDay: 17});
});
