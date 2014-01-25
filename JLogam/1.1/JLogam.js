var alpha = 0;
var beta = 0;
var gamma = 0;

var listx = [];
var listy = [];
var listz = [];

var gestures = [];

var listgestures = [];

var cont = 0;
var callback;
var isCheersConfigured;
var isYesConfigured;
var isNoConfigured;
var isSeccondYesMoviment;
var isSeccondNoMoviment;


function isSupported(){
    if (window.DeviceOrientationEvent){
        window.addEventListener('deviceorientation', gestureListener, false);
        return true;
    }
    return false;
}


JLogam = {

    'setup' : function (){
        listgestures[0] = "cheers";
        listgestures[1] = "yes";
        listgestures[2] = "no";
        isCheersConfigured = false;
        isYesConfigured = false;
        isNoConfigured = false;
        isSeccondYesMoviment = false;
        isSeccondNoMoviment = false;
        return isSupported();
    },

    'on' : function(arggesture,argcallback){
        gestures[arggesture] = argcallback;
    },

    'off' : function (arggesture){
        gestures[arggesture] = '';  
    }

};

function gestureListener(event){
    var x = event.alpha;
    var y = event.beta;
    var z = event.gamma;

    if(x === null && y === null && z === null){
        alert("JLogam is not supported");
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


function checkMoviment(){
    avgx = listx.avg();
    avgy = listy.avg();
    avgz = listz.avg();
    listx = [];
    listy = [];
    listz = [];
    cont = 0;
    console.log("Moviment - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
    for (var i = listgestures.length - 1; i >= 0; i--) {
        var argexec = listgestures[i];
        callback = gestures[argexec];
        if(callback !== undefined){
            window[argexec].call();
        }       
    }
}


function cheers () {
        console.log("cheking - cheers")
        if(!isCheersConfigured){        
            console.log("Moviment 1 - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
            if (avgx > 115 && avgx < 300 && avgy >= -15 && avgy <= 15 && avgz >= -60 && avgz <= 60) {
                isCheersConfigured = true;
                return false;
            }
        }
        
        if(isCheersConfigured){
            console.log("Moviment 2 - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
            if (avgx > 115 && avgx < 300 && ((avgy >= -160 && avgy <= -20) || (avgy <= 160 && avgy >= 20)) && avgz >= -60 && avgz <= 60) {
                isCheersConfigured = false;
                callback();
                return true;
            }
        }
        return false;

};


function yes(){
    console.log("cheking - YES");
    // Moviment 1
    if(!isYesConfigured){
        console.log("Trying Moviment 1 - YES - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
        if (avgx > 100 && avgx < 170 && ((avgy >= -70 && avgy <= -20) || (avgy <= 70 && avgy >= 20)) && avgz >= -20 && avgz <= 20) {
            isYesConfigured = true;
            return false;
        }
    }

    // Moviment 2
    if(isYesConfigured){
        console.log("Trying Moviment 2 - YES - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
        if (avgx > 170 && avgx < 340 && ((avgy >= -170 && avgy <= -80) || (avgy <= 170 && avgy >= 80)) && avgz >= -20 && avgz <= 20) {
            if(!isSeccondYesMoviment){
                isSeccondYesMoviment = true;
                isYesConfigured = false;
            } else {
                isSeccondYesMoviment = false;
                callback();
                return true;
            }
            return false;
        }
    }
    return true;
}


function no(){
    console.log("cheking - no");
    if(!isNoConfigured){
        console.log("Trying Moviment 1 - NO - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
        if ( avgx < 140 && avgy >= -50 && avgz >= -60 && avgz <= 60) {
                isNoConfigured = true;
                return false;
        }
    }
    if(isNoConfigured){
        console.log("Trying Moviment 2 - NO - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
        if (avgx > 180 && avgy >= -50 && avgz >= -60 && avgz <= 60) {
                if(!isSeccondNoMoviment){
                    isSeccondNoMoviment = true;
                    isNoConfigured = false;
                } else {
                    isSeccondNoMoviment = false;
                    callback();
                    return true;
                }
                return false;
        }
    }
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