import Calendar from "react-calendar";

import { setDate } from "../store/globalPropsSlice";
import { useSelector, useDispatch } from "react-redux";

import "../styles/CalendarView.less";
import "../styles/Calendar.less";

function CalendarView() {
  const dispatch = useDispatch();

  const date = useSelector((state) => state.globalProps.date);

  const handleDateChange = (newDate) => {
    dispatch(setDate(newDate.toDateString()));
  };

  return (
    <div className="calendarview-container">
      <Calendar
        onClickDay={handleDateChange}
        value={new Date(date)}
        locale="en"
      />
    </div>
  );
}

export default CalendarView;
