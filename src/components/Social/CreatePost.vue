<template>
    <modal :show="showModal">
        <PostBox />
    </modal>
</template>

<script>
import PostBox from "@/components/Social/PostBox"
export default {
    name: 'CreatePost',
    components: {
        PostBox
    },
    data() {
        return { 
            showModal: false
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal
            this.$store.dispatch('modalVisible', this.showModal)
        }
    },
    mounted(){        
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