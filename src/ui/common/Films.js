import React from "react";
import styles from "../../styles/Films.module.scss";

const Films = ({ list }) => {
  return (
    <div className={styles.films}>
      {list.map((item) => {
        const { title, episodeID, director, producers, releaseDate } = item;
        return (
          <div className={styles.filmItem} key={`film_${title}`}>
            <div>
              <h2>{title}</h2>
              {episodeID && (
                <p>
                  <b>Episode</b>: {episodeID}
                </p>
              )}
              {director && (
                <p>
                  <b>Director</b>: {director}
                </p>
              )}
              {producers && (
                <p>
                  <b>Producers</b>: {producers.join(", ")}
                </p>
              )}
              {releaseDate && (
                <p>
                  <b>Release Date:</b>{" "}
                  {new Date(releaseDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Films;
