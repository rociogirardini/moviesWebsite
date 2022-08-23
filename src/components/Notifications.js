import Toast from "react-bootstrap/Toast";
import { useState } from "react";

function Notifications() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </>
  );
}

export default Notifications;
