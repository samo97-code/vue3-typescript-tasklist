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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: #d5d5d5;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
