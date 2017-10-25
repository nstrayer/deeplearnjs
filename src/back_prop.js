import activation_func_deriv from './activation_functions/activation_func_deriv';

/**
 * Takes the true result of the data that the network was activated on and runs back_propigation to find gradients for each neuron
 * @param {object[]} network - network constructed using library functions. 
 * @param {number[]} expected - vector of true outputs corresponding to the input the network was activated with.
 * @return {object[]} - returns a network of same size/shape as original but with gradient info filled out.
 */
function back_prop(network, expected) {
  // iterate backwards through layers...
  // unpacks array before reversing as to not mutate original
  return [...network].reverse().reduce((new_network, layer, i) => {
    // for each layer iterate through the neurons
    const current_layer = layer.map((neuron, j) => {
      // check if we're in our first iteration (aka last layer)
      const first_iteration = i === 0;

      // if we're at the last layer (first iteration)
      // we can easily calculate the error by just doing expected - seen
      // Otherwise, we're in an intermediate/hidden layer
      // and we need to sum connections to the layer above multiplied
      // by their weights to accumulate current neuron's
      // errors. We just need the lastest layer in the accumulated network
      const error = first_iteration
        ? expected[j] - neuron.output
        : new_network[0].reduce(
            (total_error, child_neuron) =>
              total_error + child_neuron.weights[j] * child_neuron.delta,
            0
          );

      // send error backwards through deriv of activation function
      const delta =
        error * activation_func_deriv(neuron.act_func, neuron.output);

      // return neuron so we build up a layer in map.
      return Object.assign({}, neuron, {error, delta});
    }); // end layer loop

    // shove our newest layer into the cummulative results
    return [current_layer, ...new_network];
  }, []); // end network reduce
}

module.exports = back_prop;
