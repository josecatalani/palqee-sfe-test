import Head from "next/head";
import { GET_CHARACTER } from "../../../apollo/queries";
import CharactersDetailPage from "../../../ui/pages/CharactersDetailPage";
import client from "../../../apollo/connection";

export default function CharactersDetail({ character }) {
  return (
    <>
      <Head>
        <title>Detail - StarWars List</title>
      </Head>
      <CharactersDetailPage character={character} />
    </>
  );
}
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const id = (slug || "").split("-").pop();

  const { data } = await client.query({
    query: GET_CHARACTER,
    variables: {
      id,
    },
  });

  const character = data.person;

  if (!character) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      character,
    },
  };
}
