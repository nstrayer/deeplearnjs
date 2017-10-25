import {emptyArr, vsub, sum} from 'statdists';
import forward_prop from './forward_prop';
import back_prop from './back_prop';
import update_weights from './update_weights';
import get_prediction from './get_prediction';

/**
 * Takes a setup network, some training data and performs mini-batch stochastic gradient descent on the network.
 * @param {object} params - object for configuring training instance
 * @param {object[]} params.network - network constructed using library functions. 
 * @param {object[]} params.train_data - network constructed using library functions. 
 * @param {number} params.learn_rate - scaler for sgd learning rate.
 * @param {number} [params.n_epochs = 25] - number of times we train on entire data. 1 epoch = 1 run through all observations.
 * @param {boolean} [params.print_progress = true] - display loss output as model trains?
 * @return {object} - returns an object with key network or trained network and train_errors of a vector of training error for each epoch.
 */
function train_network(params) {
  const {
    network,
    train_data,
    learn_rate,
    n_epochs = 25,
    print_progress = true,
  } = params;

  let trained_network = [...network];

  const train_errors = emptyArr(n_epochs).reduce((errors, _, epoch) => {
    let sum_error = 0;

    train_data.forEach(({obs, expected}) => {
      const forward_step = forward_prop(trained_network, obs);
      const back_step = back_prop(forward_step, expected);
      const update_step = update_weights(back_step, obs, learn_rate);

      // check performance of network
      const predictions = get_prediction(forward_step);
      const squared_differences = vsub(expected, predictions).map((diff) =>
        Math.pow(diff, 2)
      );

      sum_error += sum(squared_differences);

      // update network
      trained_network = update_step;
    });

    if (print_progress) {
      console.log(`-------------------
Epoch: ${epoch + 1} | Error: ${sum_error.toPrecision(4)}`);
    }

    return [...errors, sum_error];
  }, []);

  return {trained_network, train_errors};
}

module.exports = train_network;
