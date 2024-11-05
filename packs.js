// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 10000; // Load coins from local storage or start with 10,000

// Update coin balance display
function updateCoinBalance() {
  document.querySelectorAll(".coinBalance").forEach((element) => {
    element.textContent = `Coins: ${coins}`;
  });
  localStorage.setItem("coins", coins); // Save coins to local storage
}

// Initialize
updateCoinBalance();
