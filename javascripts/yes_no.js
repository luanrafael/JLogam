window.onload = function () {
    document.querySelector('#cards').addEventListener('click', function (e) {
        if (e.target.id == "cards") {
            return false;
        }
        if (document.getElementById("card_selecionado") !== null) {
            document.getElementById("card_selecionado").style.background = 'white';
            document.getElementById("card_selecionado").setAttribute("id", this.getAttribute("data-pos"));
        }
        e.target.setAttribute("id", "card_selecionado");
        document.getElementById("card_selecionado").style.background = 'lightblue';
    });

    if (JLogam.setup()) {
        document.getElementById("bolinha").style.background = 'blue';
        JLogam.on("yes", function () {
            openCard();
        });
        JLogam.on("no", function () {
            discartCard();
        });
    }
};


function openCard() {
    var card = document.getElementById("card_selecionado");
    if (card !== null) {
        var arg = card.getAttribute("data-selected");
        switch (arg) {
            case "CLI":
                alert("CLI - COMMAND LINE INTERFACE");
                break;

            case "GUI":
                alert("GUI - GRAPHICAL USER INTERFACE");
                break;

            case "NUI":
                alert("NUI - NATURAL USER INTERFACE");
                break;
        }
        return true;
    }
    alert("Select one card!");
    return false;
}


function discartCard() {
    var card = document.getElementById("card_selecionado");
    if (card !== null) {
        document.getElementById("cards").removeChild(card);
        vibrar();
        alert("Card discarded");
        return true;
    }
    alert("Select one card!");
    return false;
}