import activation_func from './activation_func';

test('properly relus', () => {
  expect(activation_func('relu', -1)).toEqual(0);
  expect(activation_func('relu', 31)).toEqual(31);
});

test('properly returns derivative of sigmoid', () => {
  expect(activation_func('sigmoid', 3)).toBeCloseTo(0.9525741);
  expect(activation_func('sigmoid', -1)).toBeCloseTo(0.2689414);
});

const sigmoid = activation_func('sigmoid');
test('curries properly', () => {
  expect(sigmoid(4)).toEqual(activation_func('sigmoid', 4));
});
