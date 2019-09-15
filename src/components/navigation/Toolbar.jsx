import React from "react";
import classes from "./Toolbar.module.css";
import NavigationList from "./NavigationList";

const navElements = ["Home", "Contact", "About"];
const Toolbar = ({ children }) => (
  <header>
    <nav className={classes.navbar}>
      <a className={classes["navbar-brand"]} href="/">
        {children}
      </a>
      <ul className={classes["navbar-nav"]}>
        {navElements.map(navEl => (
          <NavigationList key={navEl}>{navEl}</NavigationList>
        ))}
      </ul>
    </nav>
  </header>
);

export default Toolbar;
