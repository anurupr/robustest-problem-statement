<!-- Layout Header -->
<template>
    <header>        
            <Column class="logo column__ct_6 column__xs__ct_8">
                <div style="margin-right: auto; display: flex;">                
                    <img src="@/assets/logo.png" />
                    <span>feed.</span>
                </div>
            </Column>            
            <Column class="column__ct_6 column__xs__ct_3">
                <div style="margin-left: auto">
                    <Menu />
                </div>
            </Column>        
    </header>
</template>
<script>
import Menu from '@/components/Common/Navigation/Menu.vue'
import Column from "@/components/Common/Layout/Column"

export default {
    name: 'Header',
    components: {
        Menu,
        Column,        
    }
}
</script>
<style scoped>
    header {
        display: flex;
        padding: .5rem;
        width: 100%;
        margin-bottom: 2rem;
        min-height: 30px;
    }

    header  > * {
        float: left;
    }

    .logo {
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .logo img {
        vertical-align: middle;
        max-width: 64px;
    }
    
    .logo span {
        font-size: 3rem;
        font-family: 'Rowdies', cursive; 
        margin-left: 10px;
        font-weight:bold;
    }    
</style>