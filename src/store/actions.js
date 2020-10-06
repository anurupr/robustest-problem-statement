import Posts from "@/api/Posts"
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
        commit('LOGOUT')        
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
                    dispatch('addNotif', { 
                        type: "success",
                        message: "Logged in!"
                    })
                    resolve("Success!")
                } else {
                    commit('LOGIN_FAILURE')
                    dispatch('addNotif', { 
                        type: "error",
                        message: "Invalid Username/Password"
                    })
                    reject("Invalid Username/Password")
                }
            }, 500)
        })
    },
    loadPosts({ commit, dispatch }) {
        dispatch('setLoading')

        Posts.getPosts()
        .then((json) => {            
            commit('SAVE_POSTS', json)            
            dispatch('resetLoading')
        }).catch(error => {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error getting posts. Try reloading the page"
            })
            console.log('error', error)
        })
    },
    async addPost({ commit, dispatch } , post) {
        dispatch('setLoading')

        // no need to send comments back to api as part of post
        // since there is a separate path for comments

        const {comments, ... rest}  = post        
        console.log('comments', comments)
        Posts.createPost( rest )
        .then((newPost) =>  {
            dispatch('resetLoading')
            commit('POST_ADD', newPost)
            dispatch('addNotif', { 
                type: "success",
                message: "Post Created"
            })
        }).catch(error => {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error creating post"
            })
            console.log('error', error)
            
        })
    },
    addNotif({ commit }, { type, message }) {
        const notif = {
            // best method to get unix seconds, perfect for generating id
            // refer https://stackoverflow.com/a/221297/839456
            id: + new Date(),
            type,
            message
        }
        commit('NOTIFICATION_ADD', notif)
    },
    async getPost({ dispatch }, postId) {
        let post = null
        try {
            post = await Posts.getPost(postId)
            dispatch('resetLoading')
        } catch (error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error getting post"
            })
        }
        return post
    },
    async getComment({ dispatch }, commentId) {
        let comment = null
        try {
            comment = await Posts.getComment(commentId)
            console.log('comment', comment)
            dispatch('resetLoading')
        } catch (error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error getting comment"
            })
            console.error('error', error)
        }
        return comment
    },
    addSuccessNotif({ dispatch }, { message }) {
       dispatch('addNotif', { type: "success", message })  
    },
    addErrorNotif({ dispatch }, { message }) {
        dispatch('addNotif', { type: "error", message })  
    },
    addWarnNotif({ dispatch }, { message }) {
        dispatch('addNotif', { type: "warning", message })  
    },
    removeNotif({ commit, getters }, id ) {
        const notifIndex = getters.getNotifIndex(id)
        commit('NOTIFICATION_REMOVE', notifIndex)
    },
    updatePost({ commit, dispatch, getters }, post) {
        dispatch('setLoading')

        const postIndex = getters.getPostIndex(post.id)
        const {comments, ... rest}  = post
        console.log('comments', comments)

        Posts.updatePost( rest )
        .then(() =>  {
            dispatch('resetLoading')
            commit('POST_UPDATE', { postIndex , post })
            dispatch('addNotif', { 
                type: "success",
                message: "Post Updated"
            })
        }).catch(error => {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error updating post. Please try again"
            })
            console.log('error', error)
        })
    },
    deletePost({ commit, dispatch, getters }, postId) {   
        dispatch('setLoading')        

        const postIndex = getters.getPostIndex(postId)

        Posts.deletePost( postId )
        .then(() =>  {
            dispatch('resetLoading')
            commit('POST_DELETE', { postIndex  })
            dispatch('addNotif', { 
                type: "success",
                message: "Post Deleted"
            })
        }).catch(error => {
            
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error deleting post. Please try again"
            })
            console.log('error', error)
        })
    },
    updateComment({ commit, dispatch, getters }, { postId, comment }) {
        dispatch('setLoading')

        const postIndex = getters.getPostIndex(postId)        
        const post = getters.getPost(postId)
        const commentIndex = getters.getCommentIndex(post, comment.id)

        Posts.updateComment( comment )
        .then(() =>  {
            dispatch('resetLoading')
            commit('COMMENT_UPDATE', { postIndex, commentIndex, comment })
            dispatch('addNotif', { 
                type: "success",
                message: "Comment Updated"
            })
        }).catch(error => {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error updating comment. Please try again"
            })
            console.log('error', error)
        })
    },
    deleteComment({ commit, dispatch, getters}, { postId, commentId }) {
        dispatch('setLoading')      
        const postIndex = getters.getPostIndex(postId)        
        const post = getters.getPost(postId)
        const commentIndex = getters.getCommentIndex(post, commentId)        
        Posts.deleteComment( commentId )
        .then(() =>  {
            dispatch('resetLoading')
            commit('COMMENT_DELETE', { postIndex, commentIndex })
            dispatch('addNotif', { 
                type: "success",
                message: "Comment Deleted"
            })
        }).catch(error => {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error deleting comment. Please try again"
            })
            console.log('error', error)
        })
    },
    addComment({ commit, dispatch, getters } , { postId, comment }) {
        dispatch('setLoading')
        const postIndex = getters.getPostIndex(postId)
        Posts.createComment( comment )
        .then((newComment) =>  {
            dispatch('resetLoading')
            commit('COMMENT_ADD', { postIndex, comment: newComment })
            dispatch('addNotif', { 
                type: "success",
                message: "Comment Added"
            })
        }).catch(error => {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error adding comment. Please try again"
            })
            console.log('error', error)
        })
    },
    loadComments({ commit, dispatch, getters }, postId) {        
        dispatch('setLoading')
        const postIndex = getters.getPostIndex(postId)
        Posts.getComments(postId)
        .then((comments) => {
            console.log('comments', postIndex, comments)
            commit('SAVE_COMMENTS', { postIndex, comments })
            dispatch('resetLoading')            
        }).catch(error => {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error getting comments. Try reloading the page"
            })
            console.log('error', error)
        })        
    },
    modalVisible({ commit }, visible) {
        console.log('visible', visible)
        commit('MODAL_VISIBLE', visible)
    }
  }