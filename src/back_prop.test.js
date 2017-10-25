import initialize_network from './initialize_network/initialize_network';
import forward_prop from './forward_prop';
import back_prop from './back_prop';

const start_net = initialize_network({
  n_inputs: 2,
  n_hidden: 2,
  n_outputs: 2,
});
const forward_step = forward_prop(start_net, [1, 0]);
const back_step = back_prop(forward_step, [0, 1]);

test('start network is un-gradientized', () => {
  expect(start_net[0][0].error).toBeNull();
  expect(start_net[0][0].delta).toBeNull();
});

test('back propped network is gradientized', () => {
  expect(back_step[0][0].error).not.toBeNull();
  expect(back_step[0][0].delta).not.toBeNull();
});
