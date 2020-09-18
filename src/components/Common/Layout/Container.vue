<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Container'
}
</script>
<style scoped>
    .container {
        padding: 15px;
        flex: 1 0 auto;
        width: 100%;
    }

    @media screen and (max-width: 576px) {
        .container {
            padding: 0 5px;
        }
        
    }
</style>