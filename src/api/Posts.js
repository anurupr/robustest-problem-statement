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
    deletePost(post) {
        return api.req(`/posts/${post.id}`, api.buildDeleteParams()).then(api.jsonResponse)
    },
    updatePost(post) {
        return api.req(`/posts/${post.id}`, api.buildPutParams(post)).then(api.jsonResponse)
    },
    createComment(post) {
        return this.updatePost(post);
    },
    deleteComment(post) {        
        return this.updatePost(post);
    },
    updateComment(post) {
        return this.updatePost(post);
    }
}