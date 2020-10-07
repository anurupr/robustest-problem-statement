<!-- Layout Header -->
<template>
    <!-- app prop ensures the v-app-bar uses the correct amount of space and keeps the layout proper -->
    <v-app-bar app elevate-on-scroll>
        <v-img
            class="pa-2 logo"
            src="@/assets/logo.png"
            max-height="80"
            max-width="80"
            contain
        ></v-img>      
        <v-toolbar-title class="logo-title">feed.</v-toolbar-title>
        <v-spacer></v-spacer>        
        <Menu />        
    </v-app-bar>
</template>
<script>
import Menu from '@/components/Common/Navigation/Menu.vue'

export default {
    name: 'Header',
    components: {
        Menu
    }
}
</script>
<style scoped>   
 .logo-title {
    font-family: 'Rowdies', cursive; 
    margin-left: 10px;
    font-weight:bold;
}

</style>