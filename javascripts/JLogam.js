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

//Motion variables.
var listacx = [];
var listacy = [];
var listacz = [];
var k = 0;

function isSupported() {
    
    if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
 
        window.addEventListener('deviceorientation', gestureListener, false);
        window.addEventListener('devicemotion', motionListener, false);


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

function motionListener(event){

    var acx = (event.acceleration.x * 100);
    var acy = (event.acceleration.y * 100);
    var acz = (event.acceleration.z * 100);


    if(k == 10){
        // listacx = [];
        // listacy = [];
        // listacz = [];
        k = 0;
    }

    listacx[k] = acx;
    listacy[k] = acy;
    listacz[k] = acz;

    ++k;

}



function getAxys(axys){
    axys = axys.toLowerCase();
    if(listacx.avg() > listacy.avg() && listacx.avg() > listacz.avg() && axys == 'x'){
        console.log("X");
        return true;
    }

    if(listacy.avg() > listacx.avg() && listacy.avg() > listacz.avg() && axys == 'y'){
        console.log("Y");
        return true;
    }

    if(listacz.avg() > listacx.avg() && listacz.avg() > listacy.avg() && axys == 'z'){
        console.log("X");
        return true;
    }

    return false;
}


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

    if (cont >= 10) {
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
    if (avgy >= -15 && avgy <= 15 && avgz >= -60 && avgz <= 60) {
        isCheersConfigured = true;
        bb.style.background = "green";
        return false;
    }
}

if (isCheersConfigured) {
    console.log("Moviment 2 \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
    if ((avgy >= -130  && avgy <= -70 ) || (avgy >= 70 && avgy <= 130) && avgz >= -20 &&  avgz <= 20) {
        isCheersConfigured = false;
        callback();
        return true;
    }
}
return false;

}


function yes() {
    console.log("cheking - YES");
    // return monitor();
    // Moviment 1
    if (!isYesConfigured) {
        console.log("Trying Moviment 1 - YES \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (getAxys('x') && ((avgx >= 60 && avgx <= 150) || (avgx >= 250 && avgx <= 350)) && ((avgy <= -50 && avgy >= -130) || (avgy >= 50 && avgy <= 130)) && avgz >= -20 && avgz <= 20) {
            isNoConfigured = false;
            isSeccondNoMoviment = false;
            if (isSeccondYesMoviment) {
                isSeccondYesMoviment = false;
                azul();
                callback();
                return true;
            }

            amarelo();
            isYesConfigured = true;
            return false;
        }
    }

    // Moviment 2
    if (isYesConfigured) {
        console.log("Trying Moviment 2 - YES \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if  (getAxys('x') && ((avgx >= 150 && avgx <= 350) || (avgx >= 15 && avgx <= 80)) && ((avgy >= -200 && avgy <= -90) || (avgy >= 90 && avgy <= 200)) && avgz >= -10 && avgz <= 10) {
            console.log("####### - YES \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
            isYesConfigured = false;
            isSeccondYesMoviment = true;
            vibrar();
            verde();
            return false;
        }   
    }
}


function no() {
    console.log("cheking - no");
    // return monitor();
    if (!isNoConfigured) {
        console.log("Trying Moviment 1 - NO \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if(avgz > 10)
        if (avgx >= 280 && avgx <= 360 && ((avgy >= -140 && avgy <= -30) || (avgy >= 30 && avgy <= 140))) {
            console.log("############## 1 - NO \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
            isYesConfigured = false;
            isSeccondYesMoviment = false;
            if (isSeccondNoMoviment) {
                isSeccondNoMoviment = false;
                azul();
                callback();
                return true;
            }
            amarelo();
            isNoConfigured = true;
            return false;
        }
    }
    if (isNoConfigured) {
        console.log("Trying Moviment 2 - NO \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (getAxys('y') &&  avgx >= 60 && avgx < 190 && ((avgy >= -160 && avgy <= -80) || (avgy >= 80 && avgy <= 160))) {
            console.log("############## 2 - NO \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
            isNoConfigured = false;
            isSeccondNoMoviment = true;
            verde();
            return false;
        }
    }
}



function victory() {

    console.log("cheking - victory");
    if (!isVictoryConfigured) {
        console.log("Trying Moviment 1 - victory \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 120 && avgx <= 250 && ((avgy >= -25 && avgy <= -5) || (avgy >= 5 && avgy <= 25)) && avgz >= -20 && avgz <= 20) {
            isVictoryConfigured = true;
            verde();
            return false;
        }
    }
    if (isVictoryConfigured) {
        console.log("Trying Moviment 2 - victory \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 20 && avgx < 100 && ((avgy >= -100 && avgy <= -15) || (avgy >= 15 && avgy <= 100)) && avgz <= -50) {
            isVictoryConfigured = false;
            azul();
            callback();
            return true;
        }
    }
}

function front() {
    console.log("cheking - front");
    if (!isFrontConfigured) {
        console.log("Trying Moviment 1 - front \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 200 && avgx < 300 && ((avgy <= -50 && avgy >= -140) || (avgy >= 50 && avgy <= 140)) && avgz >= -60 && avgz <= 60) {
            isFrontConfigured = true;
            verde();
            return false;
        }
    }
    if (isFrontConfigured) {
        console.log("Trying Moviment 2 - front \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 130 && avgx <= 200 && ((avgy >= -190 && avgy <= -120) || (avgy >= 120 && avgy <= 190)) && avgz >= 60) {
            isFrontConfigured = false;
            vibrar();
            callback();
            return true;
        }
    }
}

function back() {
    console.log("cheking - back");
    // return monitor();
    if (!isBackConfigured) {
        console.log("Trying Moviment 1 - back \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 200 && avgx < 300 && ((avgy <= -50 && avgy >= -140) || (avgy >= 50 && avgy <= 140)) && avgz >= -60 && avgz <= 60) {
            isBackConfigured = true;
            verde();
            return false;
        }
    }
    if (isBackConfigured) {
        console.log("Trying Moviment 2 - back \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 300 && ((avgy >= -190 && avgy <= -120) || (avgy >= 120 && avgy <= 190)) && avgz <= -60) {
            isBackConfigured = false;
            vibrar();
            callback();
            return true;
        }
    }
}


function left() {
    console.log("cheking - left");
    // return monitor();
    if (!isLeftConfigured) {
        console.log("Trying Moviment 1 - left \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 115 && avgx < 300 && ((avgy >= -160 && avgy <= -20) || (avgy <= 160 && avgy >= 20)) && avgz >= -60 && avgz <= 60) {
            isLeftConfigured = true;
            verde();
            return false;
        }
    }
    if (isLeftConfigured) {
        console.log("Trying Moviment 2 - left \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 50 && avgx <= 120 && ((avgy >= -180 && avgy <= -20) || (avgy >= 20 && avgy <= 180)) && avgz > 75) {
            isLeftConfigured = false;
            vibrar();
            callback();
            return true;
        }
    }
}


function right() {
    console.log("cheking - right");
    // return monitor();
    if (!isRightConfigured) {
        console.log("Trying Moviment 1 - right \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx > 115 && avgx < 300 && ((avgy >= -160 && avgy <= -20) || (avgy <= 160 && avgy >= 20)) && avgz >= -60 && avgz <= 60) {
            isRightConfigured = true;
            return false;
        }
    }
    if (isRightConfigured) {
        console.log("Trying Moviment 2 - right \nX: " + avgx + "\nY: " + avgy + "\nZ: " + avgz + "\n=============================\n");
        if (avgx >= 160 && avgx <= 250 && ((avgy >= -180 && avgy <= -20) || (avgy >= 20 && avgy <= 180)) && avgz <= -60) {
            isRightConfigured = false;
            vibrar();
            callback();
            return true;
        }
    }
}

function monitor() {
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



function azul() {
    document.getElementById("bolinha").style.background = 'blue';
    return true;
}

function verde() {
    document.getElementById("bolinha").style.background = 'green';
    return true;
}

function amarelo() {
    document.getElementById("bolinha").style.background = 'yellow';
    return true;
}


function vibrar() {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
        navigator.vibrate(300);
        return true;
    }
    return false;
}