<template>
    <div class="box nf-item post">
        <row>
            <column class="column__ct_1  column__xs__ct_2 avatar">
                <img :src="gravatar">
            </column>
            <column class="column__ct_10  column__xs__ct_9 meta">
                <span class="field username">{{ username }}</span>
                <span class="field time">{{ timestamp }}</span>
                <template v-if="!editable && isLoggedIn && userId == currentUserId">    
                    <PostMenu :postId="postId" />
                </template>
            </column>
        </row>
        <row>
            <column class="column__ct_12 meta">
                <template v-if="editable">
                    <input type="text" v-model="content">
                    <button class="btn primary" v-on:click="save">Save</button>
                </template>
                <template v-else>
                    <p>{{ content }}</p>
                </template>                
            </column>
        </row>
        <template v-if="isLoggedIn && !editable">
            <row>
                <column class="column__ct_12 commentbox__container">
                    <CommentBox :postId="postId" />
                </column>
            </row>            
        </template>
        <template v-if="comments.length > 0 && !editable">
            <hr class="separator" />            
            <row>
                <column class="column__ct_12 comment__container meta">
                    <Comment v-for="comment in comments" :key="'comment-' + comment.id" :comment="comment" :post="post"></Comment>
                </column>
            </row>
        </template>
    </div>
</template>
<script>
import { fromAgo } from '@/utils'
import Comment from '@/components/Social/Comment'
import CommentBox from '@/components/Social/CommentBox'
import PostMenu from '@/components/Social/PostMenu'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    name: 'Post',
    props: {
        post: {
            type: Object           
        },
        editable: {
            type: Boolean,
            default: false
        }
    },
    components: {                
        Comment,
        CommentBox,
        PostMenu
    },
    methods: {
        ...mapActions([
            'deletePost',
            'updatePost',
            'loadComments'
        ]),
        delete: function() {            
            this.deletePost({ postId: this.post.id })
            
        },
        save: function() {           
            // get content from element and save it in            
            this.updatePost(this.post)
            if (this.$route.path !== '/')
                this.$router.push('/')
        }
        
    },    
    computed: {
      ...mapState([
            'isLoggedIn'
      ]),
      ...mapGetters([
          'getCurrentUser'
      ]),
      currentUserId() {
        return this.getCurrentUser.id
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
        return this.post.comments || []
      },
      postId() {
        return this.post.id
      },
      content: {
          get() {
            return this.post.content
          },
          set(content) {
            this.post.content = content
          }
      } 
    },
      async mounted() { 
          // due to the async nature of vue's update queue, we need to wait until vue has finished updating
          // to call the next getComments action
          // this ensures that all comments for posts are loaded properly, otherwise a
          // quite erratic behaviour is observed
          // https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue
          // no need to call this in a editable post
          if (!this.editable) {
            await this.$nextTick()
            this.loadComments(this.post.id)
          }
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

    .nf-item .time {
        font-size: 1.2rem;
    }

    .nf-item .username {
        color: steelblue;
    }

    .controls {
        top: 0;
        right: 0;
    }

    .commentbox__container,
    .comment__container {
        padding: 0;
    }

    .meta {
        flex-direction: column;
        align-items: flex-start;
    }

    .avatar {
        justify-content: center;
        align-content: center;
    }

    .nf-item input[type=text] {
        border: 1px solid #aaa;
        width: 100%;
        min-height: 40px;
        margin: 1rem auto;
    }

    
</style>