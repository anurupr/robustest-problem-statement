<template>
    <v-card class="nf-item post" :class="{ 'pa-2': $vuetify.breakpoint.mobile }">
        <v-row  class="m-width-100">
            <v-col
                cols="3"
                lg="1"
                md="1"
                :class="{ 'pl-4': $vuetify.breakpoint.mobile }"
            >
                <v-avatar size="60px">
                    <v-img :src="gravatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="9" sm="9" md="11" lg="11" class="pl-6">
                <v-col class="d-flex flex-column align-start py-1 px-0">
                    <span class="field username">{{ username }}</span>
                    <span class="field time">{{ timestamp }}</span>                    
                </v-col>
            </v-col>
        </v-row>
        <v-row class="m-width-100" :class="{ 'pa-1': $vuetify.breakpoint.mobile }" >
            <v-col cols="12" :class="{ 'mx-auto': editable }">
                <template v-if="editable">
                    <input type="text" v-model="content">                    
                    <v-card-actions>
                        <v-btn color="primary" v-on:click="save">Save</v-btn>                                
                    </v-card-actions>
                </template> 
                <template v-else>
                    <p class="my-0">{{ content }}</p>
                </template>                
            </v-col>
        </v-row>
        <template v-if="isLoggedIn && !editable">
            <v-row no-gutters class="m-width-100">
                <!-- Remove padding when in mobile mode and only top padding in regular  --- gives more space for elements -->
                <v-col cols="12" class="commentbox__container pt-0">
                    <CommentBox :postId="postId" />
                </v-col>
            </v-row>            
        </template>
        <template v-if="comments.length > 0 && !editable">
            <hr class="separator" />            
            <v-row>
                <v-col cols="12" class="comment__container">
                    <Comment v-for="comment in comments" :key="'comment-' + comment.id" :comment="comment" :post="post"></Comment>
                </v-col>
            </v-row>
        </template>
        <template v-if="!editable && isLoggedIn && userId == currentUserId">
            <v-card-actions class="nf-item-float-menu" :class="{ 'pa-0': $vuetify.breakpoint.mobile, 'push-down': $vuetify.breakpoint.mobile }"> 
                <PostMenu :postId="postId" />
            </v-card-actions>
        </template>
    </v-card>
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
            console.log('this.$route.path', this.$route.path)
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
<style>
    /* to give the post menu an absolute position on the top right . instead of the regular position . looks much better */
    .nf-item-float-menu {
        position: absolute;
        top: 0;
        right: 0;
    }
    
    .push-down-1 {
        top: 1rem;
    }
</style>
<style scoped> 
    .nf-item {
        position: relative;
        padding: 0rem 1rem;
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

   
   .nf-item /deep/ p {        
        white-space: pre-wrap; /* in case user edits post / comment, this ensures that any line breaks are visible */
        /* font-family: 'Segoe UI Historic', 'Segoe UI', Helvetica, Arial, sans-serif; */
        
       
        /* this makes sure text is justified with proper spacing */
        text-align: justify;
        text-justify: distribute;
        text-align-last: left;     
        /* padding: 0px 12px; */
    }

    /* .nf-item p {
        font-size: 1.2rem;
    }    */
    
    .nf-item .time {        
        color: grey;
    }

    .nf-item .username {
        color: steelblue;
    }
   
    .nf-item input[type=text] {
        border: 1px solid #aaa;
        width: 100%;
        min-height: 40px;
        margin: 1rem auto;
    }

    .m-width-100 {
        max-width: 100%;
    }

    
</style>