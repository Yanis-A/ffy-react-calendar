import DayView from "./components/DayView";
import CalendarView from "./components/CalendarView";
import Banner from "./components/Banner";

import { useSelector } from "react-redux";

import "./styles/App.less";

function App() {
  const bannerType = useSelector((state) => state.globalProps.banner.type);
  const bannerMessage = useSelector(
    (state) => state.globalProps.banner.message
  );
  const bannerUuid = useSelector((state) => state.globalProps.banner.uuid);

  return (
    <>
      <div className="app">
        <div className="day-container">
          <DayView />
        </div>
        <div className="calendar-container">
          <CalendarView />
        </div>
        <Banner type={bannerType} message={bannerMessage} uuid={bannerUuid} />
      </div>
    </>
  );
}

export default App;
