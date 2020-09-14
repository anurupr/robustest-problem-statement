import Posts from "@/api/Posts";
export default {
    
    setLoading({ commit }) {        
        commit('SET_LOADING', true)
    },
    resetLoading({ commit }) {
        commit('SET_LOADING', false)
    },
    loginSuccess({ commit }, { user }) {
        commit('LOGIN_SUCCESS', { user })
    },
    loginFailure({ commit }) {
        commit('LOGIN_FAILURE')
    },
    logout({ commit }){        
        commit('RESET_STATE')        
    },
    async loginRequest({ commit, dispatch, getters }, { username, password }) {        
        dispatch('setLoading')
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                dispatch('resetLoading')
                // static check
                // this should be an api call
                if (username == "test" && password == "test") {
                    // here user should be the user object returned by the api
                    // response. since it is a static check, we are using
                    // pre-defined object.
                    commit('LOGIN_SUCCESS', { user: getters.getCurrentUser })
                    resolve("Success!")
                } else {
                    commit('LOGIN_FAILURE')
                    reject("Invalid Username/Password")
                }
            }, 500);
        })
    },
    loadPosts({commit, dispatch}) {
        dispatch('setLoading');
        Posts.getPosts()
        .then((json) => {            
            commit('SAVE_POSTS', json);
            dispatch('resetLoading');
        }).catch(error => {
            throw new Error(`API ${error}`);
        });
    },
    async addPost({ commit } , { post }) {
        Posts.createPost({ post })
        .then(() =>  {
            commit('POST_ADD', post)
        }).catch(error => {
            throw new Error(`API ${error}`)
        })
    }
  }