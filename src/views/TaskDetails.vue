<template>
  <div class="details">
    <h1>{{task.title}} details</h1>
    <div class="content">
      <div class="info">
        <p class="date"><b>Date:</b> {{task.date }}</p>
        <p class="status"><b>Status: </b>{{ task.status }}</p>
      </div>
      <p class="desc">{{task.description}}</p>
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
