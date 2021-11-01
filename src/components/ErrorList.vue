<template>
  <div v-if="errors.length" class="error-wrapper">
    <span class="error" v-for="(error,index) in errors" :key="index">
       {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  name: "ErrorList",
  props:{
    errors: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/error-list";
</style>
