export default {
    setLoading({ commit }) {        
        commit('SET_LOADING', true)
    },
    resetLoading({ commit }) {
        commit('SET_LOADING', false)
    },
    loginSuccess({ commit }) {
        commit('LOGIN_SUCCESS');
    },
    loginFailure({ commit }) {
        commit('LOGIN_FAILURE');
    },
    logout({ commit }){
        commit('RESET_STATE')
    }
  }