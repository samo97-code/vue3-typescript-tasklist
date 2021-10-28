// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchTaskId = async (store,id) => {
  try {
    const response = await store.dispatch("getTaskById",{id});
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

export default useFetchTaskId;
