import {combineReducers} from 'redux';

const learningRate = (state = 0.5, action) => {
  switch (action.type) {
    case 'CHANGE_LEARN_RATE':
      return action.rate;
    default:
      return state;
  }
};

const numberEpochs = (state = 10, action) => {
  switch (action.type) {
    case 'CHANGE_NUMBER_EPOCHS':
      return action.number;
    default:
      return state;
  }
};

const dnnApp = combineReducers({
  learningRate,
  numberEpochs,
});

export default dnnApp;
