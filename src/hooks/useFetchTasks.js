import { useStore } from "vuex";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchTasks = async () => {
  const store = useStore();

  try {
    const response = await store.dispatch("getTasks");
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

export default useFetchTasks;
