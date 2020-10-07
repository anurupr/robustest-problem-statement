<template>
    <v-card class="profile">
        <!-- https://github.com/vuetifyjs/vuetify/issues/8555 -->
        <!-- v-avatar under v-card loses border-radius -->
        <v-col
            cols="12"
            class="d-flex justify-center"
        >
            <v-avatar size="80px">
                <v-img :src="gravatar"></v-img>
            </v-avatar>
        </v-col>
        <v-card-title class="justify-center">{{ name }}</v-card-title>
        <v-card-subtitle class="text-center">{{ location }}</v-card-subtitle>
    </v-card>   
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