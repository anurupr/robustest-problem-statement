<template>
    <div class="row">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Row'
}
</script>
<style scoped>
    .row {
        width: 100%;
    }
</style>