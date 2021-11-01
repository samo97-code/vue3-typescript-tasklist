<template>
  <div class="details">
    <h1>{{task.title}} details</h1>
    <div class="content">
      <p class="desc">{{task.description}}</p>
      <div class="info">
        <b class="date">{{task.date }}</b>
        <b class="status">{{ task.status }}</b>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import useFetchTaskId from "@/hooks/useFetchTaskId";
import {useStore} from "vuex";

export default defineComponent({
  name: "TaskDetails",
  components: {},

  async setup() {
    const route = useRoute();
    const store = useStore()
    const task = await useFetchTaskId(store,route.params.id)
    if (task.date) task.date = new Date(task.date).toDateString()

    return { route, task };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/details";
</style>
