import { useSelector } from "react-redux";

import { useModal } from "../service/useModal";
import { useCalendarModal } from "../service/useCalendarModal";

import EventModal from "./EventModal.jsx";
import CalendarModal from "./CalendarModal.jsx";

import "../styles/DayView.less";

function DayView() {
  const { isModalOpen, triggerModal } = useModal();
  const { isCalendarOpen, triggerCalendarModal } = useCalendarModal();
  const date = useSelector((state) => state.globalProps.date);
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  console.log(date);

  const hours = [];
  for (let hour = 9; hour <= 20; hour++) {
    hours.push(hour);
  }

  return (
    <div className="dayview-container">
      <h3 className="date">{formatDate(date)}</h3>
      <div className="button-container">
        <button title="Show calendar" className="action-button small-only" onClick={triggerCalendarModal}>
          <i className="bi bi-calendar4"></i>
        </button>
        <button
          title="Add event"
          className="action-button"
          onClick={triggerModal}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      <hr className="hr" />
      <div className="day-calendar">
        {hours.map((hour) => (
          <div key={hour} className="hour-row">
            <div className="hour">
              {hour < 10 ? `0${hour}:00` : `${hour}:00`}
            </div>
            <div className="horizontal-line"></div>
          </div>
        ))}
      </div>
      {isModalOpen && <EventModal currentDate={date} />}
      {isCalendarOpen && <CalendarModal currentDate={date} />}
    </div>
  );
}

export default DayView;
