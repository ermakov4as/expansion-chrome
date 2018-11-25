let selectedText = [];

const API_URL = "https://extension-chrome-1.firebaseio.com/test.json";

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.executeScript(null, { "code": "window.getSelection().toString()" }, function(selection) {
        if (selection[0]) {
            selectedText = selection[0];
            selectedText = selectedText.replace(/^\s*/, ' ').replace(/\s*$/, ' ');
            selectedText = selectedText.slice(1, -1);
            document.getElementById("output").innerHTML = selectedText;
        };
        if (selectedText.length > 1) {
            document.getElementById("btn").classList.remove("extension-hidden");
            document.getElementById("text").classList.remove("extension-hidden");
            document.getElementById("ifNoText").classList.add("extension-hidden");
        } else {
            document.getElementById("btn").classList.add("extension-hidden");
            document.getElementById("text").classList.add("extension-hidden");
            document.getElementById("ifNoText").classList.remove("extension-hidden");
            document.getElementById("success").classList.add("extension-hidden");
            document.getElementById("error").classList.add("extension-hidden");
        };
        document.getElementById('add').onclick = addToTrainer;
    });
});

function addToTrainer() {
    let xhr = new XMLHttpRequest();
    data = { "selected_text": selectedText };
    xhr.open('PUT', API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            document.getElementById("error").classList.remove("extension-hidden");
            document.getElementById("btn").classList.add("extension-hidden");
            console.log('Error! ' + xhr.status + ': ' + xhr.statusText);
        } else {
            document.getElementById("success").classList.remove("extension-hidden");
            document.getElementById("btn").classList.add("extension-hidden");
        };
    };
};