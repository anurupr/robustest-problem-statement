import Vue from 'vue'
import * as types from './mutation_types'
import getDefaultState from './state'

export default {
    [types.SET_LOADING]: (state, isLoading) => {
        state.isLoading = isLoading
    },
    [types.RESET_STATE]: (state) => Object.assign(state, getDefaultState()),
    [types.LOGOUT]: (state) => {
        state.isLoggedIn = false
    },
    [types.LOGIN_SUCCESS]: (state, { user }) => {
        state.isLoggedIn = true
        state.currentUser = user
    },
    [types.LOGIN_FAILURE]: (state) => {
        state.isLoggedIn = false
    },
    [types.LOGIN_FAILURE]: (state) => {
        state.isLoggedIn = false
    },
    [types.SAVE_POSTS]: (state, posts) => {
        // sort posts in descending order of timestamp
        posts.sort((a, b) => b.timestamp - a.timestamp)
        // can set directly since you are replacing the object in "posts"        
        state.posts = posts;
    },
    [types.POST_ADD]: (state,post) => {
        state.posts.unshift(post)
    },
    [types.NOTIFICATION_ADD]: (state, notif) => {        
        state.notifications.unshift(notif)
    },
    [types.NOTIFICATION_REMOVE]: (state, notifIndex) => {        
        state.notifications.splice(notifIndex, 1)
    },
    [types.POST_UPDATE]: (state, { postIndex, post }) => {        
        Vue.set(state.posts, postIndex, post)
    },
    [types.POST_DELETE]: (state, { postIndex }) => {        
        state.posts.splice(postIndex, 1)
    },
    [types.COMMENT_ADD]: (state, { postIndex, comment }) => {        
        state.posts[postIndex].comments.unshift(comment)
    },
    [types.COMMENT_UPDATE]: (state, { postIndex, commentIndex, comment }) => {        
        let p = state.posts[postIndex]
        p.comments[commentIndex] = comment
        state.posts[postIndex] = p
    },
    [types.COMMENT_DELETE]: (state, { postIndex, commentIndex }) => {          
        state.posts[postIndex].comments.splice(commentIndex, 1)
    },
    [types.SAVE_COMMENTS]: (state, { postIndex, comments }) => {    
        let p = state.posts[postIndex]
        // since we are not storing comments remotely in the server
        // as part of posts, comments property can be undefined
        // hence we need to set it using Vue to make it reactive
        if(typeof p.comments === 'undefined')
            Vue.set(p, 'comments', [])

        if (comments.length > 0) {
            comments.sort((a, b) => b.timestamp - a.timestamp)
            p.comments = comments
            Vue.set(state.posts, postIndex, p)
        }
    },
    [types.MODAL_VISIBLE]: (state, visible) => {
        state.isModalVisible = visible
    }
}