import {rnorm} from 'statdists';

/**
 * Sets up a single neuron for a layer. This allows it to remember things like activations, etc.
 * @param {number} n_parents - number of neurons that feed into this one, used for weights.
 * @param {string} act_func - type of activation function we're using on this layer.
 * @param {string} label - name for the neuron. Mostly helpful for debugging. 
 * @return {object} - an object containing weights array, activation value, errors, activation function name and label.
 */
function make_neuron(n_parents, act_func, label) {
  return {
    weights: rnorm(n_parents + 1), // we add one for the bias term here.
    activation: null, // activation value is pre-activation function value
    output: null, // output is post activation function
    error: null, // error before multiplied by deriv of activation function
    delta: null, // error after multiplied by deriv of activation funtion
    act_func, // name of activation function
    label,
  };
}

module.exports = make_neuron;
