import forward_prop from './forward_prop';
import back_prop from './back_prop';

function train_network({
  network,
  train_data,
  learn_rate,
  n_epochs = 25,
  print_progress = true,
}) {
  const train_errors = sd.emptyArr(n_epochs).reduce((errors, _, epoch) => {
    let sum_error = 0;

    train_data.forEach(({obs, expected}) => {
      const forward_step = forward_prop(obs, network);
      const back_step = back_prop(expected, forward_step);
      const update_step = update_weights(obs, learn_rate, back_step);

      // check performance of network
      const predictions = get_prediction(forward_step);
      const squared_differences = sd
        .vsub(expected, predictions)
        .map((diff) => Math.pow(diff, 2));

      sum_error += sd.sum(squared_differences);

      // update network
      network = update_step;
    });

    if (print_progress) {
      console.log(`-------------------
Epoch: ${epoch + 1} | Error: ${sum_error.toPrecision(4)}`);
    }

    return [...errors, sum_error];
  }, []);

  return {network, train_errors};
}

module.exports = train_network;
