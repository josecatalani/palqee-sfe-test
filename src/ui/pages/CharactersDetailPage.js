import React from "react";
import Breadcrumb from "../common/Breadcrumb";
import styles from "../../styles/CharactersPage.module.scss";
import SectionTitle from "../common/SectionTitle";
import SectionDescription from "../common/SectionDescription";
import Films from "../common/Films";

const CharactersDetailPage = ({ character }) => {
  const {
    name,
    filmConnection: { films },
  } = character;
  return (
    <div className={styles.characters}>
      <Breadcrumb characterSlug={name} />
      {name && <SectionTitle>{name}</SectionTitle>}
      <SectionDescription />
      {films && <Films list={films} />}
    </div>
  );
};

export default CharactersDetailPage;
