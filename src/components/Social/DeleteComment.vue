<template>
    <modal :show="showModal">
        <row>
            <column class="column__ct_12 centered">
                <div class="box">
                    <p>Are you sure you want to delete this comment?</p>
                    <input class="btn secondary" type="button" @click="cancel" value="Cancel" />
                    <input class="btn primary" type="button" @click="proceed" value="Proceed" />
                </div>
            </column>
        </row>
    </modal>   
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'DeletePost',
    data() {
        return { 
            showModal: false
        }
    },    
    methods: {
        // array notation is used when the name and mapping are the same
        ...mapActions([
            'deleteComment',
            'modalVisible'
        ]),
        cancel() {
            if (this.$route.path !== '/')
                this.$router.push('/')
        },
        proceed() {
            this.deleteComment({ 
                postId: this.$route.params.postId,
                commentId: this.$route.params.id
            })
            if (this.$route.path !== '/')
                this.$router.replace('/')
        },
        toggleModal() {
            this.showModal = !this.showModal
            this.modalVisible(this.showModal)
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