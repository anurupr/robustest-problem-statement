<template>
    <div class="progress-container" v-show="show">
        <div class="progress"></div>
        <img class="loader" :src="require('@/assets/loading.svg')" >
    </div>
</template>
<script>
export default {
    name: 'ActivityIndicator',
    props: ['visible'],
    computed: {
        // default show false
        show() {
            return this.visible || false;
        }
    }
}
</script>
<style scoped>
    .progress-container,
    .progress-container > * {
        position: fixed;
    }

    .progress {        
        top: 0px;
        left: 0px;
        right: 0px;
        height: 2px;
        width: 0%;
        -webkit-transition: width 0.2s, opacity 0.6s;
        transition: width 0.2s, opacity 0.6s;
        opacity: 1;
        background-color: #73ccec;
        z-index: 999999;
    }
    .loader {        
        top: .5rem;
        right: .5rem;
        max-width: 5rem;
        transition: opacity 0.6s;
    }

    @media screen and (max-width: 576px) {
        .loader {
            top: 1rem;
            right: 1rem;
            max-width: 3rem;
        }
    }

    
</style>