import { useSelector } from "react-redux";

import "../styles/DayView.less";

function DayView() {
  const date = useSelector((state) => state.globalProps.date);
  function formatDate(date) {
    const dateStr = date;
    const dateParts = dateStr.split(" ");
    const day = dateParts[2];
    const month = dateParts[1];
    return `${day} ${month}`;
  }

  const hours = [];
  for (let hour = 9; hour <= 20; hour++) {
    hours.push(hour);
  }

  return (
    <div className="dayview-container">
      <h3 className="date">{formatDate(date)}</h3>
      <div className="button-container">
        <button title="Add event" className="action-button" onClick={() => console.log('add event')}>
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
    </div>
  );
}

export default DayView;
