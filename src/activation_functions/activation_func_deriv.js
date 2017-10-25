// @ts-check

import activation_func from './activation_func';
import {curry} from 'lodash';

/**
 * Generates n random uniform values
 * @param {string} type - name of your activation function ('relu', or 'sigmoid' currently.)
 * @param {number} x - value you're calculating derivative with respect to.  
 * @return {number} - the derivative of your activation function with respect to x.
 */
const activation_func_deriv = curry(function(type, x) {
  switch (type) {
    case 'relu':
      return x > 0 ? 1 : 0;
    case 'sigmoid':
      const sig = activation_func('sigmoid', x);
      return sig * (1 - sig);
    default:
      return x;
  }
});

module.exports = activation_func_deriv;
