<template>
    <modal v-model="show" :showToolBar="false" :autoWidth="$vuetify.breakpoint.mobile">
        <v-card class="pa-5 text-center">
            <p class="pt-6">Are you sure you want to delete this comment?</p>
            <v-card-actions class="justify-center">
                <v-btn class="cancel" color="secondary" @click="cancel">Cancel</v-btn>
                <v-btn class="proceed" color="primary" @click="proceed">Proceed</v-btn>
            </v-card-actions>
        </v-card>        
    </modal>   
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'DeletePost',
    data() {
        return { 
            show: false
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