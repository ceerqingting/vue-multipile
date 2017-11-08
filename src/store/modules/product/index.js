import * as getters from './getters';
import * as actions from './actions';
import { mutations } from './mutations';
import store from '../../index';

const state = {
  description: 'hello world',
};


store.registerModule('product', {
  state,
  getters,
  mutations,
  actions,
});
export default store;

