var connected = false;

function updateUiState() {
    if (connected) {
        document.getElementById('connect-button').style.display = 'none';
        document.getElementById('input-text').style.display = 'block';
        document.getElementById('send-message-button').style.display = 'block';
    } else {
        document.getElementById('connect-button').style.display = 'block';
        document.getElementById('input-text').style.display = 'none';
        document.getElementById('send-message-button').style.display = 'none';
    }
}
 
function appendMessage(text) {
    document.getElementById('response').innerHTML += "<p>" + text + "</p>";
}

function connect() {
    connectApp();
	connected = true;
	updateUiState();
}

function sendMessageFromInput() {
    var text = document.getElementById('input-text').value;
	sendMessage(text);
}

window.onload = function() {
	if (!isInstalled()) {
		alert("Extension not installed!");
	} else {
		receiveMessagesHandler = function(message) {
	        appendMessage("Received message: <b>" + message + "</b>");
		}
		connectErrorHandler = function(cause) {
		    connected = false;
			appendMessage("Failed to connect: " + cause);
			updateUiState();
		}
	}
	document.getElementById('connect-button').addEventListener('click', connect);
    document.getElementById('send-message-button').addEventListener('click', sendMessageFromInput);
    updateUiState();
};
	  