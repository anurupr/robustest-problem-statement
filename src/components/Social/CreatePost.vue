<template>
    <modal v-model="show" title="New Post">
        <PostBox />
    </modal>
</template>
<script>
import { mapActions } from 'vuex'
import PostBox from "@/components/Social/PostBox"
export default {
    name: 'CreatePost',
    components: {
        PostBox
    },
    data() {
        return { 
            show: false
        }
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
    mounted(){        
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