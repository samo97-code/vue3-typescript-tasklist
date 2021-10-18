<template>
  <div class="home">
    <h1>Our Tasks Interface</h1>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Show</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.date }}</td>
            <td>{{ task.status }}</td>
            <td>
              <button class="show-btn" @click.prevent="toLink(task.id)">
                Show
              </button>
            </td>
            <td>
              <button class="delete-btn" @click.prevent="deleteTask">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();

    const tasks = computed(() => store.getters.tasks);

    const deleteTask = (): void => {
      console.log("delete Task");
    };

    const toLink = (id: number): void => {
      router.push(`/task-details/${id}`);
    };

    return { tasks, deleteTask, toLink };
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
        padding: 7px;

        button {
          cursor: pointer;
          outline: none;
          border: none;
          padding: 5px;
          border-radius: 5px;
          transition: all 0.3s ease-in-out;
          color: white;
        }

        .delete-btn {
          background: #dc3545;

          &:hover {
            background: #a90a18;
          }
        }

        .show-btn {
          background: #17a2b8;

          &:hover {
            background: #066877;
          }
        }
      }
    }
  }
}
</style>
