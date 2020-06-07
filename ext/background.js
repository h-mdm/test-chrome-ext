// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var webPort = null;
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

chrome.runtime.onConnectExternal.addListener(function(port) {
	webPort = port;
    port.onMessage.addListener(function(message) {
        console.log("Background script received message, type: " + message.type);
        if (message.type === "connect") {
	        connect();
	    } else if (message.type === "send") {
	        sendNativeMessage(message.text);
	    }
    });
});

