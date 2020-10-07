<template> 
    <transition name="fade">
        <v-dialog 
            :value="value" @input="$emit('input')"  
            :fullscreen="$vuetify.breakpoint.mobile"               
            transition="dialog-bottom-transition"            
            @click:outside="closeModal"
            eager
            :width="autoWidth ? 'auto' : 'unset'"
            >
            <template v-if="showToolBar">
                <v-toolbar
                dark
                color="primary"
                >
                    <v-btn
                        icon
                        @click="closeModal"
                    >
                        <v-icon>fa-window-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>                                
                </v-toolbar>
            </template>
            <slot></slot>
        </v-dialog>
    </transition>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
        },
        showToolBar: {
            type: Boolean,
            default: true
        },
        autoWidth: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        closeModal() {
            if (this.$route.path !== '/')
                this.$router.push('/')
        }
    }
}
</script>