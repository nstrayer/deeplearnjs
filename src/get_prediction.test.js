import get_prediction from './get_prediction';
import forward_prop from './forward_prop';
import initialize_network from './initialize_network/initialize_network';

const start_net = initialize_network({
  n_inputs: 2,
  n_hidden: 2,
  n_outputs: 2,
});
const forward_step = forward_prop(start_net, [1, 0]);

test('wont get prediction of unactivated network', () => {
  expect(() => get_prediction(start_net)).toThrow();
});

test('will get prediction of activated network', () => {
  expect(get_prediction(forward_step).length).toEqual(2);
  expect(get_prediction(forward_step)[0]).not.toBeNull();
});
