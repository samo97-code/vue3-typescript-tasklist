<template>
  <div class="about">
    <h1>Task Details {{ route.params.id }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TaskDetails",
  components: {},

  setup() {
    const route = useRoute();
    console.log(route.params.id, "route");

    return { route };
  },
});
</script>

<!--<style lang="scss" scoped>-->
<!---->
<!--</style>-->
