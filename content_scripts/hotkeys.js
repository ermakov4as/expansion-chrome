var altIndex = false;

//let API_URL = "";
//let permission; /////

/*chrome.storage.sync.get(['access', 'API_URL'], function(items) {
    //permission = items.access;
    //alert(permission);
    API_URL = items.API_URL;
});*/
//setTimeout(function() { alert(permission + ' ! ' + API_URL) }, 4);
//alert(permission + ' ! ' + API_URL);

//const API_URL = "https://extension-chrome-1.firebaseio.com/test.json";

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

//let flag = false; //////////////////
function addFromHotKey(text) {
    chrome.storage.sync.get(['access', 'API_URL'], function(items) {
        if (items.access) {
            let xhr = new XMLHttpRequest();
            data = { "selected_text": text };
            xhr.open('PUT', items.API_URL, true);
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
        } else {
            chrome.runtime.sendMessage({ type: 'access-denied', text: "" }, function(response) {});
        };
    });
    /*chrome.storage.sync.set({ 'access': flag }, function() {
        //alert('Settings saved');
    });*/
};