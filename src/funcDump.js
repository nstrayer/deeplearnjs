import sd from 'statdists';

function make_neuron(n_parents, act_func, label){
  return {
      weights: sd.rnorm(n_parents + 1), // we add one for the bias term here.
      activation: null, // activation value is pre-activation function value
      output: null,     // output is post activation function 
      error: null,      // error before multiplied by deriv of activation function
      delta: null,      // error after multiplied by deriv of activation funtion
      act_func,         // name of activation function
      label, 
  };
};

function make_layer(n_neurons, n_parents, act_func, label = 'hidden'){
  return sd.emptyArr(n_neurons).map(neuron => make_neuron(n_parents, act_func, label))
};

function initialize_network({n_inputs, n_hidden, n_outputs}){
  const network = [];
  const hidden_layer = make_layer(n_hidden, n_inputs, 'relu', 'hidden');
  const output_layer = make_layer(n_outputs, n_hidden, 'sigmoid', 'output');
  return [hidden_layer, output_layer];
};

// Function that takes a given array of weights and corresponding inputs for
// some neuron and calculates its activation value based upon those. 
// This assumes that weights.length == inputs.length + 1, because of added bias/intercept.
function calc_activation(weights, inputs){
  // bias is the last weight in our weights array
  // so we append a 1 to the end of our inputs.
  return [...inputs, 1].reduce((sum, inp, i) => sum + inp*weights[i], 0)
}

function activation_func(activation, type){
  switch (type){
      case "relu":
          return activation > 0 ? activation: 0;
      case "sigmoid":
          return 1 / (1 + Math.exp(-activation));
      default: 
          return activation; 
  }
}


function activation_func_deriv(output, type){
  switch (type){
      case "relu":
          return output > 0 ? 1: 0;
      case "sigmoid":
          return output * (1 - output);
      default: 
          return output; 
  }
}

// takes a set of data inputs and a given network
// and forward propigates through network, 
// returns a network of same size/shape as original
// but with activation info filled out.
function forward_prop(data_input, network){
//     console.log('forward propigation')
  // these are the actual data entering the model
  let inputs = data_input;
  
  // map over each layer in the network
  return network.map((layer, i) => {   
      
      // holder for what our inputs will be at the next layer (results of this one)
      const layer_output = [];
      
      // map over every neuron to get next layer's input.
      const updated_layer = layer.map(neuron => {    
          // activate nueron
          const activation = calc_activation(neuron.weights, inputs);

          // squash with non-linear activation function
          const output = activation_func(activation, neuron.act_func); 

          // update the inputs for next layer with current layer's output
          layer_output.push(output);
          
          // return the newly activated neuron
          return Object.assign({}, neuron, {activation, output});
      });
      // replace inputs with layer's outputs for next layer
      inputs = layer_output;
      
      // store layer in map output
      return updated_layer
  })
};

// takes an activated network and returns it's predictions
function get_prediction(network){
  const last_layer = network[network.length-1];
  return last_layer.map(n => n.output);
}


// takes the true result of the data that the network was activated on
// and runs back_propigation to find gradients for each neuron 
function back_propigate(expected, network){
//     console.log('backward propigation')

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
          const error = first_iteration ?
                expected[j] - neuron.output :
                new_network[0].reduce( (total_error, child_neuron) => 
                  total_error + (child_neuron.weights[j]*child_neuron.delta), 
                0);
          
          // send error backwards through deriv of activation function
          const delta = error * activation_func_deriv(neuron.output, neuron.act_func)
         
          // return neuron so we build up a layer in map.
          return Object.assign({}, neuron, {error, delta});
      }); // end layer loop
      
      // shove our newest layer into the cummulative results
      return [current_layer, ...new_network]
  }, []); // end network reduce
}

// takes a network with calculated gradients and updates
// the weights accordingbased upon our learning rate.
function update_weights(data_inputs, learn_rate, network){
//     console.log('Updating weights')

  return network.map((layer, i) => {
      
      const firstLayer = i === 0;
      const inputs = firstLayer ?
        data_inputs : 
        network[i - 1].map(neuron => neuron.output);
      
      const inputs_w_bias = [...inputs, 1];
              
      const new_layer = layer.map(neuron => {
          const old_weights = neuron.weights
          const new_weights = old_weights.map((weight, j) => 
            weight + (learn_rate * neuron.delta * inputs_w_bias[j])
          );
          return Object.assign({}, neuron, {weights: new_weights});
      })
      
     return new_layer;
  })
}

function train_network({
  network, 
  train_data,
  learn_rate, 
  n_epochs = 25,
  print_progress = true,
  }){
  
  const n_outputs = train_data[0].expected.length;
  
  const train_errors = sd.emptyArr(n_epochs).reduce((errors, _, epoch) => {
      let sum_error = 0;
      
      train_data.forEach(({obs, expected}) => {           
          const forward_step = forward_prop(obs, network);
          const back_step = back_propigate(expected, forward_step);
          const update_step = update_weights(obs, learn_rate, back_step)
          
          // check performance of network
          const predictions = get_prediction(forward_step);
          const squared_differences = sd.vsub(expected, predictions)
            .map(diff => Math.pow(diff, 2));
          
          sum_error += sd.sum(squared_differences);
          
          // update network
          network = update_step; 
      })
      
      if(print_progress){
        console.log(`-------------------
Epoch: ${epoch + 1} | Error: ${sum_error.toPrecision(4)}`);
      }
      
      return [...errors, sum_error]
  }, [])
  
 return {network, train_errors};
}