<template>
<!-- :class="{ modaled: modal }" -->
    <div class="box nf-item comment" >
        <row>
            <column class="column__ct_1 column__xs__ct_2 avatar">
                <img :src="gravatar">
            </column>
            <column class="column__ct_10 column__xs__ct_9 ">
                <column class="column__ct_12 content meta">
                    <column class="column__ct_12 meta">
                        <span class="field username">{{ username }}</span>
                        <span class="field time">{{ timestamp }}</span>
                        <template v-if="!editable && isLoggedIn && userId == currentUserId">
                            <CommentMenu :postId="postId" :commentId="commentId" />
                        </template>
                    </column>                
                    <column class="column__ct_12 meta">
                        <template v-if="editable">
                            <input type="text" v-model="content">
                            <button class="btn primary" v-on:click="save">Save</button>
                        </template>
                        <template v-else>
                            <p>{{ content }}</p>
                        </template>
                    </column>                                     
                </column>
            </column>
        </row>
        
    </div>
</template>
<script>
import CommentMenu from '@/components/Social/CommentMenu'
import { fromAgo } from '@/utils'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    name: 'Comment',
    props: {
        comment: {
            type: Object           
        },
        editable: {
            type: Boolean,
            default: false
        },
        modal: {
            type: Boolean,
            default: false
        }
    },
    components: {
       CommentMenu
    },
    methods: {
         ...mapActions([
            'deleteComment',
            'updateComment',
            'modalVisible'
        ]),
        delete: function() {
            this.deleteComment({ postId: this.postId , commentId: this.commentId })
        },
        save: function() {           
            // get content from element and save it in 
            this.updateComment({ postId: this.postId, comment: this.comment })
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
      commentId() {
          return this.comment.id
      },
      postId() {
          return this.comment.postId
      },
      currentUserId() {
        return this.getCurrentUser.id
      },
      gravatar() {
        return this.comment.user.gravatar
      },
      username() {
        return this.comment.user.name
      },
      userId() {
        return this.comment.user.id
      },
      timestamp() {
        return fromAgo(this.comment.timestamp)
      },
      content: {
          get() {
            return this.comment.content
          },
          set(content) {            
            this.comment.content = content
          }
      }      
    }
}
</script>
<style scoped>    
    .nf-item.comment {
        box-shadow: none;
        float: left;
        width: 100%;
        padding: 1rem;
    } 

    .nf-item.comment .content {
        background: #f8f8f8;
        position: relative;
    }

    .nf-item img {
        border-radius: 150px;
        border: 1px solid #aaa;
        /* box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2); */
        width: 100%;
    }

    .nf-item /deep/ img {
        width: 45px;
        height: 45px;
    }

    .controls {
        top: 0;
        right: 0;
    }

    .meta {
        flex-direction: column;
        align-items: flex-start;
    }

    .avatar {
        justify-content: center;
        align-content: center;
    }

    .nf-item.comment.modaled {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 50%;
        height: 20%;
    }

    .nf-item.comment .content input[type=text] {
        border: 1px solid #aaa;
        width: 100%;
        min-height: 40px;
        margin: 1rem auto;
    }

    .nf-item .username {
        color: steelblue;
    }

    .nf-item .time {
        font-size: 1.2rem;
    }

</style>