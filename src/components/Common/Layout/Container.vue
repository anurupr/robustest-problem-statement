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
        padding: 0 15px;
    }

    @media screen and (max-width: 576px) {
        .container {
            padding: 0 5px;
        }
        
    }
</style>