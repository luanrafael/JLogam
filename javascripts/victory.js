window.onload = function () {
	if(JLogam.setup()){
		document.getElementById("bolinha").style.background = 'blue';
		JLogam.on("victory",function(){ win(); });
	}
}


function win(){
	vibrar();
	alert("VICTORY GESTURE");
}


function vibrar(){
	navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
	if(navigator.vibrate){
		navigator.vibrate([500, 300, 100]);
		return true;
	}
	return false;
}