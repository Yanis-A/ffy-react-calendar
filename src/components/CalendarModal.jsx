import Calendar from "react-calendar";

import { useCalendarModal } from "../service/useCalendarModal";

import { setDate } from "../store/globalPropsSlice";
import { useSelector, useDispatch } from "react-redux";

import "../styles/CalendarModal.less"
import "../styles/Calendar.less";

function CalendarView() {
  const dispatch = useDispatch();

  const { triggerCalendarModal } = useCalendarModal();

  const date = useSelector((state) => state.globalProps.date);

  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate.toDateString()));
  };

  return (
    <div className="calendarmodal-background">
      <div className="calendarmodal">
        <span className="calendarmodal-close" onClick={triggerCalendarModal}>
          &times;
        </span>
        <Calendar
        onClickDay={handleDateChange}
        value={new Date(date)}
        locale="en"
      />
      </div>
    </div>
  );
}

export default CalendarView;
