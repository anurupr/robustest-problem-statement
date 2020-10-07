<!-- Navigation Menu -->
<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text          
          v-bind="attrs"
          v-on="on"
          fab
        >
          <v-icon>fa-bars</v-icon>
        </v-btn>
      </template>
      <v-list>
        <!-- v-list-item extends router link properties , so it can use the same attributes -->
        <v-list-item class="create-post" key="create-post" link to="/create-post" v-if="isLoggedIn">
            <v-list-item-icon>
              <v-icon color="green" >fa-paper-plane</v-icon>
            </v-list-item-icon>
            <v-list-item-title>New Post</v-list-item-title>            
        </v-list-item>        
        <v-list-item class="logout" key="logout" link :to='{ name: "Logout" }' v-if="isLoggedIn">
            <v-list-item-icon>
              <v-icon color="primary">fa-sign-out</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>            
        </v-list-item>
        <v-list-item class="login" key="login" link :to='{ name: "Login" }' v-if="!isLoggedIn">
            <v-list-item-icon>
              <v-icon color="primary">fa-sign-in</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>    
</template>
<script>
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignInAlt, faSignOutAlt)
export default {
    name: 'Menu',
    computed: {
        ...mapState([
            'isLoggedIn'
        ])
    }
}
</script>