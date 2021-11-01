// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchTasks = async (store,limit) => {
  try {
    const response = await store.dispatch("getTasks",{limit});
    return response.data;
  } catch (e) {
    await store.commit("setSnackbar", {
      show: true,
      message: "Something went wrong",
      color: "error",
    });
  }
};

export default useFetchTasks;
