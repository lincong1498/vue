import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
    mutations,
    state,
    getters,
    actions,
    plugins:[createPersistedState()]
})