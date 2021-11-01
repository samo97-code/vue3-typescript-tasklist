<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/create-task">Create Task</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <suspense>
      <component :is="Component" />
      <template #fallback> Loading... </template>
    </suspense>
  </router-view>
</template>

<style lang="scss">
@import "assets/scss/global";
</style>
