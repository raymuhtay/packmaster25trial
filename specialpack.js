// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 10000; // Load coins from local storage or start with 10,000
const packCost92 = 0; // Cost to open a 92+ pack
let selectedPlayers92 = []; // Array to hold currently selected players

// Local storage keys
const INVENTORY_KEY = "inventory"; // Shared key for local storage inventory

// Load inventory from local storage
function loadInventory() {
  const savedInventory = localStorage.getItem(INVENTORY_KEY);
  return savedInventory ? JSON.parse(savedInventory) : [];
}

// Save inventory to local storage
function saveInventory() {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
}

// Initialize inventory from local storage
let inventory = loadInventory();

const quickSellValues92Pack = {
  blaise_matuidi: 1200, // Quick sell value for Blaise Matuidi
  celia_sassic: 1400, // Quick sell value for Celia Šašić
  eden_hazard: 1500, // Quick sell value for Eden Hazard
  fara_williams: 1300, // Quick sell value for Fara Williams
  guti: 1400, // Quick sell value for Guti
  jaap_stam: 1300, // Quick sell value for Jaap Stam
  jamie_carragher: 1300, // Quick sell value for Jamie Carragher
  laura_georges: 1300, // Quick sell value for Laura Georges
  maicon: 1400, // Quick sell value for Maicon
  marek_hamsik: 1300, // Quick sell value for Marek Hamšík
  mohammed_noor: 1200, // Quick sell value for Mohammed Noor
  tim_howard: 1200, // Quick sell value for Tim Howard
  ze_roberto: 1300, // Quick sell value for Zé Roberto
  abedi: 1200,
  beasley: 900,
  berbatov: 1500,
  bompastor: 800,
  brolin: 1400,
  cahill: 1000,
  campos: 700,
  capdevilla: 1300,
  carragher: 1100,
  carvalho: 1200,
  cole: 1000,
  cordoba: 950,
  crouch: 1050,
  dempsey: 1150,
  di_natale: 1600,
  donovan: 1000,
  dudek: 850,
  forlan: 1700,
  francescoli: 1550,
  futre: 1400,
  georges: 800,
  ginola: 1750,
  giuly: 900,
  gomez: 950,
  govou: 850,
  hazard: 1600,
  jaber: 750,
  kanu: 1100,
  keane: 1150,
  kewell: 950,
  king: 1050,
  kohler: 1300,
  kompany: 1200,
  kuyt: 1000,
  litmanen: 900,
  lizarazu: 1400,
  lucio: 1500,
  marchisio: 1600,
  marquez: 1300,
  mascherano: 1200,
  milito: 1100,
  morientes: 1450,
  mostovoi: 850,
  nakata: 1000,
  okocha: 1250,
  owairan: 1350,
  papin: 1400,
  ramires: 900,
  ricken: 950,
  rosicky: 1000,
  rui: 1100,
  scott: 800,
  smolarek: 1050,
  sneijder: 1550,
  solsjkaer: 1200,
  tevez: 1500,
  toure: 1300,
  vialli: 1600,
  voller: 1500,
  "totw-vini": 5000,
};

// Update coin balance display
function updateCoinBalance() {
  document.querySelectorAll(".coinBalance").forEach((element) => {
    element.textContent = `Coins: ${coins}`;
  });
  localStorage.setItem("coins", coins); // Save coins to local storage
}

// Utility function to shuffle array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Display a player in the UI
function displayPlayer(player, containerId) {
  const playerDiv = document.getElementById(containerId);

  if (!playerDiv) {
    console.error("Container element not found:", containerId);
    return;
  }

  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const originalElement = document.getElementById(player.id);
  if (originalElement) {
    const playerImage = originalElement.cloneNode(true);
    playerImage.style.display = "block";
    playerImage.setAttribute("data-id", player.id);

    const quickSellButton = document.createElement("button");
    quickSellButton.textContent = "Quick Sell";
    quickSellButton.className = "quick-sell-button";
    quickSellButton.addEventListener("click", () => quickSellPlayer(player));

    playerCard.appendChild(playerImage);
    playerCard.appendChild(quickSellButton);

    // Check if the player is a duplicate and add the duplicate overlay
    if (inventory.find((p) => p.id === player.id)) {
      // Add duplicate badge and reduce opacity for the player card
      const duplicateOverlay = document.createElement("div");
      duplicateOverlay.className = "duplicate-overlay";
      duplicateOverlay.textContent = "DUPLICATE";

      playerCard.appendChild(duplicateOverlay);
      playerCard.classList.add("duplicate-opacity"); // Reduce opacity for duplicate player card
    }

    playerDiv.appendChild(playerCard);
    playerCard.classList.add("fade-in-bottom");
  } else {
    console.error("Original player element not found:", player.id);
  }
}

