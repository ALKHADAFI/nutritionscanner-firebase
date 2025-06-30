module.exports = function evaluateHealth(product) {
  const { sugar = 0, calories = 0, saturatedFat = 0, sodium = 0 } = product;
  const healthyFor = [];

  if (sugar < 10 && saturatedFat < 3 && sodium < 150 && calories < 200) {
    healthyFor.push("Anak-anak");
  }
  if (sugar < 15 && saturatedFat < 5 && sodium < 300 && calories < 300) {
    healthyFor.push("Dewasa");
  }
  if (sugar < 12 && saturatedFat < 4 && sodium < 250 && calories < 250) {
    healthyFor.push("Lansia");
  }

  return { healthyFor };
};
// This function evaluates the healthiness of a product based on its nutritional values.
// It returns an object indicating which age groups the product is healthy for.