import React, { useEffect, useState } from "react";
import styles from "../../styles/Section.module.scss";

const SectionDescription = () => {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchRandomQuote() {
      try {
        setIsLoading(true);
        let randomQuote = await fetch(
          "https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote"
        );

        randomQuote = await randomQuote.json();

        setQuote(randomQuote.content || "");
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }

    fetchRandomQuote();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }
  
  return quote ? (
    <blockquote className={styles.sectionDescription}>
      <p>{quote}</p>
    </blockquote>
  ) : null;
};

export default SectionDescription;
