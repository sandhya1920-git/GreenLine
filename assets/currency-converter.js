document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '03859f76805208b9987f377d';
  const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;
  const currencyRates = { INR: 1, USD: 1, EUR: 1 };
  const currencySelect = document.getElementById('currency-select');

  // Fetch exchange rates
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      //console.log('Exchange rate data:', data); 
      currencyRates.USD = data.conversion_rates.USD; 
      currencyRates.EUR = data.conversion_rates.EUR; 

     // console.log('Currency rates:', currencyRates);

      updatePrices(currencySelect.value); 
    })
    .catch(error => console.error('Exchange rate fetch error:', error));

  currencySelect.addEventListener('change', () => {
    updatePrices(currencySelect.value);
  });

function updatePrices(currency) {
  document.querySelectorAll('[data-price-inr]').forEach(element => {
    const priceINR = parseFloat(element.dataset.priceInr);
    const conversionRate = currencyRates[currency];

    //console.log(`Converting ${priceINR} INR to ${currency} using rate ${conversionRate}`);

    if (!conversionRate || conversionRate <= 0) {
      console.error(`Invalid conversion rate for ${currency}:`, conversionRate);
      element.innerHTML = 'Error';
      return;
    }

    const convertedPrice =
      currency === 'INR'
        ? Math.round(priceINR) 
        : (priceINR * conversionRate).toFixed(2);

    //display price
    element.innerHTML = `${currency}: ${
      currency === 'USD'
        ? '$' + convertedPrice
        : currency === 'EUR'
        ? '€' + convertedPrice
        : '₹' + convertedPrice
    }`;
  });
}


});
