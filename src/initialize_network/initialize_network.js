import make_layer from './make_layer';
/**
 * Creates a small network with a single hidden layer.
 * @param {object} params - object with setup info for network
 * @param {number} params.n_inputs - size of input vector.
 * @param {number} params.n_hidden - size of hidden layer in neurons.
 * @param {number} params.n_outputs - number of output layer classes.
 * @return {object[]} - an array of layers containing arrays that can be operated on by other functions to train and predict
 */
function initialize_network(params) {
  const {n_inputs, n_hidden, n_outputs} = params;
  const hidden_layer = make_layer(n_hidden, n_inputs, 'relu', 'hidden');
  const output_layer = make_layer(n_outputs, n_hidden, 'sigmoid', 'output');
  return [hidden_layer, output_layer];
}

module.exports = initialize_network;
