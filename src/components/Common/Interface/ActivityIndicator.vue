<template>
    <v-progress-circular
      :size="40"
      color="primary"
      indeterminate      
    ></v-progress-circular>
</template>
<script>
export default {
    name: 'ActivityIndicator'
}
</script>
<style scoped>
    .v-progress-circular {
        top: 70px;
        right: 1em;
        position: fixed;
    }
</style>