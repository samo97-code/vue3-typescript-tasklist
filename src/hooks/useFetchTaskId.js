// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchTaskId = async (store,id) => {
  try {
    const response = await store.dispatch("getTaskById",{id});
    return response.data;
  } catch (e) {
    await store.commit("setSnackbar", {
      show: true,
      message: "Something went wrong",
      color: "error",
    });
  }
};

export default useFetchTaskId;
