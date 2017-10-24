// general case activation function that contains a switch statement for which one we want to use
function activation_func(activation, type) {
  switch (type) {
    case 'relu':
      return activation > 0 ? activation : 0;
    case 'sigmoid':
      return 1 / (1 + Math.exp(-activation));
    default:
      return activation;
  }
}

module.exports = activation_func;
