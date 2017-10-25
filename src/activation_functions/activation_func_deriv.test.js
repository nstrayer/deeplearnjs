import activation_func_deriv from './activation_func_deriv';

test('properly returns derivative of relu', () => {
  expect(activation_func_deriv('relu', -1)).toEqual(0);
  expect(activation_func_deriv('relu', 31)).toEqual(1);
});

test('properly returns derivative of sigmoid', () => {
  expect(activation_func_deriv('sigmoid', 3)).toBeCloseTo(0.04517666);
  expect(activation_func_deriv('sigmoid', -1)).toBeCloseTo(0.1966119);
});

const sig_deriv = activation_func_deriv('sigmoid');
test('curries properly', () => {
  expect(sig_deriv(4)).toEqual(activation_func_deriv('sigmoid', 4));
});
