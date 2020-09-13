<template>
    <div class="box nf-item post">
        <row>
            <column class="column__ct_1  column__xs__ct_2 avatar">
                <img :src="gravatar">
            </column>
            <column class="column__ct_10  column__xs__ct_9">
                <span class="field username">{{ username }}</span>
                <span class="field time">{{ timestamp }}</span>               
            </column>
        </row>
        <row>
            <column class="column__ct_12">
                <template v-if="editable">
                    <input type="text" v-model="content">
                    <button class="submit" v-on:click="save">Save</button>
                </template>
                <template v-else>
                    <p>{{ content }}</p>
                </template>                
            </column>
        </row>
    </div>
</template>
<script>
import { fromAgo } from '@/utils'
export default {
    name: 'Post',
    props: ['post'],
    components: {                
        // Comment,
        // CommentBox,
        // PostMenu
    },
    methods: {
        handleEmitEvent: function(ev) {
            console.debug('handlingEmitEvent in Post component: ')
            this.$emit("emit-event", ev)
            switch(ev) {
                case 'edit':
                    this.edit()
                    break
                case 'delete':
                    this.delete()
                    break
                default:
                    break
            }
        },
        edit: function() {
            console.debug('editing post: ', this.post.id)
            this.editable = true
        },
        delete: function() {
            console.debug('deleting post: ', this.post.id)
            // TODO confirm and then remove from store
            this.$store.dispatch('deletePost', { postId: this.post.id })
            
        },
        save: function() {
            this.editable = false
            // get content from element and save it in
            this.$store.dispatch('updatePost', { postId: this.post.id, content: this.content })
        },
        cancel: function() {
            //revert changes
            this.content = this.post.content
            this.editable = false
        }
        
    },
    data() {
        return {
            content: null,
            editable: false,
            fromAgo(tstamp){
                return fromAgo(tstamp)
            }
        }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      },
      currentUserId() {
        return this.$store.getters.getCurrentUser.id
      },
      gravatar() {
        return this.post.user.gravatar
      },
      username() {
        return this.post.user.name
      },
      timestamp() {
        return fromAgo(this.post.timestamp)
      },
      userId() {
        return this.post.user.id
      },
      comments() {
        return this.post.comments
      },
      postId() {
        return this.post.id
      }
    },    
    mounted(){      
        this.content = this.post.content
    }
}
</script>
<style scoped> 
    .nf-item {
        position: relative;
    }

    .nf-item:not(:first-child):not(:last-child) {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .nf-item:first-child {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .nf-item:last-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .nf-item + .nf-item {
        margin-top: 0.25rem;
    }

   .nf-item p,
   .nf-item /deep/ p {        
        white-space: pre-wrap; /* in case user edits post / comment, this ensures that any line breaks are visible */
        font-family: 'Segoe UI Historic', 'Segoe UI', Helvetica, Arial, sans-serif;
        font-size: 1.5rem;
       
        /* this makes sure text is justified with proper spacing */
        text-align: justify;
        text-justify: distribute;
        text-align-last: left;        
    }

    .nf-item img {
        border-radius: 150px;
        border: 1px solid #aaa;
        /* box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2); */
        width: 100%;
    }

    .nf-item .avatar {
        max-width: 60px;
        padding-right: 0;
    }

    .nf-item .column {
        flex-basis: auto;
    }
    .nf-item .column .field,
    .nf-item .column /deep/ .field {
        display: block;
        width: 100%;
        float: left;
        text-align: left;
    }    

    .nf-item .row {
        display: flex;
    }

    .nf-item .time,
    .nf-item /deep/ .time {
        font-size: 1.2rem;
    }

    .nf-item .username,
    .nf-item /deep/ .username {
        color: steelblue;
    }

    .controls {
        top: 0;
        right: 0;
    }

    p[contenteditable="true"] {
        border: 1px solid #aaa;
        padding: 0.5em;
        white-space: pre-wrap;
    }

    .commentbox__container,
    .comment__container {
        padding: 0;
    }

    
</style>