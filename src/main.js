const d3 = Object.assign({}, require('d3'), require('d3-jetpack'));
import {rnorm, runif, emptyArr} from 'statdists';
import slid3r from './slid3r/main';

import configureStore from './redux_store/configure_store';

// REDUX INITIALIZATION
const appStore = configureStore();

import initialize_network from './initialize_network/initialize_network';
import train_network from './train_network';

// setup controls
const margins = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
};
const divWidth = document.getElementById('controls').offsetWidth;
const divHeight = 300;
const sliderWidth = divWidth * 0.8;
const sliderGap = 60;
// setup the vizc

const c = d3.conventions({
  parentSel: d3.select(`#controls`),
  totalWidth: divWidth,
  totalHeight: divHeight,
  margin: margins,
});

// slider for num of epochs
c.svg.selectAppend('g.numberEpochs').call(
  slid3r()
    .width(sliderWidth)
    .range([1, 250])
    .startPos(50)
    // .loc([sliderStarts, c.height - 4 * sliderGap])
    // .numTicks(0)
    .label('Number of training epochs')
    .onDone((newEpochs) => {
      console.log(newEpochs);
    })
);

c.svg.selectAppend('g.learningRate').call(
  slid3r()
    .width(sliderWidth)
    .range([0, 1])
    .startPos(0.25)
    .clamp(false)
    .loc([0, 1 * sliderGap])
    // .numTicks(0)
    .label('Learning rate')
    .onDone((newRate) => {
      console.log(newRate);
    })
);
const n = 50;
const myData = runif(n).map((d) => {
  const [x1, x2] = d > 0.5 ? rnorm(2, 0, 5) : rnorm(2, 10, 5);
  const category = d > 0.5 ? 1 : 0;
  return {x1, x2, category};
});

const plotInfo = [
  {
    x: myData.map((d) => d.x1),
    y: myData.map((d) => d.x2),
    marker: {
      size: 10,
      color: myData.map((d) => d.category),
    },
    mode: 'markers',
    type: 'scatter',
  },
];

Plotly.newPlot('rawData', plotInfo);

const train_data = myData.map((d) => ({
  obs: [d.x1, d.x2],
  expected: d.category === 0 ? [1, 0] : [0, 1],
}));

const my_net = initialize_network({
  n_inputs: train_data[0].obs.length,
  n_hidden: 5,
  n_outputs: train_data[0].expected.length,
});

const numEpochs = 50;
let trained_network;
let train_errors;

({trained_network, train_errors} = train_network({
  network: my_net,
  train_data: train_data,
  learn_rate: 0.01,
  n_epochs: numEpochs,
  print_progress: false,
}));

const trainPlotInfo = [
  {
    x: emptyArr(numEpochs).map((d, i) => i),
    y: train_errors,
    mode: 'lines',
    type: 'scatter',
  },
];

Plotly.newPlot('trainingPlot', trainPlotInfo);
