// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 10000; // Load coins from local storage or start with 10,000
const packCost = 0; // Cost to open a 92+ pack
let selectedPlayers = []; // Array to hold currently selected players

// Local storage keys
const INVENTORY_KEY = "inventory";

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
// Send players to inventory
updateCoinBalance();
// console.log(Coins: ${coins});

// Player list
const players = [
  { id: "messi", weight: 50 }, // Very high chance
  { id: "ronaldo", weight: 45 }, // High chance
  { id: "mbappe", weight: 30 }, // High chance
  { id: "lewandowski", weight: 35 }, // High chance
  { id: "debruyne", weight: 30 }, // Moderate-high chance
  { id: "neymar", weight: 55 }, // Moderate-high chance
  { id: "ederson", weight: 55 }, // Moderate chance
  { id: "frimpong", weight: 75 }, // Moderate-low chance
  { id: "haaland", weight: 95 }, // High chance
  { id: "van-djik", weight: 43 }, // Moderate chance
  { id: "alisson", weight: 34 }, // Moderate chance
  { id: "ruben-dias", weight: 75 }, // Moderate chance
  { id: "bellingham", weight: 55 }, // Moderate chance
  { id: "rodri", weight: 55 }, // Moderate-low chance
  { id: "theo-hernandez", weight: 55 }, // Moderate-low chance
  { id: "lucas-hernandez", weight: 99 }, // Lower chance
  { id: "modric", weight: 99 }, // High chance
  { id: "benzema", weight: 85 }, // Moderate chance
  { id: "salah", weight: 55 }, // Moderate-high chance
  { id: "neuer", weight: 65 }, // Moderate-low chance
  { id: "kane", weight: 64 }, // Moderate chance
  { id: "foden", weight: 43 }, // Moderate chance
  { id: "lukaku", weight: 99 }, // Moderate-low chance
  { id: "griezmann", weight: 97 }, // Moderate chance
  { id: "carvajal", weight: 65 }, // Lower chance
  { id: "vardy", weight: 87 }, // Moderate-low chance
  { id: "alaba", weight: 87 }, // Moderate-low chance
  { id: "jorginho", weight: 97 }, // Lower chance
  { id: "firmino", weight: 99 }, // Moderate-low chance
  { id: "bruno-fernandes", weight: 75 }, // Moderate chance
  { id: "son", weight: 34 }, // Moderate chance
  { id: "sterling", weight: 99 }, // Moderate chance
  { id: "morata", weight: 98 }, // Moderate-low chance
  { id: "serge-gnabry", weight: 100 }, // Moderate-low chance
  { id: "kane", weight: 3 }, // Less rare
  { id: "courtois", weight: 3 }, // Less rare
  { id: "vinicius", weight: 2 }, // Less rare
  { id: "kimmich", weight: 2 }, // Rare
  { id: "mane", weight: 3 }, // Less rare
  { id: "rashford", weight: 2 }, // Less rare
  { id: "oblak", weight: 3 }, // Less rare
  { id: "silva", weight: 2 }, // Rare
  { id: "casemiro", weight: 3 }, // Less rare
  { id: "cancelo", weight: 3 }, // Less rare
  { id: "hakimi", weight: 2 }, // Rare
  { id: "dias", weight: 2 }, // Rare
  { id: "valverde", weight: 2 }, // Rare
  { id: "alexander-arnold", weight: 2 }, // Rare
  { id: "foden", weight: 2 }, // Rare
  { id: "rodrygo", weight: 1 }, // Most rare
  { id: "mendes", weight: 2 }, // Rare
  { id: "yamal", weight: 2 },
];

