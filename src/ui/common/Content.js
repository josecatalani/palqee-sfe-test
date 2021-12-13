import React from "react";
import Header from "./Header";
import styles from "../../styles/Content.module.scss";

const Content = ({ children }) => {
  return (
    <div className={styles.content}>
      <Header />
      {children}
    </div>
  );
};

export default Content;
