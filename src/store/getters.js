import * as utils from '@/utils'

export default {
    getCurrentUser: () => {
        // this should use the auth handler to get the correct user
        // since it is a static app, we are using a static object
        return {
            id: 1,
            username: 'rtester',
            name: 'Robus Tester',
            email: 'robustester@gmail.com',
            location: 'Bangalore, India',
            gravatar: utils.cgravatar('robustester@gmail.com')
        };
    },    
    getPost: (state) => (id) => {                
        return state.posts.find(p => p.id ==id)
    },
    getPostIndex: (state) => (postId) => {
        return state.posts.findIndex(p => p.id == postId)
    },    
    getCommentIndex: () => (post, commentId) => {        
        if (post)
            return post.comments.findIndex(c => c.id == commentId)
        else 
            return -1
    },
    getComment: (state) => (postId, commentId) => {        
        const postIndex = state.posts.findIndex(p => p.id == postId)        
        return state.posts[postIndex].comments.find(c => c.id == commentId)
    },
    getCommentsForPostId: (state) => (postId) => state.comments.filter(c => c.postId == postId),
    getNotifIndex: (state) => (notifId) => state.notifications.find(n => n.id == notifId)
}