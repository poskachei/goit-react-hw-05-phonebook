import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

import ContactForm from "./components/Form/Form";
import ContactList from "./components/List/List";
import Filter from "./components/Filter/Filter";
import MessageRed from "./components/Form/Alert";

import redAlert from "./components/Form/transition/alert.module.css";
import "./components/Form/heading.css";
import "./App.css";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    notification: false,
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  //добавляем новый контакт, имя и номер возьмем из state ContactForm, id генерим тут
  addContact = ({ name, number }) => {
    const statement = this.state.contacts.find(
      (contact) => contact.name === name
    );

    if (statement) {
      return this.setState({ notification: true });
    }

    if (name && number) {
      const contact = {
        id: uuidv4(),
        name: name,
        number: number,
      };
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  isAlready = () => {
    this.setState({ notification: false });
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="pnohebook-container">
        <CSSTransition
          in={true}
          timeout={500}
          appear={true}
          classNames="title"
          unmountOnExit
        >
          <h1> Phonebook </h1>
        </CSSTransition>
        <CSSTransition
          in={this.props.eventShow}
          timeout={250}
          classNames={redAlert}
          unmountOnExit
        >
          <MessageRed text="Contact is already" />
        </CSSTransition>

        <ContactForm onAddContact={this.addContact} />
        {<Filter onChangeFilter={this.changeFilter} value={filter} />}
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemove={this.removeContact}
          />
        )}
      </div>
    );
  }
}
