<template>
    <v-card>
        <!-- https://github.com/vuetifyjs/vuetify/issues/8555 -->
        <!-- v-avatar under v-card loses border-radius -->
        <v-col
            cols="12"
            sm="12"
            md="12"
        >
            <v-avatar size="80px">
                <v-img :src="gravatar"></v-img>
            </v-avatar>
        </v-col>
        <v-card-title class="justify-center">{{ name }}</v-card-title>
        <v-card-subtitle class="text-center">{{ location }}</v-card-subtitle>
    </v-card>
    <!-- <div class="box" id="profile">
        <div><img  ></div>
        <span class="name">{{ name }}</span>
        <span class="location">{{ location }}</span>
    </div> -->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Profile',
    computed: {
        ...mapGetters([
            'getCurrentUser'
        ]),
        gravatar(){
            return this.user.gravatar
        },
        name() {
            return this.user.name
        },
        location() {
            return this.user.location
        },
        user() {
            return this.getCurrentUser
        }

    }
}
</script>
<style scoped>
    #profile {
        width: 100%;
    }

    #profile > span {
        display: block;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .name {        
        font-weight: bold;
        font-size: 2.5rem;        
    }

    #profile img {
        border-radius: 150px;
        border: 1px solid #aaa;       
        /* box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.2); */
        max-width: 120px;
    }
</style>