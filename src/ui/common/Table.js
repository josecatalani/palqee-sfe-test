import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../../styles/Table.module.scss";
import { useQuery } from "@apollo/client";
import { ALL_CHARACTERS } from "../../apollo/queries";
import { createSlugFromText } from "../../helpers/slug";

const columns = [
  {
    name: "Name",
    key: "name",
  },
  {
    name: "Hair Color",
    key: "hairColor",
  },
  {
    name: "Skin Color",
    key: "skinColor",
  },
  {
    name: "Eye Color",
    key: "eyeColor",
  },
  {
    name: "Gender",
    key: "gender",
  },
  {
    name: "Home world Name",
    key: "homeworld.name",
  },
];

const Table = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    ALL_CHARACTERS,
    {
      variables: {
        first: rowsPerPage,
      },
    }
  );

  const [filters, setFilter] = useState({
    hairColor: "",
    eyeColor: "",
    homeWorld: "",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const rows = data.allPeople.people;

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
      row.hairColor.toLowerCase().includes(hairColor.toLowerCase())
    );
  }

  if (eyeColor) {
    filtered = filtered.filter((row) =>
      row.eyeColor.toLowerCase().includes(eyeColor.toLowerCase())
    );
  }

  if (homeWorld) {
    filtered = filtered.filter((row) =>
      row.homeWorld.toLowerCase().includes(homeWorld.toLowerCase())
    );
  }

  const isFiltering = Object.values(filters).some(Boolean);

  console.log({ filtered });

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
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={`table_th_${idx}`}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((row, idx) => (
              <tr key={`table_tr_${idx}`}>
                {columns.map((column, idx) => {
                  let columnValue = row[column.key];
                  console.log({ columnValue });
                  if (column.key === "name") {
                    columnValue = (
                      <Link
                        href={`/characters/${row.id}/${createSlugFromText(
                          row.name
                        )}`}
                      >
                        <a>{row.name}</a>
                      </Link>
                    );
                  }
                  return <td key={`table_td_${idx}`}>{columnValue}</td>;
                })}
              </tr>
            ))
          ) : (
            <p>{isFiltering ? "No results with filter" : "No entries"}</p>
          )}
        </tbody>
      </table>
      <footer className={styles.tableFooter}>
        <nav>
          <button
            onClick={() => {
              refetch({
                first: undefined,
                after: undefined,
                last: rowsPerPage,
                before: data.allPeople.pageInfo.startCursor,
              });
            }}
          >
            Go to Previous page
          </button>
          <button
            onClick={() =>
              fetchMore({
                variables: {
                  first: rowsPerPage,
                  after: data.allPeople.pageInfo.endCursor,
                  before: undefined,
                },
              })
            }
          >
            Go to Next page
          </button>
        </nav>
        <div>
          <select
            name="rowsPerPage"
            onChange={(e) => {
              const newRowsPerPage = Number(e.target.value);
              setRowsPerPage(newRowsPerPage);
              refetch({ first: newRowsPerPage });
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </footer>
    </div>
  );
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string),
};

export default Table;
