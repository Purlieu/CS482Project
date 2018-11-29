import React from "react";
import NavBar from "./NavBar";

export default props => {
  return (
    <div>
      <NavBar>{props.children}</NavBar>
    </div>
  );
};
