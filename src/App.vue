<template>
  <div id="app">
    <Header /> 
    <template v-if="isLoading">
      <ActivityIndicator />
    </template>
    <router-view></router-view>    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ActivityIndicator from '@/components/Common/Interface/ActivityIndicator'
import Header from '@/components/Common/Layout/Header'

export default {
  name: 'App',
  components: {    
    ActivityIndicator,
    Header
  },
  computed: {
    ...mapState({
        isLoading: 'isLoading'
    })
  }
}
</script>
