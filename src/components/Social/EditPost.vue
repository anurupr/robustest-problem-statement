<template>
 <modal v-model="show" title="Edit Post">     
     <template v-if="post != null">
        <Post :post="post" :editable="true" />
     </template>
 </modal>
</template>
<script>
import Post from '@/components/Social/Post'
import { mapActions, mapState } from 'vuex'
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
        ...mapState([
            'isLoading'
        ])
    },
    methods: {
        // array notation is used when the name and mapping are the same
        ...mapActions([
            'modalVisible',
            'getPost'
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
        // get post using api is more preferred
        // if we get post from state , it will work only when the parent component is loaded first
        // this is also best practice
        this.post = await this.getPost(this.$route.params.id)        
        // show modal only if post is loaded
        // error handling is done in action
        if (this.post != null)
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
