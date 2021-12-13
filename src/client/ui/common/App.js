import React from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";

const App = ({ children }) => {
  return (
    <div id="app">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
};

export default App;
