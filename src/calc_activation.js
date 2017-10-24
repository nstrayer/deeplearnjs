// Function that takes a given array of weights and corresponding inputs for
// some neuron and calculates its activation value based upon those.
// This assumes that weights.length == inputs.length + 1, because of added bias/intercept.
function calc_activation(weights, inputs) {
  // bias is the last weight in our weights array
  // so we append a 1 to the end of our inputs.
  return [...inputs, 1].reduce((sum, inp, i) => sum + inp * weights[i], 0);
}

module.exports = calc_activation;
