import * as types from './mutation_types'
import getDefaultState from './state'

export default {
    [types.SET_LOADING]: (state, isLoading) => {
        state.isLoading = isLoading
    },
    [types.RESET_STATE]: (state) => Object.assign(state, getDefaultState()),
    [types.LOGIN_SUCCESS]: (state, { user }) => {
        state.isLoggedIn = true;
        state.currentUser = user;
    },
    [types.LOGIN_FAILURE]: (state) => {
        state.isLoggedIn = false;
    },
    [types.LOGIN_FAILURE]: (state) => {
        state.isLoggedIn = false;
    }
}