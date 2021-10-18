<template>
  <div class="about">
    <h1>This is an create task</h1>
    <div class="content">
      <div class="form-group">
        <label for="title" class="title-name">Title</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Title"
        />
      </div>
      <div class="form-group">
        <label for="date" class="title-name">Date</label>
        <input id="date" v-model="form.date" type="date" placeholder="Date" />
      </div>
      <div class="form-group">
        <label for="desc" class="title-name">Description</label>
        <textarea
          v-model="form.description"
          id="desc"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
      </div>

      <div>
        <button @click.prevent="createTask">Create Task</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Tasks from "@/interface/Tasks.interface";

export default defineComponent({
  name: "CreateTask",
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();

    const tasks = computed(() => store.getters.tasks);

    const form: { [key: string]: string } = reactive({
      title: "",
      date: "",
      description: "",
    });

    const createTask = async () => {
      const obj: Tasks = {
        id: tasks.value.length + 1,
        title: form.title,
        date: form.date,
        description: form.description,
        status: "created",
      };

      await store.commit("setTasks", obj);
      await Object.keys(form).forEach((item: string) => (form[item] = ""));
      await router.push("/");
    };

    return { form, createTask };
  },
});
</script>

<style lang="scss" scoped>
.content {
  max-width: 500px;
  margin: 0 auto;

  .form-group {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: left;
    margin-bottom: 30px;

    label {
      margin-bottom: 8px;
    }
  }
}
</style>
