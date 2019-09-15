import React from "react";
import classes from "./Card.module.css";
const Card = ({ children, style }) => (
  <div className={classes.card} style={style}>
    {children}
  </div>
);

export default Card;
