import React from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";

export default ({ children }) => {
  return (
    <div id="app">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
};
