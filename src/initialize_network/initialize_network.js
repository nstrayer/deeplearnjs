import sd from 'statdists';

function make_neuron(n_parents, act_func, label) {
  return {
    weights: sd.rnorm(n_parents + 1), // we add one for the bias term here.
    activation: null, // activation value is pre-activation function value
    output: null, // output is post activation function
    error: null, // error before multiplied by deriv of activation function
    delta: null, // error after multiplied by deriv of activation funtion
    act_func, // name of activation function
    label,
  };
}

function make_layer(n_neurons, n_parents, act_func, label = 'hidden') {
  return sd
    .emptyArr(n_neurons)
    .map((neuron) => make_neuron(n_parents, act_func, label));
}

function initialize_network({n_inputs, n_hidden, n_outputs}) {
  const hidden_layer = make_layer(n_hidden, n_inputs, 'relu', 'hidden');
  const output_layer = make_layer(n_outputs, n_hidden, 'sigmoid', 'output');
  return [hidden_layer, output_layer];
}

module.exports = initialize_network;
