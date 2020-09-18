<template>
 <modal :show="showModal">
     <template v-if="post != null">
        <Post :post="post" :editable="true" />
     </template>
 </modal>
</template>
<script>
import Post from '@/components/Social/Post'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'EditPost', 
    components: {
        Post
    },
    data() {
        return {
            post: null,
            showModal: false
        }
    },
    computed: {
        ...mapGetters([
            'getPost'
        ])
    },
    methods: {
        // array notation is used when the name and mapping are the same
        ...mapActions([
            'modalVisible'
        ]),
        toggleModal() {
            this.showModal = !this.showModal
            this.modalVisible(this.showModal)
        }
    },
    mounted() {
        this.post = this.getPost(this.$route.params.id)
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