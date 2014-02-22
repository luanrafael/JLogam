window.onload = function () {
    if (JLogam.setup()) {
        azul();
        JLogam.on("front", function () {
            setDirection("front");
        });
        JLogam.on("back", function () {
            setDirection("back");
        });
        JLogam.on("left", function () {
            setDirection("left");
        });
        JLogam.on("right", function () {
            setDirection("right");
        });
    }
};



function setDirection(direction) {
    document.getElementById("imgdirection").setAttribute("src", "../images/" + direction + '.png');
    return true;
}