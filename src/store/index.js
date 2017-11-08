import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { mutations } from './mutations';
import * as getters from './getters';
import * as actions from './actions';


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
const state = {
  title: 'hello world',
};

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger({ collapsed: true })] : [],
});

export default store;
