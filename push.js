var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOz-dAak6qqOZbIIbgKH4jgU45oG5h0214W6Wo1yyjSZpmW227KlKp8ivXnjsR8Xu9Ll7ATrAAs-MjgD0bQutxk",
    "privateKey": "kbCBSPai9sBLextoEgytS1asX_SyK64h7mHX_T5UFR4"
};
 
 
webPush.setVapidDetails(
    'mailto:setiawanagam@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c1w1OpIXrGY:APA91bEqZpSZaRPVgSsQYRM73QNVQnkMwOERxUDx-ygIv24_MIbp5vwBHeSkNCN-1Xoy0IdhcY2ADMoqR24DEup7JOC9UPBSZcqPwfPF5KXUqamUc_W90zVfAFxUGz9XZi2P82PX23jr",
    "keys": {
        "p256dh": "BFTf80EA+IlMjP33K/yIlRgylrcVJ8DLwNfe2QPx3cUysdmTJxIPMwbX+wiFCvJkUxM+5HschVmSel/Sj2uIkE0=",
        "auth": "V79AOw8ysJraRA7wxOiGjg=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '942573020037',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);