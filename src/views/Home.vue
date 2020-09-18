<!-- Home View -->
<template>
  <container>      
      <row>
          <!-- Profile -->
          <column class="profile-container column__ct_3 column__xs__ct_12 column__sm__ct_12 column__md__ct_12" :class="{ empty: !isLoggedIn }" >
            <template v-if="isLoggedIn">
              <Profile />
            </template>            
          </column>
          <!-- News Feed -->
          <column class="main column__ct_6 column__xs__ct_12 column__sm__ct_12 column__md__ct_12" :class="{ empty: posts.length === 0 }">
            <template v-if="isLoggedIn">
              <router-link to="/create-post" class='btn primary' exact>New Post</router-link>
            </template>          
            <router-view name="create-post" key='create-post' ></router-view>
            <router-view name="edit-post" key='edit-post' ></router-view>
            <router-view name="delete-post" key='delete-post' ></router-view>
            <router-view name="edit-comment" key='edit-comment' ></router-view>
            <router-view name="delete-comment" key='edit-comment' ></router-view>
            <NewsFeed />
          </column>
      </row>
  </container>
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
<style scoped>

  .main {
    flex-direction: column;    
  }

  /* this ensures page layout is proper even when content hasn't loaded yet */
  .main,
  .profile-container {
    min-width: 30%;
  }
</style>

