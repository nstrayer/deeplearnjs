import {createStore} from 'redux';
import dnnApp from './reducers/index';

export default function configureStore() {
  console.log('creating redux store!');
  return createStore(dnnApp);
}
