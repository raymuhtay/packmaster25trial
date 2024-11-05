// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 10000; // Load coins from local storage or start with 10,000
const packCost1 = 500; // Cost to open a 1+ pack
let selectedPlayers1 = []; // Array to hold currently selected players

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

const quickSellValues1Pack = {
  pele: 3452,
  ronaldinho: 4123,
  zidane: 4781,
  cruyff: 3999,
  yashin: 3600,
  best: 4205,
  maldini: 3874,
  gullit: 4310,
  "van-basten": 4501,
  eusebio: 3650,
  puskas: 3955,
  "roberto-carlos": 4100,
  hierro: 3702,
  socrates: 3890,
  schmeichel: 4400,
  charlton: 4201,
  "del-piero": 4305,
  hamm: 3800,
  zico: 4150,
  bergkamp: 4600,
  r9: 3850,
  garrincha: 3950,
  muller: 4000,
  baggio: 3705,
  baresi: 4505,
  buffon: 3801,
  cafu: 4110,
  "carlos-alberto": 3900,
  henry: 4302,
  sawa: 4020,
  abily: 3750,
  casillas: 4503,
  matthaus: 4601,
  miyama: 3995,
  moore: 3802,
  pirlo: 3000,
  raul: 3000,
  rivaldo: 3000,
  schelin: 3000,
  xavi: 3000,
  butragueno: 2500,
  cannavaro: 2500,
  cantona: 2500,
  drogba: 2500,
  dalglish: 2500,
  eto: 2500,
  figo: 2500,
  lahm: 2500,
  sanchez: 2500,
  kaka: 2500,
  lineker: 2500,
  nesta: 2500,
  "van-nistelrooy": 2500,
  puyol: 2500,
  schmeichel: 2500,
  shearer: 2500,
  smith: 2500,
  socrates: 2500,
  stoichkov: 2500,
  zanetti: 2500,
  bale: 2500,
  beckham: 2000,
  blanc: 2000,
  cech: 2000,
  desailly: 2000,
  ferdinand: 2000,
  gerrard: 2000,
  hagi: 2000,
  hierro: 2000,
  klose: 2000,
  koeman: 2000,
  laudrup: 2000,
  nedved: 2000,
  owen: 2000,
  pichon: 2000,
  ribery: 2000,
  riquelme: 2000,
  rooney: 2000,
  scholes: 2000,
  schweinsteiger: 2000,
  shevchenko: 2000,
  thuram: 2000,
  "van-der-sar": 2000,
  "van-persie": 2000,
  viera: 2000,
  barnes: 2000,
  kluivert: 2000,
  lampard: 2000,
  makelele: 2000,
  petit: 2000,
  pires: 2000,
  rijkaard: 2000,
  rush: 2000,
  suker: 2000,
  torres: 2000,
  vidic: 2000,
  wright: 2000,
  alonso: 2000,
  zola: 2000,
  cole: 1500,
  crespo: 1500,
  essien: 1500,
  gattuso: 1500,
  hernandez: 1500,
  keane: 1500,
  larsson: 1500,
  veron: 1500,
  zambrotta: 1500,
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

// Function to open the 1+ pack
function open1Pack() {
  if (coins < packCost1) {
    alert("Not enough coins to open a Special pack!");
    return;
  }

  coins -= packCost1;
  updateCoinBalance();

  document.getElementById("open1PackButton").style.display = "none";
  document.getElementById("currentPlayer").innerHTML = "";
  document.getElementById("inventoryButton").style.display = "none";

  selectedPlayers1 = shuffleArray(Object.keys(quickSellValues1Pack)).slice(
    0,
    3
  );
  selectedPlayers1.sort(
    (a, b) => (quickSellValues1Pack[b] || 0) - (quickSellValues1Pack[a] || 0)
  );

  const firstPlayer = selectedPlayers1[0];
  displayPlayer({ id: firstPlayer }, "currentPlayer");

  document.getElementById("continueButton").style.display = "block";
  document.getElementById("sendToInventoryButton").style.display = "none";
}

// Function to display all players at once when "Continue" is clicked
function showAllPlayers() {
  const currentPlayerDiv = document.getElementById("currentPlayer");
  currentPlayerDiv.innerHTML = ""; // Clear previous players

  selectedPlayers1.forEach((playerId) => {
    displayPlayer({ id: playerId }, "currentPlayer"); // Display all selected players
  });

  document.getElementById("continueButton").style.display = "none";
  document.getElementById("sendToInventoryButton").style.display = "block"; // Show main Send to Inventory button
}

// Quick sell a player
function quickSellPlayer(player) {
  const sellValue = quickSellValues1Pack[player.id] || 0;
  coins += sellValue;
  updateCoinBalance();

  selectedPlayers1 = selectedPlayers1.filter((p) => p !== player.id);
  inventory = inventory.filter((p) => p.id !== player.id);
  saveInventory();

  const playerCard = document.querySelector(
    `#currentPlayer .player-card img[data-id='${player.id}']`
  )?.parentElement;
  if (playerCard) {
    playerCard.remove();
  }

  // Hide Send to Inventory button and show Open Pack button if all players are quick sold
  if (selectedPlayers1.length === 0) {
    document.getElementById("sendToInventoryButton").style.display = "none";
    document.getElementById("open1PackButton").style.display = "block"; // Show Open Pack button
  }
}

function sendToInventory() {
  const warningDiv = document.getElementById("duplicateWarning");
  const sendToInventoryButton = document.getElementById(
    "sendToInventoryButton"
  );
  let duplicatesFound = false;

  console.log("Selected players to send to inventory:", selectedPlayers1);

  selectedPlayers1.forEach((playerId) => {
    const existingPlayer = inventory.find((p) => p.id === playerId);
    console.log("Checking player:", playerId, "Existing:", existingPlayer);

    if (!existingPlayer) {
      inventory.push({ id: playerId });
    } else {
      duplicatesFound = true; // Duplicate found
    }
  });

  saveInventory();
  updateCoinBalance();

  console.log("Updated inventory:", inventory);

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

  selectedPlayers1.forEach((playerId) => {
    const playerCard = document.querySelector(
      `#currentPlayer .player-card img[data-id='${playerId}']`
    )?.parentElement;
    if (playerCard) {
      playerCard.remove(); // Remove player card from display
    }
  });

  // Ensure the button exists before modifying its properties
  if (sendToInventoryButton) {
    sendToInventoryButton.style.display = "none";
  } else {
    console.error("Send to Inventory button not found");
  }

  const openPackButton = document.getElementById("open1PackButton");
  if (openPackButton) {
    openPackButton.style.display = "block"; // Show Open Pack button
  } else {
    console.error("Open Pack button not found");
  }
}

// Event listeners
document.getElementById("open1PackButton").addEventListener("click", open1Pack);
document
  .getElementById("continueButton")
  .addEventListener("click", showAllPlayers);
document
  .getElementById("sendToInventoryButton")
  .addEventListener("click", sendToInventory);

// Initialize the display with the current coin balance
updateCoinBalance();
