import Vue from 'vue'
import Vuex from 'vuex'

import getDefaultState from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state: getDefaultState(),
    mutations,
    actions
})



