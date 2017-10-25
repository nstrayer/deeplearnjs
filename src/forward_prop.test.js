import forward_prop from './forward_prop';
import initialize_network from './initialize_network/initialize_network';

const start_net = initialize_network({
  n_inputs: 2,
  n_hidden: 2,
  n_outputs: 2,
});
const forward_step = forward_prop(start_net, [1, 0]);

test('start network is un-activated', () => {
  expect(start_net[0][0].activation).toBeNull();
  expect(start_net[0][0].output).toBeNull();
});

test('forward propped network is activated', () => {
  expect(forward_step[0][0].activation).not.toBeNull();
  expect(forward_step[0][0].output).not.toBeNull();
});
