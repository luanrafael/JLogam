var alpha = 0;
var beta = 0;
var gamma = 0;

var listx = [];
var listy = [];
var listz = [];

var gestures = [];

gestures["cheers"] = ""; 

var cont = 0;
var cheers = false;
var argNavAppName = 1;
var supportsVibrate = "vibrate" in navigator;
var ball = document.getElementById("bolinha");
var callback;

JLogam = {
    'set' : function(gesture,argccallback){
        gestures[gesture] = argccallback; 
        callback = argccallback;
        console.log("started");

        if (window.DeviceOrientationEvent){
            window.addEventListener('deviceorientation', devOrientHandler, false);
        }  else {
            alert("JLogam is not supported");
        }

        shortcut.add("Enter",function() {
            if(document.activeElement == document.getElementById("clitext")){
                cliSimulate();
            }
        });
    }

};


    //Accelerometer Listener
    function devOrientHandler(event) {
        var x = event.alpha;
        var y = event.beta;
        var z = event.gamma;
        ball = document.getElementById("bolinha");
        if(x !== null && y !== null && z !== null){
            if(cheers === false){
                ball.style.background = 'blue';
            }
        } else {
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
     
        if (avgx > 170 && avgx < 300 && ((avgy >= -160 && avgy <= -20) || (avgy <= 160 && avgy >= 20)) && avgz >= -60 && avgz <= 60) {
            callback();
            cheers = false;
            console.log("Final Moviment - ", avgx, avgy, avgz);
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
