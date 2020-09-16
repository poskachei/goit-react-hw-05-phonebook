import React from "react";
import styles from "./Notification.module.css";

const Notification = ({ isAlready }) => {
  setTimeout(isAlready, 3000);
  return <p className={styles.notify}>Name is already in contacts.</p>;
};

export default Notification;
