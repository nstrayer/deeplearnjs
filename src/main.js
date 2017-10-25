import initialize_network from './initialize_network/initialize_network';
import train_network from './train_network';

const my_data = [
  {obs: [2.7810836, 2.550537003], expected: [1, 0]},
  {obs: [1.465489372, 2.362125076], expected: [1, 0]},
  {obs: [3.396561688, 4.400293529], expected: [1, 0]},
  {obs: [1.38807019, 1.850220317], expected: [1, 0]},
  {obs: [3.06407232, 3.005305973], expected: [1, 0]},
  {obs: [7.627531214, 2.759262235], expected: [0, 1]},
  {obs: [5.332441248, 2.088626775], expected: [0, 1]},
  {obs: [6.922596716, 1.77106367], expected: [0, 1]},
  {obs: [8.675418651, -0.242068655], expected: [0, 1]},
  {obs: [7.673756466, 3.508563011], expected: [0, 1]},
];

const my_net = initialize_network({
  n_inputs: my_data[0].obs.length,
  n_hidden: 2,
  n_outputs: my_data[0].expected.length,
});

const {trained_network, train_errors} = train_network({
  network: my_net,
  train_data: my_data,
  learn_rate: 0.5,
  n_epochs: 10,
  print_progress: true,
});
