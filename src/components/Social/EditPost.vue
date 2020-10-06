<template>
 <modal v-model="show" title="Edit Post">     
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
            show: false
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
        this.post = this.getPost(this.$route.params.id)
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