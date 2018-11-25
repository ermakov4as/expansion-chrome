var ctrlIndex = false;

const API_URL = "https://extension-chrome-1.firebaseio.com/test.json";

document.body.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
        ctrlIndex = true;
    };
    if (e.keyCode == 81) {
        if (ctrlIndex) {
            //alert('!!!');
            var selection = window.getSelection().toString();
            if (selection != "") {
                if (confirm('Выделенный текст: "' + selection + '"\nДобавить в тренажёр?')) {
                    addFromHotKey(selection);
                };
            };
        };
    };
});

document.body.addEventListener('keyup', function(e) {
    if (!e.ctrlKey) {
        ctrlIndex = false;
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
            alert('Ошибка загрузки');
            console.log('Error! ' + xhr.status + ': ' + xhr.statusText);
        } else {
            //alert('Success');
        };
    };
};