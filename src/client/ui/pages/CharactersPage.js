import React from "react";
import { useQuery } from "@apollo/client";
import Breadcrumb from "../common/Breadcrumb";
import styles from "../../styles/CharactersPage.module.scss";
import Table from "../common/Table";
import { ALL_FILMS } from "../../apollo/queries";

const CharactersPage = () => {
  const { loading, error, data } = useQuery(ALL_FILMS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log({ data });

  return (
    <div className={styles.characters}>
      <Breadcrumb />
      <h1>Characters List</h1>
      <Table />
    </div>
  );
};

export default CharactersPage;
