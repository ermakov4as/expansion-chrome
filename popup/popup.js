let selectedText = [];
let permission = false;
let firstAccessTry = true;
let firstAccessFlag = false;

chrome.storage.sync.get(['access'], function(items) { permission = items.access });

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.executeScript(null, { "code": "window.getSelection().toString()" }, function(selection) {
        if (selection) {
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
    });
    if (permission) {
        document.getElementById("authorized").classList.remove("extension-hidden");
        document.getElementById("non-authorized").classList.add("extension-hidden");
    } else {
        document.getElementById("authorized").classList.add("extension-hidden");
        document.getElementById("non-authorized").classList.remove("extension-hidden");
    };
    setTimeout(function() { checkAccess() }, 4);
    document.getElementById('add').onclick = addToTrainer;
    document.getElementById('logout').onclick = logout;
});

function addToTrainer() {
    let xhr = new XMLHttpRequest();
    chrome.storage.sync.get(['API_URL'], function(items) {
        data = { "selected_text": selectedText };
        xhr.open('PUT', items.API_URL, true);
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
    });
};

function checkAccess() {
    if (permission) {
        document.getElementById("authorized").classList.remove("extension-hidden");
        document.getElementById("non-authorized").classList.add("extension-hidden");
    } else {
        document.getElementById("authorized").classList.add("extension-hidden");
        document.getElementById("non-authorized").classList.remove("extension-hidden");
    };
};

function logout() {
    // ADD LOGOUT REQUEST
    permission = false;
    chrome.storage.sync.set({ 'access': false }, function() {});
    document.getElementById("first-logit-try").classList.remove("extension-hidden");
    document.getElementById("not-first-logit-try").classList.add("extension-hidden");
    checkAccess();
};

function login() {
    // ADD LOGIN REQUEST
    // IF SUCCESS
    permission = true;
    chrome.storage.sync.set({ 'access': true }, function() {});
    checkAccess();
    // IF ERROR
    // document.getElementById("first-logit-try").classList.add("extension-hidden");
    // document.getElementById("not-first-logit-try").classList.remove("extension-hidden");
};