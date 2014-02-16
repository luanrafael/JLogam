window.onload = function () {
	if(JLogam.setup()){
		JLogam.on("victory",function(){ alert(1); });
	}
}