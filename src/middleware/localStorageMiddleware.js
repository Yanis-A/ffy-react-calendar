export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === "globalProps/setEvents") {
    const state = store.getState();
    const events = state.globalProps.events;
    localStorage.setItem("events", JSON.stringify(events));
  }
  return result;
};
