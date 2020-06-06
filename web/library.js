function isInstalled() {
    return document.body.getAttribute('extension-installed');
}

function connectApp() {
	window.postMessage({ type: "connect" }, "*");
}

function sendMessage(message) {
	window.postMessage({ type: "send", text: message }, "*");
}

var receiveMessagesHandler = null;
var connectErrorHandler = null;

function processRawMessages(event) {
    if (event.data.type === 'response' && receiveMessagesHandler !== null) {
		receiveMessagesHandler(event.data.text);
	} else if (event.data.type === 'connect-error' && connectErrorHandler !== null) {
		connectErrorHandler(event.data.text);
	}
}

window.addEventListener("message", processRawMessages, false);
