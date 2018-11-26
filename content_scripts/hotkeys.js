var altIndex = false;

const API_URL = "https://extension-chrome-1.firebaseio.com/test.json";

document.body.addEventListener('keydown', function(e) {
    if (e.altKey) {
        altIndex = true;
    };
    if (e.keyCode == 81) {
        if (altIndex) {
            var selection = window.getSelection().toString();
            if (selection != "") {
                addFromHotKey(selection);
            };
        };
    };
});

document.body.addEventListener('keyup', function(e) {
    if (!e.altKey) {
        altIndex = false;
    };
});

function addFromHotKey(text) {
    let xhr = new XMLHttpRequest();
    data = { "selected_text": text };
    xhr.open('PUT', API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            chrome.runtime.sendMessage({ type: 'error', text: xhr.status }, function(response) {});
            console.log('Error! ' + xhr.status + ': ' + xhr.statusText);
        } else {
            chrome.runtime.sendMessage({ type: 'success', text: text }, function(response) {});
        };
    };
};