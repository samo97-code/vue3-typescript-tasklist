<template>
  <div class="about">
    <h1>Create task</h1>
    <div class="content">
      <div class="form-group">
        <label for="title" class="title-name">Title</label>
        <input
          id="title"
          class="searchbar"
          v-model="form.title"
          type="text"
          placeholder="Title"
          :class="{'error-input': errors.title.list.length}"
          @input="inputHandler('title')"
        />
        <ErrorList :errors="errors.title.list"/>
      </div>
      <div class="form-group">
        <label for="date" class="title-name">Date</label>
        <input
          id="date"
          v-model="form.date"
          type="date"
          placeholder="Date"
          class="searchbar"
          :class="{'error-input': errors.date.list.length}"
          @input="inputHandler('date')"
        />
        <ErrorList :errors="errors.date.list"/>
      </div>
      <div class="form-group">
        <label for="desc" class="title-name">Description</label>
        <textarea
          v-model="form.description"
          id="desc"
          cols="30"
          rows="10"
          placeholder="Description"
          class="textarea"
          :class="{'error-input': errors.description.list.length}"
          @input="inputHandler('description')"
        ></textarea>
        <ErrorList :errors="errors.description"/>
      </div>

      <div>
        <button
          @click.prevent="createTask"
          class="success-btn"
          :class="{ disabled: disabledBtn }"
          :disabled="disabledBtn">Create Task</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Tasks from "@/interface/Tasks.interface";
import useValidate from '@/hooks/useValidate'
import ErrorList from '@/components/ErrorList.vue'
const validRules = {
  title: {
    required: true,
    minLength: 8,
  },
  date: {
    required: true,
  },
  description: {
    required: true,
  },
};

export default defineComponent({
  name: "CreateTask",
  components: {
    ErrorList
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    // if we want hooks key as index
    // const form: { [key: string]: string } = reactive({
    const form = reactive({
      title: "",
      date: "",
      description: "",
    });

    const errors: { [key: string]: any} = reactive(
      {
        title: {
          list: [] as string[],
          invalid: false
        },
        date: {
          list: [] as string[],
          invalid: false
        },
        description: {
          list: [] as string[],
          invalid: false
        },
      }
    );

    //Computed
    const disabledBtn = computed(()=>{
      let disabled = false
      Object.entries(errors).forEach((item)=>{
        if (!item[1].invalid) disabled = true
      })
      return disabled
    })

    const createTask = async () => {
      const obj: Tasks = {
        id: Date.now(),
        title: form.title,
        date: form.date,
        description: form.description,
        status: "created",
      };

      await store.dispatch("createTask", obj);
      await router.push("/");
    };

    const inputHandler = (type: string | number)=>{
     const {list} = useValidate(form,validRules,type)
      errors[type].list = list
      errors[type].invalid = !list.length
    }

    return { form,errors, disabledBtn, createTask, inputHandler };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/create-task";
</style>
