`use strict`;
// const variables only
const pscore1 = document.getElementById("player1-dicescore");
const pscore2 = document.getElementById("player2-dicescore");
// current score
const pcurrentscore1 = document.getElementById("player1-currentscore");
const pcurrentscore2 = document.getElementById("player2-currentscore");
//button
const newGame = document.getElementById("newgame");
const rollDice = document.getElementById("roll-dice");
const Hold = document.getElementById("Hold");
const diceImg = document.querySelector(".dice--img");
const dicePic = document.getElementById("dice-img");

// game starting setting
let mainScore = [0, 0, 0]; //main score at the top
let plyrcscore = 0; // it is same for each player resets every time
let currentplayer = 1; // this is the active player
bgnew = 0;
// background color of game area
let bgC = document.querySelector(".game-area");
bgC.setAttribute("style", "Background-Color:#ffffff66");

// function area
//player win function
let playerwin = function () {
    bgnew = document.querySelector(`.game-area__${currentplayer}`);
    bgnew.setAttribute("style", "background-color:black");
    console.log("hello");
    dicePic.src =
        "https://www.seekpng.com/png/small/169-1699685_transparent-well-done-png.png";
    // button is disabled is true
    rollDice.disabled = true;
    Hold.disabled = true;
};
//reset function
let reset = function () {
    mainScore = [0, 0, 0];
    plyrcscore = 0;
    // button is enabled again after resetting
    rollDice.disabled = false;
    Hold.disabled = false;
    //img reset
    diceImg.classList.add("hidden");
    // resetting mainscores
    pscore1.textContent = mainScore[1];
    pscore2.textContent = mainScore[2];
    bgnew.setAttribute("style", "background-color:transparent");
    //switching the current player to 2
    currentplayer = 2;
    playerHold();
};

// rolling function area
let rolling = function () {
    diceImg.classList.remove("hidden");
    // computer picks a dice between 0 - 6
    let gNo = Math.floor(Math.random() * 6) + 1;
    dicePic.src = `https://pig-game-v2.netlify.app/dice-${gNo}.png`;
    // if the dice is 1 skip to other player
    if (gNo === 1) {
        // skipping to other player
        plyrcscore = 0;
        playerHold();
    } else {
        plyrcscore += gNo;
        document.getElementById(`player${currentplayer}-currentscore`).textContent =
            plyrcscore;
    }
};
//playerhold
let playerHold = function () {
    bgC.setAttribute("style", "Background-Color:transparent");
    // player score should be greater than main score
    //if (mainScore[currentplayer]<plyrcscore){
    mainScore[currentplayer] += plyrcscore;
    document.getElementById(`player${currentplayer}-dicescore`).textContent =
        mainScore[currentplayer];
    // if mainscore is > 100 then the player wins
    if (mainScore[currentplayer] > 100) {
        playerwin(); 
    }
    // resets everything
    plyrcscore = 0;
    pcurrentscore1.textContent = plyrcscore;
    pcurrentscore2.textContent = plyrcscore;
    currentplayer = currentplayer === 1 ? 2 : 1;
    bgC = document.querySelector(`.game-area__${currentplayer}`);
    bgC.setAttribute("style", "Background-Color:#ffffff66");
};

//events area on every click
//roll dice event
rollDice.addEventListener("click", rolling);
// hold button event
Hold.addEventListener("click", playerHold);
//new game  eventlistener
newGame.addEventListener("click", reset);
