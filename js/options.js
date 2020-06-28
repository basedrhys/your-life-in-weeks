// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

import { setInputValues, saveInputValues } from "./util.js";

let inputYear = document.getElementById("inputYear")
let inputMonth = document.getElementById("inputMonth")
let inputDay = document.getElementById("inputDay")

setInputValues(inputYear, inputMonth, inputDay)

// Put the saved values into the input fields
let saveButton = document.getElementById("saveButton")
saveButton.addEventListener('click', function() {
  saveInputValues(inputYear, inputMonth, inputDay)
})
