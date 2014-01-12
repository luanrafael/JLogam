var alpha = 0;
var beta = 0;
var gamma = 0;

var listx = [];
var listy = [];
var listz = [];
var cont = 0;
var cheers = false;

var supportsVibrate = "vibrate" in navigator;
var ball;
window.onload = function () {

    console.log("started");
    ball = document.getElementById("bolinha");

    if (window.DeviceOrientationEvent){
        window.addEventListener('deviceorientation', devOrientHandler, false);
    }  else {
        alert("Not Supported - deviceorientation");
    }
    shortcut.add("Enter",function() {
        if(document.activeElement == document.getElementById("clitext")){
            cliSimulate();
        }
    });

};

//Accelerometer Listener
function devOrientHandler(event) {
    var x = event.alpha;
    var y = event.beta;
    var z = event.gamma;

    if(x !== null && y !== null && z !== null){
        if(cheers === false){
            ball.style.background = 'blue';
        }
    }


    if (alpha != x || beta != y || gamma != z) {
        alpha = x;
        beta = y;
        gamma = z;

        roundX = Math.round(alpha);
        roundY = Math.round(beta);
        roundZ = Math.round(gamma);
        setInterval(readData(roundX, roundY, roundZ), 500);
        return true;
    }
    return false;
}

function readData(alpha, beta, gamma) {

    listx[cont] = alpha;
    listy[cont] = beta;
    listz[cont] = gamma;

    cont += 1;

    if (cont >= 15) {
        checkMoviment();
    }
}

function checkMoviment() {
    avgx = listx.avg();
    avgy = listy.avg();
    avgz = listz.avg();
    listx = [];
    listy = [];
    listz = [];
    cont = 0;
    if (avgx > 180 && avgx < 300 && avgy >= -40 && avgy <= 40 && avgz >= -60 && avgz <= 60) {
        console.log("Initial Moviment - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
        ball.style.background = 'green';
        cheers = true;
        return true;
    }
    if (avgx > 170 && avgx < 270 && avgy >= -140 && avgy <= -40 && avgz >= -30 && avgz <= 30) {
        console.log("Final Moviment - ", avgx, avgy, avgz);
        actionTwitte(cheers);
        return true;
    }
    return false;
}


Array.prototype.avg = function () {
    var av = 0;
    var cnt = 0;
    var len = this.length;
    for (var i = 0; i < len; i++) {
        var e = +this[i];
        if (!e && this[i] !== 0 && this[i] !== '0') e--;
        if (this[i] == e) {
            av += e;
            cnt++;
        }
    }
    return av / cnt;
};

function actionTwitte(arg){
    if (arg) {
        cheers = false;
        navigator.vibrate(1000);
        console.log("Tim... Tim..., cheers! \n( _ )\n _|_");
        window.location.assign("https://twitter.com/intent/tweet?hashtags=JLogam%2C&original_referer=http%3A%2F%2Flocalhost%3A8080%2FJLogam%2Fdemo%2Fcheers.html&related=lrpinheiroo&text=JLogam%20-%20JavaScript%20Libary%20for%20Open%20Gestures%20Acessibility%20Mobile&tw_p=tweetbutton");
    }
    return arg;
}