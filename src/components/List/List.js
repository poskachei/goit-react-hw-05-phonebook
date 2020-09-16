import React from "react";
import PropsTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import contactsList from "./list.module.css";

const ContactList = ({ contacts, onRemove }) => {
  return (
    <TransitionGroup component="ul">
      {contacts.map((contact) => (
        <CSSTransition
          key={contact.id}
          classNames={contactsList}
          timeout={250}
          unmountOnExit
        >
          <li className="contacts-item">
            {contact.name} : {contact.number}
            <button onClick={() => onRemove(contact.id)}> X </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

ContactList.PropsTypes = {
  contacts: (PropsTypes.node = {
    id: PropsTypes.string,
    name: PropsTypes.string.isRequired,
    number: PropsTypes.string.isRequired,
  }),
  onRemove: PropsTypes.func.isRequired,
};

export default ContactList;
