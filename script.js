const map = document.getElementById("map");
const player1 = document.getElementById("player1");
const bot = document.getElementById("bot");
const menu = document.getElementById("menu");
const game = document.getElementById("game");

let player1Pos = { x: 40, y: 10 }; // Player 1 position
let botPos = { x: 60, y: 10 }; // Bot position
let botDifficulty = "easy"; // Default difficulty

// Start the game with selected difficulty
function startGame(difficulty) {
  botDifficulty = difficulty;
  menu.classList.add("hidden");
  game.classList.remove("hidden");
  initializeGame();
}

// Initialize game state
function initializeGame() {
  createMap();
  botAI(); // Start bot behavior
}

// Generate the map with blocks
function createMap() {
  map.innerHTML = ""; // Clear existing blocks
  for (let i = 0; i < 200; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.addEventListener("click", () => {
      block.style.backgroundColor = "transparent"; // Player removes block
    });
    map.appendChild(block);
  }
}

// Update player positions
function updatePositions() {
  player1.style.left = `${player1Pos.x}%`;
  player1.style.top = `${player1Pos.y}%`;

  bot.style.left = `${botPos.x}%`;
  bot.style.top = `${botPos.y}%`;
}

// Player movement
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w": player1Pos.y = Math.max(0, player1Pos.y - 2); break;
    case "a": player1Pos.x = Math.max(0, player1Pos.x - 2); break;
    case "s": player1Pos.y = Math.min(80, player1Pos.y + 2); break;
    case "d": player1Pos.x = Math.min(100, player1Pos.x + 2); break;
  }
  updatePositions();
});

// Bot AI Logic
function botAI() {
  setInterval(() => {
    if (botDifficulty === "easy") {
      easyBotBehavior();
    } else if (botDifficulty === "medium") {
      mediumBotBehavior();
    } else if (botDifficulty === "hard") {
      hardBotBehavior();
    }
    updatePositions();
  }, 500); // Bot updates every 500ms
}

// Easy Bot: Random movement
function easyBotBehavior() {
  botPos.x += Math.random() > 0.5 ? 2 : -2;
  botPos.y += Math.random() > 0.5 ? 2 : -2;
  botPos.x = Math.max(0, Math.min(100, botPos.x));
  botPos.y = Math.max(0, Math.min(80, botPos.y));
}

// Medium Bot: Tracks player
function mediumBotBehavior() {
  if (player1Pos.x > botPos.x) botPos.x += 2;
  if (player1Pos.x < botPos.x) botPos.x -= 2;
  if (player1Pos.y > botPos.y) botPos.y += 2;
  if (player1Pos.y < botPos.y) botPos.y -= 2;
}

// Hard Bot: Strategic movement
function hardBotBehavior() {
  mediumBotBehavior(); // Follow player

  // Break blocks strategically
  const blocks = document.querySelectorAll(".block");
  blocks.forEach((block) => {
    const blockRect = block.getBoundingClientRect();
    const botRect = bot.getBoundingClientRect();
    if (
      blockRect.top > botRect.top &&
      blockRect.bottom < botRect.bottom &&
      blockRect.left > botRect.left &&
      blockRect.right < botRect.right
    ) {
      block.style.backgroundColor = "transparent"; // Break block
    }
  });
}
