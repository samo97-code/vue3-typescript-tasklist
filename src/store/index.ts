import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    snackbar: {
      show: false,
      message: "",
      color: "success",
    },
  },
  mutations: {
    setSnackbar(state, payload) {
      state.snackbar = payload;
    },
  },
  actions: {
    async getTasks(_,payload) {
      const limit = payload?.limit ?  payload?.limit : 10
      return await axios.get(`http://localhost:8081/tasks?_limit=${limit}`);
    },
    async getTaskById(_,payload) {
      return await axios.get(`http://localhost:8081/tasks/${payload.id}`);
    },
    async createTask(_, payload) {
      return await axios.post("http://localhost:8081/tasks", payload);
    },
    async deleteTask(_, payload) {
      return await axios.delete(`http://localhost:8081/tasks/${payload.id}`);
    },
    async updateTask(_, payload) {
      return await axios.patch(`http://localhost:8081/tasks/${payload.id}`, payload);
    },
  },
  getters: {
    snackbar: (state) => state.snackbar,
  },
  modules: {},
});
