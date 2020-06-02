import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

export default function ContactCard({ contact }) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div
      className="card"
      style={{ width: "18rem", marginLeft: "1rem", marginTop: "1rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">{contact.email}</p>
        <p className="card-text">{contact.address}</p>
        <Link to={`/edit/${contact._id}`}>
          <button className="btn btn-primary">
            <span className="fa fa-pencil" aria-hidden="true"></span> Edit
          </button>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "0.5rem" }}
          onClick={() => setIsShowing(true)}
        >
          <span className="fa fa-trash" aria-hidden="true"></span> Delete
        </button>
      </div>
      <DeleteModal
        contact={contact}
        isShowing={isShowing}
        hide={() => setIsShowing(false)}
      />
    </div>
  );
}