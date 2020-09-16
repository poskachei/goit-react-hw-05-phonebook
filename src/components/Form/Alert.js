import React from "react";
import style from "./Alert.module.css";

const Alert = ({ text }) => {
  return (
    <div className={style.container}>
      <span className={style.text}> {text} </span>
    </div>
  );
};

export default Alert;
