import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import styles from "../../styles/CharactersPage.module.scss";
import Table from "../common/Table";

const CharactersPage = () => {
  return (
    <div className={styles.characters}>
      <Breadcrumb />
      <h1>Characters List</h1>
      <Table />
    </div>
  );
};

export default CharactersPage;
