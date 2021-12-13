import React from "react";
import styles from "../../styles/Section.module.scss";

const SectionTitle = ({ children }) =>
  children ? <h1 className={styles.sectionTitle}>{children}</h1> : null;

export default SectionTitle;
