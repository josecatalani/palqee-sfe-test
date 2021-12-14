import React from "react";
import styles from "../../styles/Content.module.scss";
import Header from "./Header";

const Content = ({ children }) => {
  return (
    <section className={styles.content}>
      <Header />
      {children}
    </section>
  );
};

export default Content;
