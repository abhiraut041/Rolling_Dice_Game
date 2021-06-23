"use strict";

const curr_scr_ele = [
  document.getElementById("player1-current-score"),
  document.getElementById("player2-current-score"),
];
const total_scr_ele = [
  document.getElementById("player1-score"),
  document.getElementById("player2-score"),
];
const player_bg_ele = [
  document.querySelector(".player1"),
  document.querySelector(".player2"),
];
const player_name_ele = [
  document.getElementById("player1-name"),
  document.getElementById("player2-name"),
];

const btn_new_game = document.querySelector(".btn-new-game");
const btn_roll_dice = document.querySelector(".btn-roll-dice");
const btn_hold_score = document.querySelector(".btn-hold-score");
const dice_element = document.getElementById("dice-img");

// Global variables
const winningScore = 50;
let activePlayer = 0;
let playing = true;
// Scores
const total_scr = [0, 0];
const curr_scr = [0, 0];

const switch_player_backgrounds = function () {
  // Switch player background based on active player
  player_bg_ele[activePlayer].classList.add("active-player");
  player_bg_ele[activePlayer === 0 ? 1 : 0].classList.remove("active-player");
  // Make active player name as bold
  player_name_ele[activePlayer].style.fontWeight = "bold";
  player_name_ele[activePlayer === 0 ? 1 : 0].style.fontWeight = "300";
};

// init function
const init = function () {
  // 1. Set the playing status
  playing = true;
  // 2. Reset the Scores
  curr_scr[0] = 0;
  curr_scr[1] = 0;
  total_scr[0] = 0;
  total_scr[1] = 0;
  // 3. Display the reset scores
  curr_scr_ele[0].textContent = curr_scr[0];
  curr_scr_ele[1].textContent = curr_scr[1];
  total_scr_ele[0].textContent = total_scr[0];
  total_scr_ele[1].textContent = total_scr[1];
  // 4. Remove the winning background if present
  if (player_bg_ele[activePlayer].classList.contains("player-winner")) {
    player_bg_ele[activePlayer].classList.remove("player-winner");
    player_name_ele[activePlayer].style.fontWeight = "300";
    player_name_ele[activePlayer].style.color = "black";
  }
  // 5. Set player-1 as active player
  activePlayer = 0;
  // 6. Set the Backgrounds
  switch_player_backgrounds();
  // 7. Hide the Dice
  dice_element.classList.add("hidden");
};

// Calling the init function to initialize the Game
init();

// Roll Dice Button
btn_roll_dice.addEventListener("click", function () {
  if (playing) {
    // 1.Generate Random Dice Number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.Display the Dice
    if (dice_element.classList.contains("hidden"))
      dice_element.classList.remove("hidden");
    dice_element.src = `/img/dice-${dice}.png`;
    dice_element.classList.toggle("dice-shake");

    // 3.Check if it is 1; if true pass control to another player
    if (dice !== 1) {
      curr_scr[activePlayer] += dice;
      curr_scr_ele[activePlayer].textContent = curr_scr[activePlayer];
    } else {
      // Dice is 1 => Transfer control to other player
      // Setting curr scr of the prev player to 0
      curr_scr[activePlayer] = 0;
      curr_scr_ele[activePlayer].textContent = curr_scr[activePlayer];
      // Changing the Active Player
      activePlayer = activePlayer === 0 ? 1 : 0;
      // Changing the bg of Prev. Player
      switch_player_backgrounds();
    }
  }
});

// Hold Score Button
btn_hold_score.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to total score
    total_scr[activePlayer] += curr_scr[activePlayer];
    total_scr_ele[activePlayer].textContent = total_scr[activePlayer];

    // 2. Set Current Score to 0 for active player
    curr_scr[activePlayer] = 0;
    curr_scr_ele[activePlayer].textContent = curr_scr[activePlayer];

    // 3. Check if the active player won
    if (total_scr[activePlayer] >= winningScore) {
      // Modify playing status
      playing = false;
      // Change Background for the winning player
      player_bg_ele[activePlayer].classList.toggle("active-player");
      player_bg_ele[activePlayer].classList.add("player-winner");

      // change the winning player name text color
      player_name_ele[activePlayer].style.color = "#ddd";
      player_name_ele[activePlayer].style.fontWeight = "bold";

      // Hiding the Dice
      dice_element.classList.toggle("hidden");
    } else {
      // 4. Switch the active player
      activePlayer = activePlayer === 0 ? 1 : 0;

      // 5. Switch the backgrounds
      switch_player_backgrounds();
    }
  }
});

// Reset Button : New Game
btn_new_game.addEventListener("click", init);
