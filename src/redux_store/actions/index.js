export const changeLearningRate = (newRate) => ({
  type: 'CHANGE_LEARN_RATE',
  rate: newRate,
});

export const changeNumberEpochs = (newNumber) => ({
  type: 'CHANGE_NUMBER_EPOCHS',
  number: newNumber,
});
