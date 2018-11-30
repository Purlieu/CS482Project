import React from "react";
import NavBar from "./navBar/NavBar";

export default props => {
  return (
    <div>
      <NavBar>{props.children}</NavBar>
    </div>
  );
};
