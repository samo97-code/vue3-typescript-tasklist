<template>
  <div class="about">
    <h1>Edit task</h1>
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

      <div class="form-group">
        <select id="" class="select-box" v-model="form.status">
          <option :value="value" v-for="value in statusOptions" :key="value">{{ value }}</option>
        </select>
      </div>

      <div>
        <button
          @click.prevent="updateTask"
          class="success-btn"
          :class="{ disabled: disabledBtn }"
          :disabled="disabledBtn">Update Task</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import Tasks from "@/interface/Tasks.interface";
import useValidate from '@/hooks/useValidate'
import ErrorList from '@/components/ErrorList.vue'
import useFetchTaskId from "@/hooks/useFetchTaskId";
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
  name: "EditTask",
  components: {
    ErrorList
  },

  async setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const task = await useFetchTaskId(store,route.params.id)
    const form = reactive(task) as Tasks;

    const statusOptions = ['created','working','finished']

    const errors: { [key: string]: any} = reactive(
      {
        title: {
          list: [] as string[],
          invalid: true
        },
        date: {
          list: [] as string[],
          invalid: true
        },
        description: {
          list: [] as string[],
          invalid: true
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

    //Methods
    const inputHandler = (type: string | number)=>{
      const {list} = useValidate(form,validRules,type)
      errors[type].list = list
      errors[type].invalid = !list.length
    }

    const updateTask = async () => {
      try {
        await store.dispatch("updateTask", form);
        await store.commit("setSnackbar", {
          show: true,
          message: "Successfully updated",
          color: "success",
        });
        await router.push("/");
      }catch (e) {
        await store.commit("setSnackbar", {
          show: true,
          message: "Something went wrong",
          color: "error",
        });
      }
    };

    return { form,errors, disabledBtn, statusOptions, updateTask, inputHandler };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/create-task";
</style>
