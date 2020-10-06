import api from '@/api/'

export default {
    getPosts() {
        return api.req('/posts').then(api.jsonResponse)
    },
    getPost(id) {
        return api.req(`/posts/${id}`).then(api.jsonResponse)
    },
    getUser(id) {
        return api.req(`/user/${id}`).then(api.jsonResponse)
    },
    createPost(post) {
        return api.req('/posts', api.buildPostParams(post)).then(api.jsonResponse)
    },
    deletePost(postId) {
        return api.req(`/posts/${postId}`, api.buildDeleteParams()).then(api.jsonResponse)
    },
    updatePost(post) {
        return api.req(`/posts/${post.id}`, api.buildPutParams(post)).then(api.jsonResponse)
    },
    getComments(postId) {
        return api.req(`/posts/${postId}/comments`).then(api.jsonResponse)
    },
    getComment(commentId) {
        return api.req(`/comments/${commentId}`).then(api.jsonResponse)
    },
    createComment(comment) {
        return api.req(`/comments`, api.buildPostParams(comment)).then(api.jsonResponse)
    },
    deleteComment(commentId) {        
        return api.req(`/comments/${commentId}`, api.buildDeleteParams()).then(api.jsonResponse)
    },
    updateComment(comment) {
        return api.req(`/comments/${comment.id}`, api.buildPutParams(comment)).then(api.jsonResponse)
    }
}