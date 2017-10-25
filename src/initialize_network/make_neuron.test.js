import make_neuron from './make_neuron';

test('properly makes large neuron', () => {
  // I know this is not large. 
  const big_guy = make_neuron(100, 'relu', 'large');
  // we add a bias weight in there. 
  expect(big_guy.weights.length).toEqual(100 + 1);
  expect(Object.keys(big_guy)).toEqual([
    'weights',
    'activation',
    'output',
    'error',
    'delta',
    'act_func',
    'label',
  ]);
});

test('properly makes minimal neuron', () => {
  const little_guy = make_neuron(1, 'sigmoid', 'small');
  expect(little_guy.weights.length).toEqual(1 + 1);
  expect(little_guy.act_func).toEqual('sigmoid');
});
