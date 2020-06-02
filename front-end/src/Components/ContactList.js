import React from "react";
import ContactCard from "../Components/ContactCard";
export default function ContactList({ contacts }) {
  const cards = () => {
    return contacts.map((contact) => {
      return <ContactCard key={contact._id} contact={contact} />;
    });
  };

  return <div className="row">{cards()}</div>;
}
