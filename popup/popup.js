document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.executeScript(null, { "code": "window.getSelection().toString()" }, function(selection) {
        let selectedText = selection[0];
        selectedText = selectedText.replace(/^\s*/, ' ').replace(/\s*$/, ' ');
        document.getElementById("output").innerHTML = selectedText;
        if (selectedText.length > 1) {
            document.getElementById("btn").classList.remove("extension-hidden");
            document.getElementById("text").classList.remove("extension-hidden");
        } else {
            document.getElementById("btn").classList.add("extension-hidden");
            document.getElementById("text").classList.add("extension-hidden");
        };
        document.getElementById('add').onclick = addToTrainer;
    });
});

function addToTrainer() {
    alert('aaa');
};