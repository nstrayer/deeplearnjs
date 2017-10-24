// takes a network with calculated gradients and updates
// the weights accordingbased upon our learning rate.
function update_weights(data_inputs, learn_rate, network) {
  return network.map((layer, i) => {
    const firstLayer = i === 0;
    const inputs = firstLayer
      ? data_inputs
      : network[i - 1].map((neuron) => neuron.output);

    const inputs_w_bias = [...inputs, 1];

    const new_layer = layer.map((neuron) => {
      const old_weights = neuron.weights;
      const new_weights = old_weights.map(
        (weight, j) => weight + learn_rate * neuron.delta * inputs_w_bias[j]
      );
      return Object.assign({}, neuron, {weights: new_weights});
    });

    return new_layer;
  });
}

module.exports = update_weights;
