<template>
    <text-box :pholder="pholder" v-model="content">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" raised elevation="1" fab v-bind="attrs"
          v-on="on" v-on:click="add">
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
        add: function() {
            if (this.content != "") {
                var comment = {                    
                    content: this.content,
                    user : this.getCurrentUser,
                    timestamp: getutime(),
                    postId: this.postId            
                }
                this.addComment({ postId: this.postId, comment })
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
        ])
    },
    data()  {
        return {             
            pholder: "Write a comment",
            content: ""
        }
    }
}
</script>
<style scoped>
.box {
    box-shadow: none;
}

.text__box {
    margin: 0;
    padding: 0;
    width: 100%;
}


.text__box .submit {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    /* background: #33a2ff; */
    background: #65afec;
    color: white;
    font-size: 15px;
    line-height: 15px;
    font-weight: bolder;
    cursor: pointer;        
}

/* since text__box is used in parent components, its not able to find the right textarea for this component 
   using the /deep/ selector solves this issue */

.text__box /deep/ textarea {  
    
    background: #f6f6f6;
}

</style>
