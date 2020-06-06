// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var webPort = chrome.runtime.connect();
var nativePort = null;

function sendNativeMessage(text) {
  message = {"text": text};
  nativePort.postMessage(message);
}

function onNativeMessage(message) {
	webPort.postMessage({"type": "response", "text": message.text});
}

function onDisconnected() {
	webPort.postMessage({"type": "connect-error", "text": chrome.runtime.lastError.message});
	nativePort = null;
}

function connect() {
  var hostName = "com.google.chrome.example.echo";
  nativePort = chrome.runtime.connectNative(hostName);
  nativePort.onMessage.addListener(onNativeMessage);
  nativePort.onDisconnect.addListener(onDisconnected);
}

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window || !event.data.type) {
        return;
	}

    console.log("Content script received message, type: " + event.data.type);
    if (event.data.type === "connect") {
	    connect();
	} else if (event.data.type === "send") {
	    sendNativeMessage(event.data.text);
	}
}, false);

document.body.setAttribute('extension-installed', true);


