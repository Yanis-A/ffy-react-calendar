
import DayView from "./components/DayView";
import CalendarView from "./components/CalendarView";

import "./styles/App.less";

function App() {
  return (
    <>
      <div className="app">
        <div className="day-container">
          <DayView />
        </div>
        <div className="calendar-container">
          <CalendarView />
        </div>
      </div>
    </>
  );
}

export default App;
