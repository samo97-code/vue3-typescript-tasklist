<template>
  <div class="home">
    <h1>Our Tasks Interface ({{tasks.length}})</h1>
    <div class="form">
      <input type="text" placeholder="Search..." class="searchbar" v-model="search"/>

      <select id="" class="select-box">
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>

      <button class="show-btn">
        Select All
      </button>

      <button class="delete-btn">
        Delete All
      </button>
    </div>

    <div class="table">
      <table>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Id
              <OrderBy :attr="'id'" @ordering="orderBy"/>
            </th>
            <th>
              Title
              <OrderBy :attr="'title'" @ordering="orderBy"/>
            </th>
            <th>
              Description
              <OrderBy :attr="'description'" @ordering="orderBy"/>
            </th>
            <th>
              Status
              <OrderBy :attr="'status'" @ordering="orderBy"/>
            </th>
            <th>
              Date
              <OrderBy :attr="'date'" @ordering="orderBy"/>
            </th>
            <th>Show</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td><input type="checkbox"></td>
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ descFormat(task.description) }}</td>
            <td>
              <span
                class="status"
                :style="{ background: checkStatus(task.status).color }"
                >{{ task.status }}</span
              >
            </td>
            <td>{{ task.date }}</td>

            <td>
              <button class="show-btn" @click.prevent="toLink(task.id)">
                Show
              </button>
            </td>
            <td>
              <button
                class="edit-btn"
                :disabled="task.status === 'finished'"
                :class="{ disabled: task.status === 'finished' }"
              >
                Edit
              </button>
            </td>
            <td>
              <button class="delete-btn" @click.prevent="deleteTask(task.id)">
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


import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import useFetchTasks from "@/hooks/useFetchTasks";
import { useStore } from "vuex";
import Tasks from "@/interface/Tasks.interface";
import OrderBy from "@/components/OrderBy.vue";

export default defineComponent({
  name: "Home",
  components: {
    OrderBy,
  },
  async setup() {
    const router = useRouter();
    const store = useStore();
    let search = ref('')
    let tasks = ref([]);

    //Watch
    watch(search, (val) => {
      if (val){
        tasks.value = listTasks.filter((item: Tasks)=> {
          console.log(item.title.toLowerCase().includes(val),'1111')
          if (item.title.includes(val) ||
            item.title.toUpperCase().includes(val) ||
            item.title.toLowerCase().includes(val)){
            return item
          }
        })
        console.log(tasks.value,'x')
      }else tasks.value = listTasks
    })

    const listTasks = await useFetchTasks()
    tasks.value = listTasks


    const descFormat = (desc: string) => desc.substr(0, 50) + "...";

    const checkStatus = (status: string) => {
      const list = [
        { status: "created", color: "#ffc107" },
        { status: "working", color: "#007bff" },
        { status: "finished", color: "#28a745" },
      ];

      return list.find((item) => item.status === status);
    };

    const deleteTask = async (id: number): Promise<void> => {
      try {
        await store.dispatch("deleteTask", { id });
        const index = tasks.value.findIndex((item: Tasks) => item.id === id);
        tasks.value.splice(index, 1);
      } catch (e) {
        console.log(e.message);
      }
    };

    const toLink = (id: number): void => {
      router.push(`/task-details/${id}`);
    };

    const orderBy = (type: string, attr: string)=>{
      if (type === 'up'){
        tasks.value.sort((a: { [x: string]: string; }, b: { [x: string]: string; }) => a[attr].toString().localeCompare(b[attr]));
      }else {
        tasks.value.sort((a: { [x: string]: string; }, b: { [x: string]: string; }) => a[attr].toString().localeCompare(b[attr])).reverse()
      }
    }

    return { tasks,search, deleteTask, toLink, descFormat, checkStatus, orderBy };
  },
});
</script>

<style lang="scss" scoped>
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

.edit-btn {
  background: #17a2b8;

  &:hover {
    background: #066877;
  }
}

.show-btn {
  background: #007bff;

  &:hover {
    background: #0357b9;
  }
}

.form {
  text-align: left;
  width: 800px;
  margin: 0 auto 24px auto;

  .searchbar{
    height: 24px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 2px 12px;
    color: #526270;
    margin-right: 16px;
  }

  .select-box{
    height: 30px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 2px 12px;
    color: #526270;
    margin-right: 16px;
    cursor: pointer;

    option{
      cursor: pointer;
    }
  }
}
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

        .status {
          padding: 2px 4px;
          color: white;
          border-radius: 7px;
          font-size: 14px;
        }

        .disabled {
          background: #b9b6b6;
          cursor: not-allowed;

          &:hover {
            background: #b9b6b6;
          }
        }
      }
    }
  }
}
</style>
