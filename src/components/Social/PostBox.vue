<template>
    <text-box :pholder="pholder" v-model="content">
        <button class="submit" v-on:click="add">Post</button>
    </text-box>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getutime } from '@/utils';
export default {
    name: 'PostBox',
    methods: {
        ...mapActions({
            addPost: 'addPost',
            errorNotif: 'addErrorNotif'
        }),
        add: function() {
            if (this.content != "") {
                var post = {
                    content: this.content,
                    user : this.getCurrentUser,
                    timestamp: getutime(),
                    comments: []      
                }
                this.addPost(post);
                this.$router.push('/')
            } else {
                this.errorNotif({ message: 'Post cannot be empty'})
            }
        }
    },
    data()  {
        return {             
            pholder: "What's going on?",
            content: ""
        }
    },
    computed: {
        ...mapGetters([
            'getCurrentUser'
        ])
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