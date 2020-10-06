<template>
 <modal v-model="show" title="Edit Comment">
     <template v-if="post != null && comment != null">
        <Comment :post="post" :comment="comment" :editable="true" :modal="true" />
     </template>
 </modal>
</template>
<script>
import Comment from '@/components/Social/Comment'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'EditPost', 
    components: {
        Comment
    },
    data() {
        return {
            post: null,
            comment: null,
            show: false
        }
    },
    methods: {
        ...mapActions([            
            'modalVisible',
            'getPost',
            'getComment'
        ]),
        showModal() {
            this.show = true
            this.modalVisible(this.show)
        },
        hideModal() {
            this.show = false
            this.modalVisible(this.show)
        }
    },
    async mounted() {
        // get post and comment from api
        this.post = await this.getPost(this.$route.params.postId)
        console.log('this.post', this.post)        
        this.comment = await this.getComment(this.$route.params.id)
        console.log('this.comment', this.comment)
        // show modal only if post and comment is retrieved
        if (this.post != null && this.comment != null)
            this.showModal()        
    },
    beforeRouteLeave (to, from, next) {
      this.hideModal()
      // called when the route that renders this component is about to
      // be navigated away from.
      // has access to `this` component instance.
      next()
    }
}
</script>