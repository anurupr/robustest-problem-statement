<!-- Home View -->
<template>
  <v-main>
    <v-container fluid>
      <v-row>
          <!-- Profile -->
          <v-col
            xl="3"
            lg="3"
            md="12"
            sm="12"
            cols="12"
            :class="{ empty: !isLoggedIn }" >
            <template v-if="isLoggedIn">
              <Profile />
            </template>            
          </v-col>
          <!-- News Feed -->
          <v-col
            cols="12" 
            sm="12"
            md="12"
            lg="6"
            xl="6"
            :class="{ empty: posts.length === 0 }">
            <!-- <template v-if="isLoggedIn">
              <router-link to="/create-post" class='btn primary' exact>New Post</router-link>
            </template>           -->
            <router-view name="create-post" key='create-post' ></router-view>
            <router-view name="edit-post" key='edit-post' ></router-view>
            <router-view name="delete-post" key='delete-post' ></router-view>
            <router-view name="edit-comment" key='edit-comment' ></router-view>
            <router-view name="delete-comment" key='edit-comment' ></router-view>
            <NewsFeed />
          </v-col>
      </v-row>
    </v-container>
  </v-main>    
</template>

<script>
import { mapState } from 'vuex'
import Profile from "@/components/User/Profile"
import NewsFeed from "@/components/Social/NewsFeed"

export default {
    name: 'Home',
    components: {
        Profile,
        NewsFeed
    },
    computed: {
        ...mapState([
            'isLoggedIn',
            'posts'
        ])
    }
}
</script>

