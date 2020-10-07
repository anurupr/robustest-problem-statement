<template>
    <v-card elevation="0" class="nf-item comment align-start pa-0">
        <v-row class="m-width-100 ma-0">
            <v-col cols="3"
                lg="1"
                md="1">
                <v-avatar size="50px">
                    <v-img :src="gravatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="9" sm="9" md="11" lg="11" class="content-container" :class="{ 'pa-0': $vuetify.breakpoint.mobile }">
                <v-col class="content pt-0">
                    <v-col class="d-flex flex-column align-start py-1 px-0">
                        <span class="field username">{{ username }}</span>
                        <span class="field time">{{ timestamp }}</span>
                    </v-col>                
                    <v-col class="pa-0 pt-2">
                        <template v-if="editable">
                            <v-text-field placeholder="Enter comment" :rules="contentRules" type="text" v-model="content"></v-text-field>
                            <v-card-actions class="pa-0">
                                <v-btn color="primary" :disabled="!valid" :loading="loading" v-on:click="save">Save</v-btn>
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
    data() {
        return {
            contentRules: [
                v => !!v || "Comment cannot be empty"
            ],
            loading: false
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
        save: async function() {           
            if(this.valid) {
                this.loading = true
                await this.updateComment({ postId: this.postId, comment: this.comment })
                this.loading = false
                if (this.$route.path !== '/')
                    this.$router.push('/')            
            }
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
      },
      valid() {
          return this.content != null && this.content.length > 0
      }  
    }
}
</script>
<style scoped>

    .nf-item.comment .content {
        background: #f8f8f8;
        position: relative;
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

    
</style>