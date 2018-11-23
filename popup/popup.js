document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.executeScript(null, { "code": "window.getSelection().toString()" }, function(selection) {
        let selectedText = selection[0];
        selectedText = selectedText.replace(/^\s*/, ' ').replace(/\s*$/, ' ');
        document.getElementById("output").innerHTML = selectedText;
        if (selectedText.length > 1) {
            document.getElementById("btn").classList.remove("extension-hidden");
            document.getElementById("text").classList.remove("extension-hidden");
            document.getElementById("ifNoText").classList.add("extension-hidden");
        } else {
            document.getElementById("btn").classList.add("extension-hidden");
            document.getElementById("text").classList.add("extension-hidden");
            document.getElementById("ifNoText").classList.remove("extension-hidden");
        };
        document.getElementById('add').onclick = addToTrainer;
    });
});

function addToTrainer() {
    alert('aaa');
    /*let test = { "test_a": "test_b" };
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "https://extension-chrome-1.firebaseio.com/", true);
    //xhr.send([test]);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert('Error! ' + xhr.status + ': ' + xhr.statusText);
        } else {
            alert(xhr.responseText);
        };
    };*/
};