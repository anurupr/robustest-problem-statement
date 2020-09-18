<template>
    <div class="nf" id="newsfeed">
        <Post v-for="post in posts" :key="post.id" :post="post"></Post>        
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Post from '@/components/Social/Post'
export default {
    name: 'NewsFeed',
    components: {
        Post
    },
    methods: {
        ...mapActions([
            'loadPosts'
        ])
    },
    computed: {
        ...mapState({
            posts: 'posts'
        })
    },
    mounted() {  
        this.$nextTick(() => {      
            this.loadPosts()
        })
    }
    
}
</script>
<style scoped>
    .nf {
        display: flex;
        flex-direction: column;
    }
</style>