import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import styles from "../../styles/HomePage.module.scss";
import SectionTitle from "../common/SectionTitle";
import SectionDescription from "../common/SectionDescription";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <Breadcrumb />
      <SectionTitle />
      <SectionDescription />
    </div>
  );
};

export default HomePage;
