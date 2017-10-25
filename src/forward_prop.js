import calc_activation from './calc_activation';
import activation_func from './activation_functions/activation_func';

/**
 * takes a set of data inputs and a given network and forward propigates through network,
 * @param {object[]} network - network constructed using library functions.
 * @param {number[]} data_input - vector of input data for single observation.
 * @return {object[]} - returns a network of same size/shape as original but with activation info filled out.
 */
function forward_prop(network, data_input) {
  // these are the actual data entering the model
  let inputs = data_input;

  // map over each layer in the network
  return network.map((layer, i) => {
    // holder for what our inputs will be at the next layer (results of this one)
    const layer_output = [];

    // map over every neuron to get next layer's input.
    const updated_layer = layer.map((neuron) => {
      // activate nueron
      const activation = calc_activation(neuron.weights, inputs);

      // squash with non-linear activation function
      const output = activation_func(neuron.act_func, activation);

      // update the inputs for next layer with current layer's output
      layer_output.push(output);

      // return the newly activated neuron
      return Object.assign({}, neuron, {activation, output});
    });
    // replace inputs with layer's outputs for next layer
    inputs = layer_output;

    // store layer in map output
    return updated_layer;
  });
}

module.exports = forward_prop;
