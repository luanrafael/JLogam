
window.onload = function (){
	if(JLogam.setup()){
		azul();
	}
	JLogam.on(
        "cheers",
		function (){twitte();});
};

function cliSimulate(){
	var command = document.getElementById("clitext").value;
	if(command == "#JLogam"){
        window.location.assign("https://twitter.com/intent/tweet?hashtags=JLogam%2C&original_referer=http%3A%2F%2Flocalhost%3A8080%2FJLogam%2Fdemo%2Fcheers.html&related=lrpinheiroo&text=JLogam%20-%20JavaScript%20Library%20for%20Open%20Gestures%20Acessibility%20Mobile&tw_p=tweetbutton");
	} else {
		alert("Invalid Command, please insert the command '#JLogam'");
	}
	return false;
}



function twitte(){
    console.log("TIM... TIM...");
    document.getElementById("bolinha").style.background = 'blue';
    window.location.assign("https://twitter.com/intent/tweet?hashtags=JLogam%2C&original_referer=http%3A%2F%2Flocalhost%3A8080%2FJLogam%2Fdemo%2Fcheers.html&related=lrpinheiroo&text=JLogam%20-%20JavaScript%20Library%20for%20Open%20Gestures%20Acessibility%20Mobile&tw_p=tweetbutton");
	return false;
}