// Function to open the 92+ pack
function open92Pack() {
  if (coins < packCost92) {
    alert("Not enough coins to open a Special pack!");
    return;
  }

  coins -= packCost92;
  updateCoinBalance();

  document.getElementById("open92PackButton").style.display = "none";
  document.getElementById("currentPlayer").innerHTML = "";
  document.getElementById("inventoryButton").style.display = "none";

  selectedPlayers92 = shuffleArray(Object.keys(quickSellValues92Pack)).slice(
    0,
    3
  );
  selectedPlayers92.sort(
    (a, b) => (quickSellValues92Pack[b] || 0) - (quickSellValues92Pack[a] || 0)
  );

  const firstPlayer = selectedPlayers92[0];
  displayPlayer({ id: firstPlayer }, "currentPlayer");

  document.getElementById("continueButton").style.display = "block";
  document.getElementById("sendToInventoryButton").style.display = "none";
}

// Function to display all players at once when "Continue" is clicked
function showAllPlayers() {
  const currentPlayerDiv = document.getElementById("currentPlayer");
  currentPlayerDiv.innerHTML = ""; // Clear previous players

  selectedPlayers92.forEach((playerId) => {
    displayPlayer({ id: playerId }, "currentPlayer"); // Display all selected players
  });

  document.getElementById("continueButton").style.display = "none";
  document.getElementById("sendToInventoryButton").style.display = "block"; // Show main Send to Inventory button
}

// Quick sell a player
function quickSellPlayer(player) {
  const sellValue = quickSellValues92Pack[player.id] || 0;
  coins += sellValue;
  updateCoinBalance();

  selectedPlayers92 = selectedPlayers92.filter((p) => p !== player.id);
  inventory = inventory.filter((p) => p.id !== player.id);
  saveInventory();

  const playerCard = document.querySelector(
    `#currentPlayer .player-card img[data-id='${player.id}']`
  )?.parentElement;
  if (playerCard) {
    playerCard.remove();
  }

  // Hide Send to Inventory button and show Open Pack button if all players are quick sold
  if (selectedPlayers92.length === 0) {
    document.getElementById("sendToInventoryButton").style.display = "none";
    document.getElementById("open92PackButton").style.display = "block"; // Show Open Pack button
  }
}

// Function to send selected players to inventory
function sendToInventory() {
  const warningDiv = document.getElementById("duplicateWarning");
  let duplicatesFound = false;

  // Iterate through the selected players
  selectedPlayers92.forEach((playerId) => {
    const player = { id: playerId };

    // Check if the player is already in the inventory
    if (!inventory.some((p) => p.id === player.id)) {
      inventory.push(player); // Add player to inventory if not already there
    } else {
      duplicatesFound = true; // Duplicate found
    }

    // Remove the player card from the current display
    const playerCard = document.querySelector(
      `#currentPlayer .player-card img[data-id='${player.id}']`
    )?.parentElement;
    if (playerCard) {
      playerCard.remove();
    }
  });

  if (duplicatesFound) {
    if (!warningDiv) {
      const newWarning = document.createElement("div");
      newWarning.id = "duplicateWarning";
      newWarning.className = "warning";
      newWarning.textContent =
        "Duplicate players won’t be added to the inventory.";
      document.getElementById("currentPlayer").appendChild(newWarning);
    } else {
      warningDiv.style.display = "block";
    }
  } else if (warningDiv) {
    warningDiv.style.display = "none"; // Hide warning if no duplicates
  }

  saveInventory(); // Save to local storage
  selectedPlayers92 = []; // Clear selected players
  document.getElementById("inventoryButton").style.display = "block"; // Show the Inventory button
  document.getElementById("sendToInventoryButton").style.display = "none"; // Hide the Send to Inventory button
  document.getElementById("open92PackButton").style.display = "block"; // Ensure the Open Pack button is visible
}

// Event Listeners
document
  .getElementById("open92PackButton")
  .addEventListener("click", open92Pack);
document
  .getElementById("continueButton")
  .addEventListener("click", showAllPlayers);
document
  .getElementById("sendToInventoryButton")
  .addEventListener("click", sendToInventory);

// Load and display the coin balance on page load
document.addEventListener("DOMContentLoaded", updateCoinBalance);
