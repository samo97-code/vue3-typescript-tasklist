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
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
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
.searchbar{
  height: 24px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 2px 12px;
  color: #526270;
}
.textarea{
  outline: none;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 2px 12px;
  color: #526270;
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

  &:hover {
    background: #0357b9;
  }
}

.success-btn {
  background: #28a745;

  &:hover {
    background: #13732b;
  }
}
</style>
