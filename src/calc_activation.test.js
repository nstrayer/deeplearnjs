import calc_activation from './calc_activation';

const weights = [1, 2, 3, 4, 5];
const inputs1 = [1, 1, 1, 1];
const inputs2 = [0, 0, 0, 0];

test('properly activates, yo', () => {
  expect(calc_activation(weights, inputs1)).toEqual(15);
  expect(calc_activation(weights, inputs2)).toEqual(5);
});

