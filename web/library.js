function isInstalled() {
    return document.body.getAttribute('extension-installed');
}

var extensionId = "knldjmfmopnpolahpmmgbagdohdnhkik";
var extensionPort = chrome.runtime.connect(extensionId);

function connectApp() {
	extensionPort.postMessage({ type: "connect" }, "*");
}

function sendMessage(message) {
	extensionPort.postMessage({ type: "send", text: message }, "*");
}

var receiveMessagesHandler = null;
var connectErrorHandler = null;

function processRawMessages(message) {
    if (message.type === 'response' && receiveMessagesHandler !== null) {
		receiveMessagesHandler(message.text);
	} else if (message.type === 'connect-error' && connectErrorHandler !== null) {
		connectErrorHandler(message.text);
	}
}

extensionPort.onMessage.addListener(function(message) {
    processRawMessages(message);
});