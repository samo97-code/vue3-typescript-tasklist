// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchTasks = async (store,limit) => {
  try {
    const response = await store.dispatch("getTasks",{limit});
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

export default useFetchTasks;
