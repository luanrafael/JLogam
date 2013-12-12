var alpha = 0;
var beta = 0;
var gamma = 0;

var listx = [];
var listy = [];
var listz = [];
var cont = 0;
var cheers = false;

var supportsVibrate = "vibrate" in navigator;

window.onload = function () {
	console.log("started");
    if (window.DeviceOrientationEvent || window.OrientationEvent) {
        window.addEventListener('deviceorientation', devOrientHandler, false);
    } else {
        alert("Not Supported");
    }

};

//Accelerometer Listener
function devOrientHandler(event) {

	var x = event.alpha;
    var y = event.beta;
    var z = event.gamma;

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

//moviment listener
function checkMoviment() {
    avgx = listx.avg();
    avgy = listy.avg();
    avgz = listz.avg();
    listx = [];
    listy = [];
    listz = [];
    cont = 0;
    if (avgx > 180 && avgx < 300 && avgy >= -20 && avgy <= 20 && avgz >= -30 && avgz <= 30) {
    	console.log("Initial Movement - ", avgx, avgy, avgz);
        cheers = true;
        document.getElementById("imagem").setAttribute("src", "");
        return true;
    }
    if (avgx > 170 && avgx < 270 && avgy >= -140 && avgy <= -40 && avgz >= -30 && avgz <= 30) {
        console.log("Final Movement - ", avgx, avgy, avgz);
        if (cheers) {
        	//Action
            document.getElementById("imagem").setAttribute("src", "https://dl.dropboxusercontent.com/u/48558636/brinde.png");
            navigator.vibrate(1000);
            cheers = false;
            console.log("Tim... Tim..., cheers! \n( _ )\n _|_");
        }
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