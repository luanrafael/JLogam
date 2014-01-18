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


function JLogamSetup(){
    listgestures[0] = "cheers";
    isCheersConfigured = false;
    return isSupported();
}


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
        isCheersConfigured = false;
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
    for (var i = listgestures.length - 1; i >= 0; i--) {
        var argexec = listgestures[i];
        callback = gestures[argexec];
        if(callback != ''){
            window[argexec].call();
        }       
    }
}


function cheers () {
        if(!isCheersConfigured){        
            console.log("Moviment 1 - X: " + avgx + " Y: " + avgy + " Z: " + avgz);
            if (avgx > 115 && avgx < 300 && avgy >= -15 && avgy <= 15 && avgz >= -60 && avgz <= 60) {
                isCheersConfigured = true;
                bb.style.background = "green";
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