import React from "react";
import classes from './NavigationList.module.css'
const NavigationList = ({children}) => (
  <li>
    <a className={classes["nav-link"]} href="/">
      {children}
    </a>
  </li>
);

export default NavigationList;
