import PropTypes from "prop-types";

import { useModal } from "../service/useModal";

import "../styles/EventModal.less";

function EventModal({ currentDate }) {
  const { triggerModal } = useModal();
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
  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const formObject = {};
    
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    formObject["date"] = new Date(formObject["date"]).toDateString();
  
    console.log(formObject);
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
              onChange={(e) => console.log(e.target.value)}
              required
            />
            <input
              type="color"
              name="color"
              id="picker-input"
              className="eventmodal-input"
              onChange={(e) => console.log(e.target.value)}
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
              onChange={(e) => console.log(e.target.value)}
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
              onChange={(e) => console.log(e.target.value)}
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
              onChange={(e) => console.log(e.target.value)}
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
              onChange={(e) => console.log(e.target.value)}
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
