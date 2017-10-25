/**
 * Takes a given array of weights and corresponding inputs for some neuron and calculates its activation value based upon those.
 *   This assumes that weights.length == inputs.length + 1, because of added bias/intercept.
 * @param {number[]} weights - vector of weights for inputs
 * @param {number[]} inputs - vector of actual inputs corresonding to weights. Function adds intercept/ bias to last element of array. 
 * @return {number} - neurons activation after linear calculation
 */
const calc_activation = (weights, inputs) =>
  [...inputs, 1].reduce((sum, inp, i) => sum + inp * weights[i], 0);

module.exports = calc_activation;
