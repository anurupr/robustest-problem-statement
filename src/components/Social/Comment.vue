<template>
    <v-card elevation="0" class="nf-item comment align-start">
        <v-row class="m-width-100">
            <v-col cols="3"
                lg="1"
                md="1">
                <v-avatar size="50px">
                    <v-img :src="gravatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="9" sm="9" md="11" lg="11">
                <v-col class="content pt-0">
                    <v-col class="d-flex flex-column align-start py-1 px-0">
                        <span class="field username">{{ username }}</span>
                        <span class="field time">{{ timestamp }}</span>
                    </v-col>                
                    <v-col class="pa-0 pt-2">
                        <template v-if="editable">
                            <input type="text" v-model="content">
                            <v-card-actions class="pa-0">
                                <v-btn color="primary" v-on:click="save">Save</v-btn>                                
                            </v-card-actions>
                        </template>
                        <template v-else>
                            <p class="mb-0">{{ content }}</p>
                        </template>
                    </v-col>
                </v-col>
            </v-col>
        </v-row>
        <template v-if="!editable && isLoggedIn && userId == currentUserId">
            <v-card-actions class="nf-item-float-menu">
                <CommentMenu :postId="postId" :commentId="commentId" />
            </v-card-actions>
        </template>        
    </v-card>
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
        /* padding: 1rem; */
        padding: 0;
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
        font-size: 0.9rem;
        color: #666;
    }

    .nf-item.comment p {
        font-size: 1.1rem;
    }

    .m-width-100 {
        max-width: 100%;
    }

</style>