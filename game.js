var ants = 0;
var queenAnts = 0;
var colonies = [];
var money = 0;
var buyColoniesASAP = false;
var colonyBuyerUnlocked = false;
var buyMultiplier = 1;
var stealMoneyUnlocked = false;

function Colony() {
    "use strict";
    this.ticksLeft = 60;
}

function updateHTML() {
    "use strict";
    document.getElementById("antCount").textContent = "Ants: " + ants;
    document.getElementById("queenAntCount").textContent = "Queen Ants: " + queenAnts;
    document.getElementById("colonyCount").textContent = "Colonies: " + colonies.length;
    document.getElementById("moneyCount").textContent = "Money: " + money + " dollars";
}

function buyQueenAnt(multiplier) {
    "use strict";
    if (ants >= 50 * multiplier) {
        ants -= 50 * multiplier;
        queenAnts += multiplier;
        document.getElementById("queenAntCount").style.visibility = "visible";
        updateHTML();
    }
}

function startColony(multiplier) {
    "use strict";
    var i;
    if (queenAnts >= multiplier) {
        queenAnts -= multiplier;
        for (i = 0; i < multiplier; i += 1) {
            colonies.push(new Colony());
        }
        document.getElementById("colonyCount").style.visibility = "visible";
        updateHTML();
    }
}

setInterval(function () {
    "use strict";
    var i,
        buyMultVal = parseInt(document.getElementById("buyMult").value, 10);
    
    //create ants from colonies
    for (i = 0; i < colonies.length; i += 1) {
        ants += 1;
        colonies[i].ticksLeft -= 1;
        if (colonies[i].ticksLeft === 0) {
            colonies.splice(i, 1);
        }
    }
    
    //buy a colony if possible
    if (buyColoniesASAP) {
        if (document.getElementById("buyColoniesASAPToggle").checked) {
            buyQueenAnt(1);
            startColony(1);
        }
    }
    
    //make appropriate fields visible
    if (ants >= 50) {
        document.getElementById("getQueen").style.visibility = "visible";
        document.getElementById("buyMultLabel").style.visibility = "visible";
    }
    if (queenAnts >= 1) {
        document.getElementById("startCol").style.visibility = "visible";
    }
    if (ants >= 150 && !colonyBuyerUnlocked) {
        document.getElementById("buyColonyBuyer").style.visibility = "visible";
        colonyBuyerUnlocked = true;
    }
    if (ants >= 1000 && !stealMoneyUnlocked) {
        document.getElementById("buyStealingMoney").style.visibility = "visible";
    }
    
    //set buy multiplier
    if (buyMultVal > 0) {
        buyMultiplier = buyMultVal;
    }
    
    updateHTML();
}, 500);

function incrementAnts() {
    "use strict";
    ants += 1;
    document.getElementById("antCount").style.visibility = "visible";
    updateHTML();
}

function buyColonyBuyer() {
    "use strict";
    if (ants >= 150) {
        buyColoniesASAP = true;
        ants -= 150;
        document.getElementById("buyColonyBuyer").style.visibility = "hidden";
        document.getElementById("buyColASAPToggleLabel").style.visibility = "visible";
    }
}

function buyStealMoney() {
    "use strict";
    if (ants >= 1000) {
        ants -= 1000;
        stealMoneyUnlocked = true;
        document.getElementById("stealMoneyButton").style.visibility = "visible";
        document.getElementById("buyStealingMoney").style.visibility = "hidden";
    }
}

function stealMoney() {
    "use strict";
    money += 1;
    document.getElementById("moneyCount").style.visibility = "visible";
    updateHTML();
}