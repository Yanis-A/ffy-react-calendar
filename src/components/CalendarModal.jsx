import PropTypes from "prop-types";

import Calendar from "react-calendar";

import { useCalendarModal } from "../service/useCalendarModal";

import { setDate } from "../store/globalPropsSlice";
import { useDispatch } from "react-redux";

import "../styles/CalendarModal.less";
import "../styles/Calendar.less";

function CalendarView({ currentDate }) {
  const dispatch = useDispatch();

  const { triggerCalendarModal } = useCalendarModal();

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
          value={new Date(currentDate)}
          locale="en"
        />
      </div>
    </div>
  );
}

CalendarView.propTypes = {
  currentDate: PropTypes.string.isRequired,
};

export default CalendarView;
