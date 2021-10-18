import { createStore } from "vuex";
import Tasks from "@/interface/Tasks.interface";
export default createStore({
  state: {
    tasks: [
      {
        id: 1,
        title: "Learn vue 3",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "working",
      },
      {
        id: 2,
        title: "Learn typescript",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "finished",
      },
      {
        id: 3,
        title: "Learn composition api",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "working",
      },
      {
        id: 4,
        title: "Creat project",
        description:
          "It is a long established fact that a reader will be distracted by the readable",
        date: "Wed Oct 13 2021 22:30:46",
        status: "working",
      },
    ] as Tasks[],
    firstName: "",
  },
  mutations: {
    setTasks(state, payload: Tasks) {
      state.tasks = [...state.tasks, payload];
    },
  },
  actions: {},
  getters: {
    tasks: (state) => state.tasks,
  },
  modules: {},
});
