function calculateNetOwes(transactions, rates) {
  if (!transactions || !rates) return null;
  const netOwes = {};
  // Iterate over each transaction
  transactions.forEach(([person1, person2, value, currency]) => {
    // Initialize the netOwes object if not already initialized
    netOwes[person1] = netOwes[person1] || {};
    netOwes[person2] = netOwes[person2] || {};

    // Increment the amount owed from person1 to person2
    netOwes[person1][person2] = roundToDigit(
      (netOwes[person1][person2] || 0) +
        convertCurrency(value, currency, rates),
    );

    // Decrement the amount owed from person2 to person1
    netOwes[person2][person1] = roundToDigit(
      (netOwes[person2][person1] || 0) -
        convertCurrency(value, currency, rates),
    );
  });

  return netOwes;
}

const convertCurrency = (value, target, rates) => {
  if (!rates[target]) return null;

  return roundToDigit(value / rates[target], 2);
};

const roundToDigit = (num, digits = 2) => {
  if (!num) return null;
  const multiplier = Math.pow(10, digits);
  return Math.round(num * multiplier) / multiplier;
};

const getSumOfArray = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

export { calculateNetOwes, roundToDigit, convertCurrency, getSumOfArray };
