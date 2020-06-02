import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

export default function Alert({ message }) {
  const [show, setShow] = useState(true);

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      style={{ float: "right" }}
      delay={1700}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">{message.title}</strong>
      </Toast.Header>
      <Toast.Body>{message.content}</Toast.Body>
    </Toast>
  );
}

export function showAlert(dispatch, error) {
  const err = error.response ? error.response.data : error; // check if server or network error
  console.log(error);
  dispatch({
    type: "SHOW_NOTIFICATION",
    payload: {
      title: err.name ? err.name : err,
      content: err.message ? err.message : err,
    },
  });
}
