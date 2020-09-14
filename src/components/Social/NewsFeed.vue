<template>
    <div class="nf" id="newsfeed">
        <Post v-for="post in posts" :key="post.id" :post="post"></Post>        
    </div>
</template>
<script>
import { mapState } from 'vuex'
const Post = () => import('@/components/Social/Post')
export default {
    name: 'NewsFeed',
    components: {
        Post
    },
    computed: {
        ...mapState({
            posts: 'posts'
        })
    },
    mounted() {        
        this.$store.dispatch('loadPosts')
    }
    
}
</script>
<style scoped>
    .nf {
        display: flex;
        flex-direction: column;
    }
</style>