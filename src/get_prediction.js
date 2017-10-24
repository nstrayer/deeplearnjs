// takes an activated network and returns it's predictions
function get_prediction(network) {
  const last_layer = network[network.length - 1];
  return last_layer.map((n) => n.output);
}

module.exports = get_prediction;
