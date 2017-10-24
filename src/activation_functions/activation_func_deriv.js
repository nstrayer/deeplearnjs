function activation_func_deriv(output, type) {
  switch (type) {
    case 'relu':
      return output > 0 ? 1 : 0;
    case 'sigmoid':
      return output * (1 - output);
    default:
      return output;
  }
}

module.exports = activation_func_deriv;