// Quick sell values
const quickSellValues = {
  messi: 1700,
  ronaldo: 1700,
  mbappe: 1800,
  lewandowski: 1700,
  debruyne: 1600,
  neymar: 1500,
  ederson: 1400,
  frimpong: 1300,
  haaland: 1800,
  "van-djik": 1700,
  alisson: 1400,
  "ruben-dias": 1500,
  bellingham: 1400,
  rodri: 1300,
  "theo-hernandez": 1200,
  "lucas-hernandez": 1100,
  modric: 1400,
  benzema: 1300,
  salah: 1600,
  neuer: 1200,
  kane: 1500,
  foden: 1300,
  lukaku: 1100,
  griezmann: 1500,
  carvajal: 1100,
  vardy: 1000,
  alaba: 1100,
  jorginho: 1000,
  firmino: 1000,
  "bruno-fernandes": 1500,
  son: 1600,
  sterling: 1300,
  morata: 1100,
  "serge-gnabry": 1000,
  kane: 1900,
  courtois: 1800,
  vinicius: 1900,
  kimmich: 1700,
  mane: 1800,
  rashford: 1900,
  oblak: 1800,
  "b-silva": 1700,
  casemiro: 1700,
  cancelo: 1700,
  hakimi: 1600,
  dias: 1600,
  valverde: 1600,
  "alexander-arnold": 1600,
  bellingham: 1800,
  foden: 1600,
  rodrygo: 1800,
  mendes: 1700,
  yamal: 1100,
  acerbi: 1200,
  akanji: 1300,
  alvarez: 1400,
  araujo: 1500,
  baltimore: 1000,
  barella: 1600,
  batlle: 900,
  boattin: 800,
  bonmati: 1700,
  bounou: 1100,
  bright: 950,
  bronze: 1200,
  buchanan: 1000,
  cancelo: 1800,
  caruso: 850,
  chawinga: 900,
  chiesa: 1600,
  daly: 1000,
  debinha: 1100,
  dejong: 1700,
  dembele: 1500,
  depaul: 1400,
  diani: 1000,
  diaz: 1300,
  "diogo-costa": 1200,
  donnaruma: 1600,
  doorsoun: 900,
  dovbyk: 1100,
  earps: 1000,
  foord: 950,
  frohms: 1100,
  gabriel: 1300,
  geyoro: 1000,
  girljames: 850,
  grealish: 1700,
  greenwood: 1200,
  grimaldo: 1300,
  guijarro: 1100,
  hansen: 1000,
  hasegawa: 950,
  hegerberg: 1600,
  hemp: 1100,
  hendrich: 900,
  horan: 1300,
  huth: 850,
  "iago-aspas": 1400,
  ilestedt: 900,
  irene: 1100,
  isak: 1500,
  janssen: 1200,
  jota: 1600,
  kante: 1800,
  kerr: 1700,
  kobel: 1300,
  koulibaly: 1600,
  kounde: 1500,
  kvaratskhelia: 1400,
  "l-martinez": 1700,
  lawrence: 1000,
  lesommer: 1200,
  little: 1100,
  maddison: 1500,
  mahrez: 1700,
  maignan: 1400,
  majri: 950,
  mamardashvili: 1100,
  mane: 1800,
  marquinhos: 1600,
  mbock: 1000,
  mccabe: 950,
  mead: 1300,
  mendy: 1500,
  merino: 1200,
  miedema: 1600,
  "milinkovic-savic": 1500,
  militao: 1600,
  morgan: 1300,
  neves: 1500,
  nnadozie: 900,
  oberdorf: 1100,
  olmo: 1400,
  openda: 1300,
  osimhen: 1700,
  pajor: 1000,
  palacios: 1200,
  palhinha: 1400,
  palmer: 1100,
  pavard: 1500,
  putellas: 1800,
  reiten: 1000,
  remiro: 1200,
  renard: 1300,
  rice: 1700,
  rodman: 950,
  rolfo: 1100,
  romero: 1500,
  roord: 1000,
  rudiger: 1600,
  russo: 1100,
  sabitzer: 1400,
  saliba: 1500,
  sane: 1600,
  sauerbrunn: 1200,
  schlotterbeck: 1300,
  schuller: 1000,
  shaw: 1500,
  sheridan: 1100,
  sommer: 1400,
  swanson: 1000,
  tah: 1300,
  tchouameni: 1600,
  terstegen: 1700,
  toone: 1100,
  viggosdottir: 950,
  vlahovic: 1600,
  walsh: 1200,
  watkins: 1400,
  weir: 1100,
  white: 1300,
  williamson: 1200,
  wirtz: 1500,
  xhaka: 1400,
  zinsberger: 1100,
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

// Display player details
function displayPlayer(player, containerId) {
  const playerDiv = document.getElementById(containerId);
  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const originalElement = document.getElementById(player.id);
  const playerImage = originalElement.cloneNode(true);
  playerImage.style.display = "block"; // Ensure the image is visible
  playerImage.setAttribute("data-id", player.id); // Add data-id for easy selection

  const playerName = document.createElement("p");
  playerName.textContent = player.name;

  const quickSellButton = document.createElement("button");
  quickSellButton.textContent = "Quick Sell";
  quickSellButton.className = "quick-sell-button";
  quickSellButton.addEventListener("click", () => quickSellPlayer(player));

  playerCard.appendChild(playerImage);
  playerCard.appendChild(playerName);
  playerCard.appendChild(quickSellButton);
  playerDiv.appendChild(playerCard);
  playerDiv.appendChild(playerCard);
  playerCard.classList.add("fade-in-bottom");
  // Check if the player is a duplicate
  if (inventory.find((p) => p.id === player.id)) {
    // Add duplicate badge and reduce opacity for the player card
    const duplicateOverlay = document.createElement("div");
    duplicateOverlay.className = "duplicate-overlay";
    duplicateOverlay.textContent = "DUPLICATE";

    playerCard.appendChild(duplicateOverlay);
    playerCard.classList.add("duplicate-opacity"); // Reduce opacity for duplicate player card
  }
}

// Open pack function
function openPack() {
  // Check if the player has enough coins
  if (coins < packCost) {
    alert("Not enough coins to open a Gold pack!");
    return; // Exit if there are not enough coins
  }

  // Deduct the cost of the pack
  coins -= packCost;
  updateCoinBalance(); // Update coin display

  console.log("Gold pack opening...");

  // Hide the Open Pack button
  document.getElementById("openPackButton").style.display = "none";

  // Clear previous pack cards
  document.getElementById("currentPlayer").innerHTML = "";
  document.getElementById("inventoryButton").style.display = "none";

  // Shuffle and pick 3 random players
  selectedPlayers = shuffleArray(players.slice()).slice(0, 3);

  // Display the first player
  const firstPlayer = selectedPlayers[0];
  displayPlayer(firstPlayer, "currentPlayer");

  // Show the continue button
  document.getElementById("continueButton").style.display = "block";
}

// Show all selected players
function showAllPlayers() {
  console.log("Showing all players...");
  const playerDiv = document.getElementById("currentPlayer");
  playerDiv.innerHTML = ""; // Clear previous content

  // Show all selected players
  selectedPlayers.forEach((player) => {
    displayPlayer(player, "currentPlayer");
  });

  // Hide the Continue button and show the Send to Inventory button
  document.getElementById("continueButton").style.display = "none";
  document.getElementById("sendToInventoryButton").style.display = "block";

  // Show the Open Pack button again after all players are shown
  document.getElementById("openPackButton").style.display = "block";
}

// Function to send selected players to inventory
function sendToInventory() {
  const warningDiv = document.getElementById("duplicateWarning");
  let duplicatesFound = false;

  // Iterate through the selected players
  selectedPlayers.forEach((playerId) => {
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
  selectedPlayers = []; // Clear selected players
  document.getElementById("inventoryButton").style.display = "block"; // Show the Inventory button
  document.getElementById("sendToInventoryButton").style.display = "none"; // Hide the Send to Inventory button
  document.getElementById("openPackButton").style.display = "block"; // Ensure the Open Pack button is visible

  // Show the Inventory button after sending to inventory
  document.getElementById("inventoryButton").style.display = "block";
  document.getElementById("sendToInventoryButton").style.display = "none";

  // Ensure the Open Pack button is visible
  document.getElementById("openPackButton").style.display = "block"; // Ensure this is visible

  // Optionally show duplicate messages
  showDuplicateWarning();
}

// Show warning for duplicates
function showDuplicateWarning() {
}

// Quick sell a player
function quickSellPlayer(player) {
  // Retrieve the quick sell value for the player
  const sellValue = quickSellValues[player.id] || 0; // Default to 0 if player ID is not found

  // Add sell value to coins
  coins += sellValue;
  updateCoinBalance();

  // Remove the player from the current selection
  selectedPlayers = selectedPlayers.filter((p) => p.id !== player.id);

  // Find and remove the player card from display
  const playerCard = document.querySelector(
    `#currentPlayer .player-card img[data-id='${player.id}']`
  ).parentElement;
  if (playerCard) {
    playerCard.remove();
  }

  // Optionally, hide the Quick Sell button if needed
  hideQuickSellButton(player.id);
}

// Hide quick sell button
function hideQuickSellButton(playerId) {
  const quickSellButton = document.querySelector(
    `#currentPlayer .player-card img[data-id='${playerId}']`
  ).nextElementSibling;
  if (quickSellButton) {
    quickSellButton.style.display = "none";
  }
}

// Display player in inventory
function displayPlayerInInventory(player) {
  const inventoryDiv = document.getElementById("inventory");
  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const originalElement = document.getElementById(player.id);
  const playerImage = originalElement.cloneNode(true);
  playerImage.style.display = "block"; // Ensure the image is visible
  const playerName = document.createElement("p");
  playerName.textContent = player.name;

  const quickSellButton = document.createElement("button");
  quickSellButton.textContent = "Quick Sell";
  quickSellButton.className = "quick-sell-button";
  quickSellButton.addEventListener("click", () =>
    quickSellInventoryPlayer(player, playerCard)
  );

  playerCard.appendChild(playerImage);
  playerCard.appendChild(playerName);
  playerCard.appendChild(quickSellButton);
  inventoryDiv.appendChild(playerCard);
}

// Quick sell a player from inventory
function quickSellInventoryPlayer(player, playerCard) {
  // Define the quick sell value for each player
  const sellValue = quickSellValues[player.id] || 0; // Adjust this value as needed

  // Add sell value to coins
  coins += sellValue;
  updateCoinBalance();

  // Remove the player from the inventory
  inventory = inventory.filter((p) => p.id !== player.id);

  // Remove the player card from the inventory display
  if (playerCard) {
    playerCard.remove();
  }

  // Save updated inventory to local storage
  saveInventory();
}

// Event Listeners
document.getElementById("openPackButton").addEventListener("click", openPack);
document
  .getElementById("continueButton")
  .addEventListener("click", showAllPlayers);
document
  .getElementById("sendToInventoryButton")
  .addEventListener("click", sendToInventory);
document
  .getElementById("inventoryButton")
  .addEventListener("click", function () {
    document.getElementById("inventorySection").style.display = "block";
    // Clear and display inventory
    const inventoryDiv = document.getElementById("inventory");
    inventoryDiv.innerHTML = "";
    inventory.forEach((player) => displayPlayerInInventory(player));
  });
document.getElementById("goBackButton").addEventListener("click", function () {
  document.getElementById("inventorySection").style.display = "none";
});

// Variables for coin system

// Local storage keys
const COINS_KEY = "coins"; // Key to store coins in local storage

// Load coins from local storage, or use the default value
function loadCoins() {
  let savedCoins = localStorage.getItem(COINS_KEY);
  if (savedCoins === null) {
    savedCoins = defaultCoins;
    localStorage.setItem(COINS_KEY, savedCoins);
  }
  return parseInt(savedCoins, 10);
}

// Save coins to local storage
function saveCoins(coins) {
  localStorage.setItem(COINS_KEY, coins);
}

// Update the coin balance on the UI
function updateCoinBalanceDisplay() {
  const coins = loadCoins();
//   document.getElementById("coinBalance").textContent = `Coins: ${coins}`;
  document.querySelector(".coinBalance").textContent = `Coins: ${coins}`;
}

// Deduct coins when buying a pack
function buyPack() {
  let coins = loadCoins();
  if (coins >= packCost) {
    coins -= packCost;
    saveCoins(coins); // Save the new coin balance
    updateCoinBalanceDisplay(); // Update the UI with the new coin balance
  } else {
    alert("Not enough coins to buy the pack!");
  }
}

// Event listener to open the pack and deduct the cost
document.getElementById("openPackButton").addEventListener("click", buyPack);

updateCoinBalance();
