import Head from "next/head";
import CharactersListPage from "../../ui/pages/CharactersListPage";

export default function Characters() {
  return (
    <>
      <Head>
        <title>Characters - StarWars List</title>
      </Head>
      <CharactersListPage />
    </>
  );
}
