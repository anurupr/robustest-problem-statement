<template>
  <v-app id="app" :class="{ hoverflow: isModalVisible }">    
    <Header />     
    <ActivityIndicator v-show="isLoading" />
    
    <div class="notifs-container">
      <popup v-for="notif in notifs" v-bind:key="notif.id" :id="notif.id" :message="notif.message" :type="notif.type" />
    </div>
    <router-view></router-view>    
    <Footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import ActivityIndicator from '@/components/Common/Interface/ActivityIndicator'
import Header from '@/components/Common/Layout/Header'
import Footer from '@/components/Common/Layout/Footer'


export default {
  name: 'App',
  components: {    
    ActivityIndicator,
    Header,
    Footer
  },
  computed: {
    ...mapState({
        isLoading: 'isLoading',
        notifs: 'notifications',
        isModalVisible: 'isModalVisible'
    })
  }
}
</script>
<style>
  .notifs-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999999;
  }

  .hoverflow {
    overflow: hidden;
  }

  #app {
    background: transparent;
  }

  .v-application--wrap {
    width: 100%;
  }
</style>
