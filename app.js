// Currency codes for mapping to flags
const currencyCodes = {
    "USD": "US",
    "EUR": "EU",
    "EGP": "EG",
    "AED": "AE",
    "SAR": "SA",
    "INR": "IN",
    "GBP": "GB",
    "JPY": "JP",
    "AUD": "AU",
    // Add more currency codes here as needed
  };
  
  // Get elements for the currencies and flags
  const fromCurrencySelect = document.querySelector(".from select");
  const toCurrencySelect = document.querySelector(".to select");
  const fromFlagImg = document.querySelector(".from img");
  const toFlagImg = document.querySelector(".to img");
  
  // Function to update the flag based on the selected currency
  function updateFlag(selectElement, flagElement) {
    const selectedCurrency = selectElement.value;
    const countryCode = currencyCodes[selectedCurrency];
    flagElement.src = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
  }
  
  // Update flags when the currency selection changes
  fromCurrencySelect.addEventListener("change", () => updateFlag(fromCurrencySelect, fromFlagImg));
  toCurrencySelect.addEventListener("change", () => updateFlag(toCurrencySelect, toFlagImg));
  
  // Initialize flags when the page loads
  updateFlag(fromCurrencySelect, fromFlagImg);
  updateFlag(toCurrencySelect, toFlagImg);
  
  // Handle form submission for exchange rate
  const getButton = document.querySelector("form button");
  getButton.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
  });
  
  // Function to fetch and display the exchange rate
  function getExchangeRate() {
    const amount = document.querySelector("form input"),
          exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
  
    // If no amount is entered, set to 1
    if (amountVal == "" || amountVal == "0") {
      amount.value = "1";
      amountVal = 1;
    }
  
    exchangeRateTxt.innerText = "Getting exchange rate...";
    
    const apiKey = '43079c25bd0c38810049d96c';  // Replace with your API key
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrencySelect.value}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        let exchangeRate = result.conversion_rates[toCurrencySelect.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrencySelect.value} = ${totalExRate} ${toCurrencySelect.value}`;
      })
      .catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
      });
  }
  
  // Swap currencies function
  const exchangeIcon = document.querySelector(".icon");
  exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = tempCode;
    updateFlag(fromCurrencySelect, fromFlagImg);
    updateFlag(toCurrencySelect, toFlagImg);
  });
  