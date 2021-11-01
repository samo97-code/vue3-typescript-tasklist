<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/create-task">Create Task</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <suspense>
      <component :is="Component" />
      <template #fallback> Loading... </template>
    </suspense>
  </router-view>
  <SnackBar
    class="custom-snackbar"
    :type="'snackbar'"
    :active="snackbar.show"
    :position="'bottom-center'"
    :timeout="5000"
    :message="snackbar.message"
    :background-color="snackbar.color"
  />
</template>

<script lang="ts">
import SnackBar from '@/components/SnackBar.vue'
import {defineComponent, computed} from "vue";
import {useStore} from "vuex";
export default defineComponent({
  name: 'App',
  components: { SnackBar },

  setup(){
    const store = useStore()

    const snackbar = computed(()=>{
      return store.getters.snackbar
    })

    return {snackbar}
  }

})
</script>

<style lang="scss">
@import "assets/scss/global";
</style>
