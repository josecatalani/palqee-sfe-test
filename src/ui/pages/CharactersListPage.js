import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import styles from "../../styles/CharactersPage.module.scss";
import Table from "../common/Table";
import SectionTitle from "../common/SectionTitle";
import SectionDescription from "../common/SectionDescription";

const CharactersPage = () => {
  return (
    <div className={styles.characters}>
      <Breadcrumb />
      <SectionTitle>Characters</SectionTitle>
      <SectionDescription />
      <Table />
    </div>
  );
};

export default CharactersPage;
