import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/Table.module.scss";

const columns = [
  {
    name: "Name",
  },
  {
    name: "Hair Color",
  },
  {
    name: "Skin Color",
  },
  {
    name: "Eye Color",
  },
  {
    name: "Gender",
  },
  {
    name: "Home world Name",
  },
];

const Table = () => {
  const [filters, setFilter] = useState({
    hairColor: "",
    eyeColor: "",
    homeWorld: "",
  });

  const rows = [
    ["Darth Vader", "Black", "White", "Blue", "Male", "Earth"],
    ["Leia Organa", "Red", "White", "Brown", "Female", "Earth"],
  ];

  const onFilterChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name, value } = target;
    setFilter({
      ...filters,
      [name]: value,
    });
  };

  const { hairColor, eyeColor, homeWorld } = filters;

  let filtered = [...rows];

  if (hairColor) {
    filtered = filtered.filter((row) =>
      row[1].toLowerCase().includes(hairColor.toLowerCase())
    );
  }

  if (eyeColor) {
    filtered = filtered.filter((row) =>
      row[3].toLowerCase().includes(eyeColor.toLowerCase())
    );
  }

  if (homeWorld) {
    filtered = filtered.filter((row) =>
      row[5].toLowerCase().includes(homeWorld.toLowerCase())
    );
  }

  const isFiltering = Object.values(filters).some(Boolean);

  return (
    <div className={styles.tableWrapper}>
      <header>
        <form className={styles.filterInputs}>
          <fieldset>
            <label>
              Hair Color:{" "}
              <input name="hairColor" type="text" onChange={onFilterChange} />
            </label>
            <label>
              Eye Color:{" "}
              <input name="eyeColor" type="text" onChange={onFilterChange} />
            </label>
            <label>
              Home world Name:{" "}
              <input name="homeWorld" type="text" onChange={onFilterChange} />
            </label>
          </fieldset>
        </form>
      </header>
      <table className={styles.table}>
        <tr>
          {columns.map((column) => (
            <th>{column.name}</th>
          ))}
        </tr>
        {filtered.length ? (
          filtered.map((row) => (
            <tr>
              {row.map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))
        ) : (
          <p>{isFiltering ? "No results with filter" : "No entries"}</p>
        )}
      </table>
      <footer className={styles.tableFooter}>
        <select name="rowsPerPage">
          <option selected value={5}>
            5
          </option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </footer>
    </div>
  );
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string),
};

export default Table;
