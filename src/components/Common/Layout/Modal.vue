<template> 
    <transition name="fade">
        <div class="modal" v-show="show" :style="{width: width +'px', height: height +'px'}" @click.self="closeModal">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {            
            width: window.innerWidth,
            height: window.innerHeight
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
<style scoped>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 0 auto;
        background: rgba(0,0,0,0.4);
        z-index: 99999;
        padding: 2rem;
    }
</style>