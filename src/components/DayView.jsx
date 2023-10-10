import { useSelector, useDispatch } from "react-redux";

import { useModal } from "../service/useModal";
import { useCalendarModal } from "../service/useCalendarModal";

import EventModal from "./EventModal.jsx";
import CalendarModal from "./CalendarModal.jsx";

import { deleteEvent } from "../store/globalPropsSlice";

import "../styles/DayView.less";

function DayView() {
  const dispatch = useDispatch();
  const { isModalOpen, triggerModal } = useModal();
  const { isCalendarOpen, triggerCalendarModal } = useCalendarModal();
  const date = useSelector((state) => state.globalProps.date);
  const events = useSelector((state) => state.globalProps.events);
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const hours = [];
  for (let hour = 9; hour <= 20; hour++) {
    hours.push(hour);
  }

  // Adding events to the calendar
  // Measure between 2 lines
  const pixelsPerHour = 50;

  // Dimension according to the duration of the event
  const calculateEventHeight = (event, pixelsPerHour) => {
    const startTime = event.timeFrom.split(":");
    const endTime = event.timeTo.split(":");
    const startHour = parseInt(startTime[0], 10);
    const startMinute = parseInt(startTime[1], 10);
    const endHour = parseInt(endTime[0], 10);
    const endMinute = parseInt(endTime[1], 10);

    const durationInHours = endHour - startHour;
    const durationInMinutes = endMinute - startMinute;

    const totalMinutes = durationInHours * 60 + durationInMinutes;
    const height = (totalMinutes / 60) * pixelsPerHour;

    return height;
  };

  // Measure from the top of the calendar
  const calculateEventTop = (event, pixelsPerHour) => {
    const startTimeParts = event.timeFrom.split(":");
    const eventHourNum = parseInt(startTimeParts[0], 10);
    const eventMinuteNum = parseInt(startTimeParts[1], 10);

    const startHour = 9;
    const totalMinutes = (eventHourNum - startHour) * 60 + eventMinuteNum;

    const top = (totalMinutes / 60) * pixelsPerHour;
    return top;
  };

  const currentDate = date;
  const eventsToDisplay = Object.values(events[currentDate] || {});

  // Sort events by time
  eventsToDisplay.sort((eventA, eventB) => {
    const timeA = eventA.timeFrom;
    const timeB = eventB.timeFrom;
    return timeA.localeCompare(timeB);
  });

  let firstEventHeight = 0;

  if (eventsToDisplay.length > 1) {
    const firstEvent = eventsToDisplay[0];
    firstEventHeight = calculateEventHeight(firstEvent, pixelsPerHour);
  }

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="dayview-container">
      <h3 className="date">{formatDate(date)}</h3>
      <div className="button-container">
        <button
          title="Show calendar"
          className="action-button small-only"
          onClick={triggerCalendarModal}
        >
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
      <div className="event-container">
        {eventsToDisplay.map((event, index) => (
          <div
            key={index}
            className="event"
            style={{
              top:
                index > 0
                  ? `${
                      calculateEventTop(event, pixelsPerHour) -
                      firstEventHeight * index
                    }px`
                  : `${calculateEventTop(event, pixelsPerHour)}px`,
              height: `${calculateEventHeight(event, pixelsPerHour) + index}px`,
              backgroundColor: `${event.color}20`,
              borderLeft: `4px solid ${event.color}`,
            }}
          >
            <div className="event-inner-container">
              <p className="event-title">{event.title}</p>
              <p className="event-comment">{event.comment}</p>
              <button
                className="event-delete"
                onClick={() => handleDeleteEvent(event.id)}
              >
                <i className="bi bi-x-square-fill"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <EventModal currentDate={date} />}
      {isCalendarOpen && <CalendarModal currentDate={date} />}
    </div>
  );
}

export default DayView;
