import {curry} from 'lodash';

/**
 * takes an input (an activation) and applies a non-linear transform to it.
 * @param {string} type - name of your activation function ('relu', or 'sigmoid' currently.)
 * @param {number} x - value you want applied
 * @return {number} - the transformed value.
 */
const activation_func = curry(function(type, activation) {
  switch (type) {
    case 'relu':
      return activation > 0 ? activation : 0;
    case 'sigmoid':
      return 1 / (1 + Math.exp(-activation));
    default:
      return activation;
  }
});

module.exports = activation_func;
