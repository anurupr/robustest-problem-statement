import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import getDefaultState from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: getDefaultState(),
    mutations,
    actions,
    getters,
    plugins: [createPersistedState({
        paths: [
            'isLoggedIn',
            'currentUser'
        ]
    })]
})



