import initialize_network from './initialize_network';

test('properly makes a largish network', () => {
  // I know this is not large. 
  const big_net = initialize_network({
    n_inputs: 100,
    n_hidden: 50,
    n_outputs: 2,
  });

  // correct number of layers
  expect(big_net.length).toEqual(2);
  // correct number of nuerons in first layer
  expect(big_net[0].length).toEqual(50);
  // correct number of neurons in output layer
  expect(big_net[1].length).toEqual(2);
});
