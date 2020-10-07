import Posts from "@/api/Posts"
import { sleep } from '@/utils'
export default {
    setInit({ commit }) {
        commit('SET_INIT')
    },
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
    async logout({ commit, dispatch }){
        dispatch('setLoading')
        // simulate delay
        await sleep(500)

        commit('LOGOUT')
        
        dispatch('resetLoading')
    },    
    async loginRequest({ commit, dispatch, getters }, { username, password }) {        
        dispatch('setLoading')

        // simulate delay
        await sleep(1000)
        
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
        } else {
            commit('LOGIN_FAILURE')
            dispatch('addNotif', { 
                type: "error",
                message: "Invalid Username/Password"
            })            
        }           
    },
    async loadPosts({ commit, dispatch }) {
        dispatch('setLoading')

        // simulate delay
        await sleep(200)

        const posts = await Posts.getPosts()
        try {        
            commit('SAVE_POSTS', posts)
            dispatch('resetLoading')
        } catch(error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error getting posts. Try reloading the page"
            })
            console.log('error', error)
        }
    },    
    async loadComments({ commit, dispatch, getters }, postId) {        
        dispatch('setLoading')
        const postIndex = getters.getPostIndex(postId)
        
        // simulate delay
        await sleep(200)

        try {
            const comments = await Posts.getComments(postId)
            commit('SAVE_COMMENTS', { postIndex, comments })
            dispatch('resetLoading')
        } catch(error) {        
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error getting comments. Try reloading the page"
            })
            console.log('error', error)
        }
    },
    async addPost({ commit, dispatch } , post) {
        dispatch('setLoading')

        // simulate delay
        await sleep(1000)

        // no need to send comments back to api as part of post
        // since there is a separate path for comments

        const {comments, ... rest}  = post        
        console.log('comments', comments)

        try {
            const newPost = await Posts.createPost( rest )            
            dispatch('resetLoading')
            commit('POST_ADD', newPost)
            dispatch('addNotif', { 
                type: "success",
                message: "Post Created"
            })
        } catch(error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error creating post"
            })
            console.log('error', error)
        }
    },
    async getPost({ dispatch }, postId) {
        let post = null

        // simulate delay
        await sleep(500)

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

        // simulate delay
        await sleep(500)

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
    async updatePost({ commit, dispatch, getters }, post) {
        dispatch('setLoading')

        // simulate delay
        await sleep(1000)

        const postIndex = getters.getPostIndex(post.id)
        const {comments, ... rest}  = post
        console.log('comments', comments)
        try {
            await Posts.updatePost( rest )        
            dispatch('resetLoading')
            commit('POST_UPDATE', { postIndex , content: post.content })
            dispatch('addNotif', { 
                type: "success",
                message: "Post Updated"
            })
        }catch(error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error updating post. Please try again"
            })
            console.log('error', error)
        }
    },
    async deletePost({ commit, dispatch, getters }, postId) {   
        dispatch('setLoading')  

        // simulate delay
        await sleep(1000)

        const postIndex = getters.getPostIndex(postId)

        await Posts.deletePost( postId )
        try {
            dispatch('resetLoading')
            commit('POST_DELETE', { postIndex  })
            dispatch('addNotif', { 
                type: "success",
                message: "Post Deleted"
            })
        } catch(error) {            
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error deleting post. Please try again"
            })
            console.log('error', error)
        }
    },    
    async addComment({ commit, dispatch, getters } , { postId, comment }) {
        dispatch('setLoading')
        const postIndex = getters.getPostIndex(postId)

        // simulate delay
        await sleep(1000)

        try {
            const newComment = await Posts.createComment( comment )
            dispatch('resetLoading')
            commit('COMMENT_ADD', { postIndex, comment: newComment })
            dispatch('addNotif', { 
                type: "success",
                message: "Comment Added"
            })
        } catch(error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error adding comment. Please try again"
            })
            console.log('error', error)
        }
    },
    async updateComment({ commit, dispatch, getters }, { postId, comment }) {
        dispatch('setLoading')

        // simulate delay
        await sleep(1000)

        const postIndex = getters.getPostIndex(postId)        
        const post = getters.getPost(postId)
        const commentIndex = getters.getCommentIndex(post, comment.id)

        try {
            await Posts.updateComment( comment )            
            dispatch('resetLoading')
            commit('COMMENT_UPDATE', { postIndex, commentIndex, comment })
            dispatch('addNotif', { 
                type: "success",
                message: "Comment Updated"
            })        
        } catch(error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error updating comment. Please try again"
            })
            console.log('error', error)
        }
    },
    async deleteComment({ commit, dispatch, getters}, { postId, commentId }) {
        dispatch('setLoading')   

        // simulate delay
        await sleep(1000)  

        const postIndex = getters.getPostIndex(postId)        
        const post = getters.getPost(postId)
        const commentIndex = getters.getCommentIndex(post, commentId)        
        try {
            await Posts.deleteComment( commentId )        
            dispatch('resetLoading')
            commit('COMMENT_DELETE', { postIndex, commentIndex })
            dispatch('addNotif', { 
                type: "success",
                message: "Comment Deleted"
            })
        } catch(error) {
            dispatch('resetLoading')
            dispatch('addNotif', { 
                type: "error",
                message: "Error deleting comment. Please try again"
            })
            console.log('error', error)
        }
    },
    modalVisible({ commit }, visible) {        
        commit('MODAL_VISIBLE', visible)
    }
  }