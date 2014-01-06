window.onload = function(){
		shortcut.add("Enter",function() {
		if(document.activeElement == document.getElementById("clitext")){
			cliSimulate();
		}
	});

};

function cliSimulate(){
	var command = document.getElementById("clitext").value;
	if(command == "#JLogam"){
        window.location.assign("https://twitter.com/intent/tweet?hashtags=JLogam%2C&original_referer=http%3A%2F%2Flocalhost%3A8080%2FJLogam%2Fdemo%2Fcheers.html&related=lrpinheiroo&text=JLogam%20-%20JavaScript%20Libary%20for%20Open%20Gestures%20Acessibility%20Mobile&tw_p=tweetbutton");
	} else {
		alert("Invalid Command, please insert the command '#JLogam'")
	}
	return false;
}