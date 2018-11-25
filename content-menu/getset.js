var logging = false;

const API_URL = "https://extension-chrome-1.firebaseio.com/test.json";

function setItem(key, value) {
    try {
        log("Inside setItem:" + key + ":" + value);
        window.localStorage.removeItem(key);
        window.localStorage.setItem(key, value);
    } catch (e) {
        log("Error inside setItem");
        log(e);
    };
    log("Return from setItem" + key + ":" + value);
};

function getItem(key) {
    var value;
    log('Get Item:' + key);
    try {
        value = window.localStorage.getItem(key);
    } catch (e) {
        log("Error inside getItem() for key:" + key);
        log(e);
        value = "null";
    };
    log("Returning value: " + value);
    return value;
};

function clearStrg() {
    log('about to clear local storage');
    window.localStorage.clear();
    log('cleared');
};

function log(txt) {
    if (logging) {
        console.log(txt);
    };
};

function addFromMenu(text) {
    let xhr = new XMLHttpRequest();
    data = { "selected_text": text };
    xhr.open('PUT', API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {

            alert('Ошибка загрузки');
            console.log('Error! ' + xhr.status + ': ' + xhr.statusText);
        } else {
            //alert('Success');
        };
    };
};