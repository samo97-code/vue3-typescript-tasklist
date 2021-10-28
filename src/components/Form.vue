<template>
  <div class="form">
    <input type="text" placeholder="Search..." class="searchbar" @input="search"/>

    <select id="" class="select-box" v-model="limit">
      <option :value="value" v-for="value in countOptions" :key="value">{{ value }}</option>
    </select>

    <button class="show-btn" @click="selectAll">
      Select All
    </button>

    <button class="delete-btn" v-if="selectedItems.length" @click="deleteAll">
      Delete All
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType,Ref, ref, watch} from "vue";
import Tasks from "@/interface/Tasks.interface";
export default defineComponent({
  name: "Form",
  props:{
    tasks: {
      type: Array as PropType<Tasks[]>,
      required: true
    },
    selectedItems: {
      type: Array,
      required: true
    }
  },

  setup(props,{emit}){
    const limit = ref(10)
    const selected = ref([]) as Ref<Array<number>>
    const countOptions = [5,10,15,20]

    const search = (e: any)=>{
      emit('update:search',e.target.value)
    }

    const deleteAll = ()=>{
      emit('delete-all')
    }

    const selectAll = ()=>{
      if (selected.value.length){
        selected.value = []
      }else {
        props.tasks.map((item: Tasks)=>{
          return selected.value.push(item.id);
        })
      }

      emit('select-all',selected.value)
    }

    //Watch
    watch(limit,(val: number)=>{
      emit('update:limit',val)
    })

    return {search, countOptions,selected, limit, selectAll, deleteAll}
  }
})
</script>

<style lang="scss" scoped>
.form {
  text-align: left;
  width: 900px;
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
  margin-right: 16px;

  &:hover {
    background: #0357b9;
  }
}
</style>
