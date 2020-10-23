export default {
  namespace: "app",
  state: {
    current: "",
    tabs: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
