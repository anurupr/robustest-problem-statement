<template>
 <modal v-model="show" title="Edit Comment">
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
            comment: null,
            show: false
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
        showModal() {
            this.show = true
            this.modalVisible(this.show)
        },
        hideModal() {
            this.show = false
            this.modalVisible(this.show)
        }
    },
    mounted() {
        this.post = this.getPost(this.$route.params.postId)
        this.comment = this.getComment(this.post.id, this.$route.params.id)
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