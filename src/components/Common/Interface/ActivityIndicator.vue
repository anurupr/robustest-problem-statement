<template>
    <div class="progress-container">     
        <img class="loader" :src="require('@/assets/loading.svg')" >
    </div>
</template>
<script>
export default {
    name: 'ActivityIndicator'
}
</script>
<style scoped>
    .progress-container,
    .progress-container > * {
        position: fixed;
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