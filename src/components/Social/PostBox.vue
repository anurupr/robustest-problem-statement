<template>
    <text-box :pholder="pholder" v-model="content">
        <button class="submit" v-on:click="addPost">Post</button>
    </text-box>
</template>
<script>
import { getutime } from '@/utils';
export default {
    name: 'PostBox',
    methods: {
        addPost: function() {
            if (this.content != "") {
                var post = {
                    id: this.$store.getters.getLatestPostId,
                    content: this.content,
                    user : this.$store.getters.getCurrentUser,
                    timestamp: getutime(),
                    comments: []      
                }
                this.$store.dispatch('addPost', { post });
            } else {
                console.error('content = ""')
                // show error msg
            }
        }
    },
    data()  {
        return {             
            pholder: "What's going on?",
            content: ""
        }
    }
}
</script>
<style scoped>
.text__box .submit {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    background: #33a2ff;
    color: white;
    font-size: 15px;
    line-height: 20px;
    font-weight: bolder;
    cursor: pointer;        
}
</style>