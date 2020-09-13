<template>
    <footer class="footer">
        Made with <span style="color: #e25555;">&#9829;</span> in <img :src="require('@/assets/vue_logo.png')" />
    </footer>
</template>
<style scoped>
    .footer {
        margin-top: 1rem;        
    }
    
    .footer img {
        max-width: 30px;
        vertical-align: middle;
    }
</style>