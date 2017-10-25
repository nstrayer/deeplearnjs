/**
 * takes a network with calculated gradients and updates  the weights based upon our learning rate.
 * @param {object[]} network - network constructed using library functions. 
 * @param {number[]} data_inputs - vector of inputs corresponding to the input the network was activated with.
 * @param {number} learn_rate - scaler to control speed of gradient descent. High = fast but unstable, low = slow but stable and prone to getting caught in local min.
 * @param {string} [algorithm = 'steepest descent'] - Type of gradient descent algorithm. Currently only supports steepest descent.
 * @return {object[]} - returns a network of same size/shape as original but with weights updated with gradient descent.
 */
function update_weights(
  network,
  data_inputs,
  learn_rate,
  algorithm = 'steepest descent'
) {
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
