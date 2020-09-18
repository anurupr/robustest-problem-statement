<template>
 <modal :show="showModal">
     <template v-if="post != null">
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
            comment: null
        }
    },
    computed: {
        ...mapGetters([
            'getPost',
            'getComment'
        ])
    },
    methods: {
        ...mapActions([            
            'modalVisible'
        ]),
        toggleModal() {
            this.showModal = !this.showModal
            this.modalVisible(this.showModal)
        }
    },
    mounted() {
        this.post = this.getPost(this.$route.params.postId)
        this.comment = this.getComment(this.post.id, this.$route.params.id)
        this.toggleModal()        
    },
    beforeRouteLeave (to, from, next) {
      this.toggleModal()
      // called when the route that renders this component is about to
      // be navigated away from.
      // has access to `this` component instance.
      next()
    }
}
</script>