import {emptyArr} from 'statdists';
import make_neuron from './make_neuron';
/**
 * Creates a layer for a network with a given number of neurons. This assumes fully connected.
 * @param {number} n_neurons - size of this layer in neurons.
 * @param {number} n_parents - size of previous layer in neurons.
 * @param {string} act_func - type of activation function we're using on this layer.
 * @param {string} label - name for the neuron. Mostly helpful for debugging. 
 * @return {object} - an array of neuron objects.
 */
function make_layer(n_neurons, n_parents, act_func, label = 'hidden') {
  return emptyArr(n_neurons).map((neuron) =>
    make_neuron(n_parents, act_func, label)
  );
}

module.exports = make_layer;
