import { useModal } from "../service/useModal";

import "../styles/EventModal.less";

function EventModal() {
  const { triggerModal } = useModal();
  return (
    <div className="eventmodal-background">
      <div className="eventmodal">
        <span className="eventmodal-close" onClick={triggerModal}>
          &times;
        </span>
        <h2>Mon Modal</h2>
        <p>Contenu du modal...</p>
      </div>
    </div>
  );
}

export default EventModal;
