import PropTypes from "prop-types";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useModal } from "../service/useModal";

import { setEvents, setBanner } from "../store/globalPropsSlice";

import "../styles/EventModal.less";

function EventModal({ currentDate }) {
  const { triggerModal } = useModal();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.globalProps.events);
  useEffect(() => {
    console.log(events);
  }, [events]);
  // Format date to YYYY-MM-DD
  const dateParts = currentDate.split(" ");
  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const formattedDate = `${dateParts[3]}-${monthMap[dateParts[1]]}-${
    dateParts[2]
  }`;
  // Verification functions
  // 1- Check incoherent times
  function isTimeIncoherent(event) {
    return (
      event.timeFrom > event.timeTo ||
      event.timeFrom === event.timeTo
    )
  }
  // 2- Prevent duplicate creation
  function areEventsDuplicates(event1, event2) {
    return (
      event1.title === event2.title &&
      event1.date === event2.date &&
      event1.timeFrom === event2.timeFrom &&
      event1.timeTo === event2.timeTo
    );
  }
  // 3- Prevent creation of an event on an occupied time slot
  function isTimeSlotOccupied(eventsCopy, event) {
    if (eventsCopy[event.date]) {
      for (let i = 0; i < eventsCopy[event.date].length; i++) {
        const existingEvent = eventsCopy[event.date][i];
        if (
          (existingEvent.timeFrom < event.timeTo && existingEvent.timeTo > event.timeFrom) ||
          (existingEvent.timeFrom === event.timeFrom && existingEvent.timeTo === event.timeTo)
        ) {
          return true;
        }
      }
    }
    return false;
  }  
  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const formObject = {};
    
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Format date to the format used in the reducer
    formObject["date"] = new Date(formObject["date"]).toDateString();

    // Add an id to the event
    formObject["id"] = crypto.randomUUID();

    // Proceeding everything on a local copy of the events object
    const eventsCopy = { ...events };

    // Verify if the time is incoherent
    if (isTimeIncoherent(formObject)) {
      dispatch(setBanner({
        type: "danger",
        message: "The time you entered is incoherent.",
        uuid: crypto.randomUUID(),
      }));
      return;
    }

    // Verify if the event is a duplicate
    if (eventsCopy[formObject["date"]]) {
      for (let i = 0; i < eventsCopy[formObject["date"]].length; i++) {
        if (areEventsDuplicates(eventsCopy[formObject["date"]][i], formObject)) {
          dispatch(setBanner({
            type: "danger",
            message: "The event you are trying to add already exists.",
            uuid: crypto.randomUUID(),
          }));
          return;
        }
      }
    }

    // Verify if the time slot is occupied
    if (isTimeSlotOccupied(eventsCopy, formObject)) {
      dispatch(setBanner({
        type: "danger",
        message: "You already have an event at this time. Please choose another time slot or delete the scheduled one.",
        uuid: crypto.randomUUID(),
      }));
      return;
    }

    // Handle the new event with the Redux store
    if (eventsCopy[formObject["date"]]) {
      eventsCopy[formObject["date"]] = [...eventsCopy[formObject["date"]]];
      eventsCopy[formObject["date"]].push(formObject);
    } else {
      eventsCopy[formObject["date"]] = [formObject];
    }

    dispatch(setEvents(eventsCopy));
    dispatch(setBanner({
      type: "success",
      message: "Event added successfully.",
      uuid: crypto.randomUUID(),
    }));
    console.log(formObject);
    triggerModal();
  };
  return (
    <div className="eventmodal-background">
      <div className="eventmodal">
        <form onSubmit={handleSubmit}>
          <span className="eventmodal-close" onClick={triggerModal}>
            &times;
          </span>
          <div className="eventmodal-row">
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              id="title-input"
              className="eventmodal-input"
              required
            />
            <input
              type="color"
              name="color"
              id="picker-input"
              className="eventmodal-input"
              defaultValue={"#6200EE"}
            />
          </div>
          <div className="eventmodal-row">
            <span>
              <i className="bi bi-calendar4 eventmodal-icon"></i>
            </span>
            <input
              type="date"
              name="date"
              id="date-input"
              title="Date"
              defaultValue={formattedDate}
              required
            />
          </div>
          <div className="eventmodal-row">
            <span>
              <i className="bi bi-clock eventmodal-icon"></i>
            </span>
            <input
              type="time"
              name="timeFrom"
              id="time-input-from"
              step="900"
              min="09:00"
              max="20:00"
              title="Time - From"
              required
            />
            <input
              type="time"
              name="timeTo"
              id="time-input-to"
              step="900"
              min="10:00"
              max="20:00"
              title="Time - To"
              required
            />
          </div>
          <div className="eventmodal-row">
            <textarea
              name="comment"
              placeholder="comment"
              id="comment-textarea"
              className="eventmodal-input"
              maxLength="250"
              rows={1}
            />
          </div>
          <div className="eventmodal-row">
            <button className="eventmodal-submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

EventModal.propTypes = {
  currentDate: PropTypes.string.isRequired,
};

export default EventModal;
