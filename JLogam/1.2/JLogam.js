var alpha = 0;
var beta = 0;
var gamma = 0;

var listx = [];
var listy = [];
var listz = [];

var gestures = [];

var gesturelist = [];

var cont = 0;
var callback;
var isCheersConfigured;
var isYesConfigured;
var isNoConfigured;
var isSeccondYesMoviment;
var isSeccondNoMoviment;


function isSupported() {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', gestureListener, false);
        return true;
    }
    return false;
}


JLogam = {

    'setup': function () {
        gesturelist[0] = "cheers";
        isCheersConfigured = false;

        gesturelist[1] = "yes";
        isYesConfigured = false;
        isSeccondYesMoviment = false;

        gesturelist[2] = "no";
        isNoConfigured = false;
        isSeccondNoMoviment = false;
        
        gesturelist[3] = "victory";
        isVictoryConfigured = false;
        
        gesturelist[4] = "front";
        isFrontConfigured = false;

        gesturelist[5] = "back";
        isBackConfigured = false;
        
        gesturelist[6] = "left";
        isLeftConfigured = false;

        gesturelist[7] = "right";
        isRightConfigured = false;
        return isSupported();
    },

        'on': function (arggesture, argcallback) {
        gestures[arggesture] = argcallback;
    },

        'off': function (arggesture) {
        gestures[arggesture] = '';
    }

};

function gestureListener(event) {
    var x = event.alpha;
    var y = event.beta;
    var z = event.gamma;

    if (x === null && y === null && z === null) {
        alert("JLogam is not supported");
    }


    if (alpha != x || beta != y || gamma != z) {
        alpha = x;
        beta = y;
        gamma = z;

        roundX = Math.round(alpha);
        roundY = Math.round(beta);
        roundZ = Math.round(gamma);
        readData(roundX, roundY, roundZ);
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
    console.log("Moviment \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
    for (var i = gesturelist.length - 1; i >= 0; i--) {
        var argexec = gesturelist[i];
        callback = gestures[argexec];
        if (callback !== undefined) {
            window[argexec].call();
        }
    }
}


function cheers() {
    console.log("cheking - cheers");
    bb = document.getElementById("bolinha");
    if (!isCheersConfigured) {
        console.log("Moviment 1 \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 115 && avgx < 300 && avgy >= -15 && avgy <= 15 && avgz >= -60 && avgz <= 60) {
            isCheersConfigured = true;
            bb.style.background = "green";
            return false;
        }
    }

    if (isCheersConfigured) {
        console.log("Moviment 2 \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 115 && avgx < 300 && ((avgy >= -160 && avgy <= -20) || (avgy <= 160 && avgy >= 20)) && avgz >= -60 && avgz <= 60) {
            isCheersConfigured = false;
            callback();
            return true;
        }
    }
    return false;

}


function yes() {
    console.log("cheking - YES");
    if (!isYesConfigured) {
        console.log("Trying Moviment 1 - YES \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 200 && avgx < 300 && ((avgy <= -50 && avgy >= -120) || (avgy >= 50 && avgy <= 120)) && avgz >= -60 && avgz <= 60) {
            if (isSeccondYesMoviment) {
                isSeccondYesMoviment = false;
                callback();
                return true;
            }
            isYesConfigured = true;
            return false;
        }
    }

    if (isYesConfigured) {
        console.log("Trying Moviment 2 - YES \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 150 && avgx < 250 && ((avgy >= -200 && avgy <= -130) || (avgy >= 130 && avgy <= 200)) && avgz >= -40 && avgz <= 40) {
            isYesConfigured = false;
            isSeccondYesMoviment = true;
            return false;
        }
    }

    return false;
}


function no() {
    console.log("cheking - no");
    if (!isNoConfigured) {
        console.log("Trying Moviment 1 - NO \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 160 && avgx <= 250 && ((avgy >= -200 && avgy <= -100) || (avgy >= 100 && avgy <= 200)) && avgz >= -60 && avgz <= 60) {
            if (isSeccondNoMoviment) {
                isSeccondNoMoviment = false;
                callback();
                return true;
            }
            isNoConfigured = true;
            return false;
        }
    }
    if (isNoConfigured) {
        console.log("Trying Moviment 2 - NO \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 30 && avgx < 150 && ((avgy >= -150 && avgy <= -110) || (avgy >= 100 && avgy <= 150)) && avgz >= -60 && avgz <= 60) {
            isNoConfigured = false;
            isSeccondNoMoviment = true;
            return false;
        }
    }
}



function victory(){
    console.log("cheking - victory");
    if (!isVictoryConfigured) {
        console.log("Trying Moviment 1 - victory \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 120 && avgx <= 250 && ((avgy >= -25 && avgy <= -5) || (avgy >= 5 && avgy <= 25)) && avgz >= -20 && avgz <= 20) {  
            isVictoryConfigured = true;
            return false;
        }
    }
    if (isVictoryConfigured) {
        console.log("Trying Moviment 2 - victory \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 20 && avgx < 100 && ((avgy >= -100 && avgy <= -15) || (avgy >= 15 && avgy <= 100)) && avgz <= -50) {
            isVictoryConfigured = false;
            callback();
            return true;
        }
    }
}

function back(){
    console.log("cheking - back");
    if(!isBackConfigured){    
        console.log("Trying Moviment 1 - back \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 200 && avgx < 300 && ((avgy <= -50 && avgy >= -140) || (avgy >= 50 && avgy <= 140)) && avgz >= -60 && avgz <= 60){
            isBackConfigured = true;
            return false;
        }
    }
    if(isBackConfigured){
        console.log("Trying Moviment 2 - back \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 300 && ((avgy >= -190 && avgy <= -120) || (avgy >= 120 && avgy <= 190)) && avgz <= -60) {  
            isBackConfigured = false;
            callback();
            return true;
        }
    }
}


function left(){
    console.log("cheking - left");
    if(!isLeftConfigured){    
        console.log("Trying Moviment 1 - left \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 115 && avgx < 300 && ((avgy >= -160 && avgy <= -20) || (avgy <= 160 && avgy >= 20)) && avgz >= -60 && avgz <= 60){
            isLeftConfigured = true;
            return false;
        }
    }
    if(isLeftConfigured){
        console.log("Trying Moviment 2 - left \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 50 && avgx <= 120 && ((avgy >= -180 && avgy <= -20) || (avgy >= 20 && avgy <= 180)) && avgz > 75) {  
            isLeftConfigured = false;
            callback();
            return true;
        }
    }
}


function right(){
    console.log("cheking - right");
    if(!isRightConfigured){    
        console.log("Trying Moviment 1 - right \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 115 && avgx < 300 && ((avgy >= -160 && avgy <= -20) || (avgy <= 160 && avgy >= 20)) && avgz >= -60 && avgz <= 60){
            isRightConfigured = true;
            return false;
        }
    }
    if(isRightConfigured){
        console.log("Trying Moviment 2 - right \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 160 && avgx <= 250 && ((avgy >= -180 && avgy <= -20) || (avgy >= 20 && avgy <= 180)) && avgz <= -60) {  
            isRightConfigured = false;
            callback();
            return true;
        }
    }
}

function monitor(){
    console.log("monitor\nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
    return true;
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