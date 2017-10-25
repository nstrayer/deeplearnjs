import make_layer from './make_layer';

test('properly makes large layer', () => {
  // I know this is not large.
  const big_layer = make_layer(100, 50, 'relu', 'large');
  // we add a bias weight in there.
  expect(big_layer.length).toEqual(100);
  expect(Object.keys(big_layer[0])).toEqual([
    'weights',
    'activation',
    'output',
    'error',
    'delta',
    'act_func',
    'label',
  ]);
});

test('properly makes small layer', () => {
  const little_layer = make_layer(1, 2, 'sigmoid', 'small');
  expect(little_layer.length).toEqual(1);
  expect(little_layer[0].act_func).toEqual('sigmoid');
});
