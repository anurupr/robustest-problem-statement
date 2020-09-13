<!-- Home View -->
<template>
  <container>      
      <row>
          <!-- Profile -->
          <column class="column__ct_3 column__xs__ct_12 column__sm__ct_12 column__md__ct_12">
            <template v-if="isLoggedIn">
              <Profile />
            </template>            
          </column>
          <!-- Post Box + News Feed -->
          <column class="column__ct_6 column__xs__ct_12 column__sm__ct_12 column__md__ct_12">
            <template v-if="isLoggedIn">
              <PostBox />
            </template>
            <NewsFeed />
          </column>
      </row>
  </container>
</template>

<script>
import { mapState } from 'vuex'
import Profile from "@/components/User/Profile"
import NewsFeed from "@/components/Social/NewsFeed"
import PostBox from "@/components/Social/PostBox"

export default {
    name: 'Home',
    components: {
        Profile,
        NewsFeed,
        PostBox        
    },
    computed: {
        ...mapState({
            isLoggedIn: 'isLoggedIn'
        })
    }
}
</script>