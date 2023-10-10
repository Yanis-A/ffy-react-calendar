export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type === "globalProps/setEvents" ||
    action.type === "globalProps/deleteEvent"
  ) {
    const state = store.getState();
    const events = state.globalProps.events;
    localStorage.setItem("ffy-react-calendar-events", JSON.stringify(events));
  }
  return result;
};
