import Head from "next/head";
import CharactersPage from "../../ui/pages/CharactersPage";

export default function Characters() {
  return (
    <>
      <Head>
        <title>Characters - StarWars List</title>
      </Head>
      <CharactersPage />
    </>
  );
}
