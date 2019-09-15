import React, { Fragment } from "react";
import Toolbar from "./navigation/Toolbar";

const Layout = ({ children, title }) => (
  <Fragment>
    <Toolbar>{title}</Toolbar>
    {/* <Toolbar title = {title} />  this is the another way of sending title bur not recomended*/}
    <main className="container">{children}</main>
  </Fragment>
);

export default Layout;
