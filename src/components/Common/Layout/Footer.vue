<template>
    <div class="footer">
        Made with <span style="color: #e25555;">&#9829;</span> in <img :src="require('@/assets/vue_logo.png')" />
    </div>
</template>
<style scoped>
    .footer {
        position: fixed;
        bottom: 1rem;
        left: 0;
        right: 0;
        margin: auto;        
    }
    
    .footer img {
        max-width: 30px;
        vertical-align: middle;
    }
</style>