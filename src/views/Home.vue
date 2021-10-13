<template>
  <div class="home">
    <h1>Our TasksInterface</h1>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.date }}</td>
            <td>{{ task.status }}</td>
            <td>Edit | Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Tasks from "@/interface/Tasks.interface";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const tasks = reactive<Tasks[]>([
      {
        id: 1,
        title: "Learn vue 3",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "working",
      },
      {
        id: 2,
        title: "Learn typescript",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "finished",
      },
      {
        id: 3,
        title: "Learn composition api",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "working",
      },
      {
        id: 4,
        title: "Creat project",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "working",
      },
      {
        id: 5,
        title: "Creat project",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "working",
      },
    ]);

    return { tasks };
  },
});
</script>

<style lang="scss" scoped>
.table {
  width: 800px;
  margin: 0 auto;

  table {
    width: 100%;
    border: solid 1px #aaa999;

    tr {
      th {
        border: solid 1px #aaa999;
      }

      td {
        border: solid 1px #aaa999;
      }
    }
  }
}
</style>
