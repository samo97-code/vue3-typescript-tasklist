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
@import "../assets/scss/form";
</style>
