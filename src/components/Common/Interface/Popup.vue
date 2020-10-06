<template>
    <v-alert 
        :value="alert"
        :type="type"
        :icon="icon"
        transition="scale-transition"
        >
        {{ message }}
    </v-alert>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'Popup',
        props: {
            message: {
                type: String,
                required: true,
            },
            // success, error, warning
            type: {
                type: String,
                required: true,
            },
            // time to display in milliseconds
            timeout: {
                type: Number,
                default: 2000
            },
            id: {
                type: Number,
                required: true
            }
        },
        methods: {
            ...mapActions([
                'removeNotif'
            ]),
            removeNotification() {
                this.removeNotif(this.id)
            }
        },
        data() {
            return {
                alert: false
            }
        },
        mounted() {
            this.alert = true
        },
        created(){
            // start timeout
            const self = this
            setTimeout(function() {
                 self.alert = false
                 setTimeout(function() {
                     self.removeNotification()
                 },100)                 
            }, self.timeout)
        },
        computed: {
            // vuetify by default uses material framework, since we are using 
            // font awesome we need to get the correct icon based on the type
            icon() {
                let icon = 'fa-exclamation-circle'
                switch(this.type) {
                    case 'success': icon = 'fa-check'
                        break
                    case 'error': icon = 'fa-exclamation-triangle'
                        break
                    case 'info': icon = 'fa-exclamation-circle'
                        break
                    default: break
                }
                return icon
            }
        }
    };
</script>