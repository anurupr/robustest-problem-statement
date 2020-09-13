<template>
  <div id="app">
    <Header /> 
    <template v-if="isLoading">
      <ActivityIndicator />
    </template>
    <router-view></router-view>    
    <Footer />
  </div>
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
        isLoading: 'isLoading'
    })
  }
}
</script>
