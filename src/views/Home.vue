<template>
  <div class="home">
    <h1>Our Tasks Interface ({{tasks.length}})</h1>
    <Form v-model:search="search" v-model:limit="limit" @select-all="selectAll" @delete-all="deleteAll" :tasks="tasks" :selected-items="selected" />
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
            <th style="width: 100px">
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
            <td>
              <input type="checkbox" :checked="selected.includes(task.id)" @change="selectItem(task.id)" class="checkbox">
            </td>
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
                @click="editTask(task)"
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
      <h3 v-if="!tasks.length">We cant find searched task 😔</h3>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref, watch} from "vue";
import { useRouter } from "vue-router";
import useFetchTasks from "@/hooks/useFetchTasks";
import { Store, useStore} from "vuex";
import Tasks from "@/interface/Tasks.interface";
import OrderBy from "@/components/OrderBy.vue";
import Form from "@/components/Form.vue";

export default defineComponent({
  name: "Home",
  components: {
    OrderBy,
    Form
  },
  async setup() {
    const router = useRouter();
    const store = useStore();
    let search = ref('')
    let limit = ref(10)
    const selected = ref([]) as Ref<Array<number>>
    let tasks = ref([]);
    let listTasks: never[] = []

    //Watch
    watch(search, (val) => {
      if (val) {
        tasks.value = listTasks.filter((item: Tasks) => {
          if (item.title.includes(val) ||
            item.title.toUpperCase().includes(val) ||
            item.title.toLowerCase().includes(val)) {
            return item
          }
        })
      } else tasks.value = listTasks
    })

    watch(limit, async (val) => {
      await getTasks(store, val)
    })


    //Computed
    const descFormat = (desc: string) => desc.substr(0, 50) + "...";

    const checkStatus = (status: string) => {
      const list = [
        { status: "created", color: "#ffc107" },
        { status: "working", color: "#007bff" },
        { status: "finished", color: "#28a745" },
      ];

      return list.find((item) => item.status === status);
    };


    //Methods
    const getTasks = async (store: Store<any>, limit: number)=>{
      listTasks = await useFetchTasks(store,limit)
      tasks.value = listTasks
    }

    await getTasks(store, limit.value)

    const selectAll = (items: Array<number>)=>{
      selected.value = items
    }

    const selectItem = (id: number)=>{
      if (selected.value.includes(id)){
        const index = selected.value.findIndex((item)=>item === id)
        selected.value.splice(index,1)
      } else selected.value.push(id)
    }

    const deleteAll = async (): Promise<void>=>{
      if (selected.value.length){
        try {
          await selected.value.forEach((id)=>{
             deleteFunc(id)
          })
        } catch (e) {
          await store.commit("setSnackbar", {
            show: true,
            message: "Something went wrong",
            color: "error",
          });
        }
      }
    }

    const deleteTask = async (id: number): Promise<void> => {
      try {
        await deleteFunc(id)
      } catch (e) {
        await store.commit("setSnackbar", {
          show: true,
          message: "Something went wrong",
          color: "error",
        });
      }
    };

    const deleteFunc = async (id: number)=>{
      await store.dispatch("deleteTask", { id });
      const index = tasks.value.findIndex((item: Tasks) => item.id === id);
      tasks.value.splice(index, 1);
      await store.commit("setSnackbar", {
        show: true,
        message: "Successfully deleted",
        color: "success",
      });
    }

    const editTask = (task: Tasks)=>{
      if (task.status !== 'finished'){
        router.push(`/edit-task/${task.id}`)
      }
    }

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

    return { tasks,search, limit,selected, deleteTask, toLink, descFormat, checkStatus, orderBy, selectAll, selectItem, deleteAll, editTask };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/table";
</style>
