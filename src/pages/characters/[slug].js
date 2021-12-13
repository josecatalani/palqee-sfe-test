import Head from "next/head";
import CharactersPage from "../../ui/pages/CharactersPage";

export default function CharactersDetail() {
  return (
    <>
      <Head>
        <title>Detail - StarWars List</title>
      </Head>
      <CharactersPage />
    </>
  );
}
