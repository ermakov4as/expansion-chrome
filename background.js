//createNotification();

function createNotification() {
    var opt = { type: "basic", title: "Success", message: "Loades successfully", iconUrl: "./images/icon128.png" };
    chrome.notifications.create("notificationName", opt, function() {});

    setTimeout(function() { chrome.notifications.clear("notificationName", function() {}), 3000 });
};