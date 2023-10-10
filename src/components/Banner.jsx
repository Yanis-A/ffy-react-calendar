import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import "../styles/Banner.less";

function Banner({ type, message, uuid }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(true);

    const timerId = setTimeout(() => {
      setShowBanner(false);
    }, 4000);

    return () => {
      clearTimeout(timerId);
    };
  }, [type, message, uuid]);

  if (!type || !message || !uuid) {
    return null;
  }

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  let iconClassName = "";
  switch (type) {
    case "info":
      iconClassName = "bi bi-info-circle-fill";
      break;
    case "success":
      iconClassName = "bi bi-check-circle-fill";
      break;
    case "warning":
      iconClassName = "bi bi-exclamation-triangle-fill";
      break;
    case "danger":
      iconClassName = "bi bi-x-circle";
      break;
    default:
      break;
  }

  return (
    <div
      className={`alert-banner ${type}`}
      role="alert"
    >
      <span className="alert-banner-icon">
        <i className={iconClassName}></i>
      </span>
      {message}
      <button
        type="button"
        className="close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      >&times;</button>
    </div>
  );
}

Banner.propTypes = {
  type: PropTypes.oneOf(["", "info", "success", "warning", "danger"]).isRequired,
  message: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default Banner;
