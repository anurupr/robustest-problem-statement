<template>
    <text-box :pholder="pholder" v-model="content">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    color="primary"
                    raised
                    elevation="1"
                    fab
                    v-bind="attrs"
                    v-on="on"
                    v-on:click="add"
                    :loading="loading"
                    >
                    <v-icon dark>
                        fa-comment
                    </v-icon>
                </v-btn>
            </template>
            <span>Comment</span>
        </v-tooltip>
    </text-box>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getutime } from '@/utils'
export default {
    name: 'CommentBox',
    props: {
        postId: {
            type: Number,
            required: true
        }
    },    
    methods: {
        ...mapActions({
          addComment: 'addComment',
          errorNotif: 'addErrorNotif'
        }),        
        add: async function() {
            if (this.valid) {
                var comment = {                    
                    content: this.content,
                    user : this.getCurrentUser,
                    timestamp: getutime(),
                    postId: this.postId            
                }
                this.loading = true
                await this.addComment({ postId: this.postId, comment })
                this.loading = false
                this.clear()
            } else {
                this.errorNotif({ message: 'Comment cannot be empty'})
            }
        },
        clear() {
            this.content = ""
        }
    },
    computed: {
        ...mapGetters([
            'getCurrentUser'
        ]),
        valid() {
            return this.content != null && this.content.length > 0
        }
    },
    data()  {
        return {             
            pholder: "Write a comment",
            content: "",
            loading: false
        }
    }
}
</script>