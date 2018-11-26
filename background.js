function createNotification(data) {
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

chrome.runtime.onMessage.addListener(createNotification);