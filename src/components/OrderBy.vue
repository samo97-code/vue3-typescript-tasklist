<template>
  <span class="order">
    <span class="up" @click="orderBy('up')">▴</span>
    <span class="down" @click="orderBy('down')">▾</span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OrderBy",
  props:{
    attr: {
      type: String,
      required: true
    },
  },
  setup(props,{emit}){
    const orderBy = (type: string)=>{
      emit('ordering', type, props.attr)
    }

    return {orderBy}
  }
});
</script>

<style scoped lang="scss">
@import "../assets/scss/order-by";
</style>
