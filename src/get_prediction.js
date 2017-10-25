/**
 * Takes an activated network and returns it's predictions
 * @param {object[]} network - activated network constructed using library functions.
 * @return {number[]} - array of size output corresponding to prob of class
 */
function get_prediction(network) {
  // first check to make sure network has been activated
  if (network[0][0].activation === null) {
    throw new Error(
      'This network is not activated. Needs to be to get predictions'
    );
  }
  const last_layer = network[network.length - 1];
  return last_layer.map((n) => n.output);
}

module.exports = get_prediction;
