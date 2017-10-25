import initialize_network from './initialize_network/initialize_network';
import forward_prop from './forward_prop';
import back_prop from './back_prop';
import update_weights from './update_weights';

const input = [2, 4];
const output = [0, 1];

const start_net = initialize_network({
  n_inputs: 2,
  n_hidden: 2,
  n_outputs: 2,
});
const forward_step = forward_prop(start_net, input);
const back_step = back_prop(forward_step, output);
const update_step = update_weights(back_step, input, 0.5);

test('weights between the start and end steps are different', () => {
  expect(start_net[0][0].weights).not.toEqual(update_step[0][0].weights);
});
