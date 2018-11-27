var _all;
var numentries;

const API_URL = "https://extension-chrome-1.firebaseio.com/test.json";

var newBuildNumber = 100;
setItem("_buildNumber", newBuildNumber);

function updatemenu() {
    chrome.contextMenus.removeAll();

    var searchstring = getItem("_allsearch");

    if (searchstring == null) {
        setItem("_askbg", "false");
        setItem("_asknext", "true");
        setItem("_askoptions", "true");

        _all = new Array(1);

        // 0th item in the array is reserved for context menu item id

        _all[0] = new Array(3);
        _all[0][1] = "Добавить выделенный текст в Тренажёр"; // Display label
        _all[0][2] = true; // whether this option is enabled or not
        numentries = 1;

        var stringified = JSON.stringify(_all);
        setItem("_allsearch", stringified);
    } else {
        _all = JSON.parse(searchstring);
        numentries = _all.length;
    };

    for (var i = 0; i < numentries; i++) {
        if (_all[i][2]) {
            _all[i][0] = chrome.contextMenus.create({ "title": _all[i][1], "contexts": ["selection"], "onclick": searchOnClick });
        } else _all[i][0] = -1;
    };
};

function searchOnClick(info, tab) {
    var itemindex = 0;
    for (var i = 0; i < numentries; i++) {
        if (info.menuItemId == _all[i][0]) {
            addFromMenu(info.selectionText);
            itemindex = i;
        };
    };
};

updatemenu();

function addFromMenu(text) {
    let xhr = new XMLHttpRequest();
    data = { "selected_text": text };
    xhr.open('PUT', API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            createNotificationSearch({ type: 'error', text: xhr.status });
            console.log('Error! ' + xhr.status + ': ' + xhr.statusText);
        } else {
            chrome.storage.sync.get(['foo', 'bar'], function(items) {
                alert('rmb ' + items.foo);
            });
            //createNotificationSearch({ type: 'success', text: text });
        };
    };
};

function createNotificationSearch(data) {
    let title = "";
    let msg = "";
    if (data.type === 'success') {
        title = "Добавлено";
        msg = `Выделенный текст "${data.text}" добавлен в Тренажёр`;
    } else if (data.type === 'error') {
        title = "Ошибка!";
        msg = `Ошибка ${data.text} при добавлении выделенного текста в Тренажёр`;
    };
    let timestamp = new Date().getTime();
    let id = 'notificationID' + timestamp;
    let opt = { type: "basic", title: title, message: msg, iconUrl: "./images/icon128.png" };
    chrome.notifications.create(id, opt, function() {
        setTimeout(function() { chrome.notifications.clear(id) }, 4000);
    });
};