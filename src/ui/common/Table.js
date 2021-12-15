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
        last: null,
        after: null,
        before: null,
      },
    }
  );

  const [filters, setFilter] = useState({
    hairColor: "",
    eyeColor: "",
    homeWorld: "",
  });

  const [sortingByColumn, setSortingByColumn] = useState({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const rows = data.allPeople.edges.map((edge) => edge.node);

  const onFilterChange = (e) => {
    e.preventDefault();
    const { target } = e;
    const { name, value } = target;
    setFilter({
      ...filters,
      [name]: value,
    });
  };

  const sortByColumn = (column) => {
    setSortingByColumn({
      [column]: sortingByColumn[column] === 1 ? -1 : 1,
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
    filtered = filtered.filter((row) => {
      return row.homeworld.name.toLowerCase().includes(homeWorld.toLowerCase());
    });
  }
  const isFiltering = Object.values(filters).some(Boolean);
  const isSorting = Object.values(filters).length;

  if (isSorting) {
    filtered.sort((a, b) => {
      const column = Object.keys(sortingByColumn)[0];
      const ordering = sortingByColumn[column];
      const isAscending = ordering === 1;
      let elementA = a[column];
      let elementB = b[column];

      const isDeepProperty = column && column.includes(".");
      if (isDeepProperty) {
        const deepPath = column.split(".");
        elementA = deepPath.reduce(
          (acc, curr) => (acc && acc[curr] ? acc[curr] : null),
          a
        );
        elementB = deepPath.reduce(
          (acc, curr) => (acc && acc[curr] ? acc[curr] : null),
          b
        );
      }

      if (elementA < elementB) {
        return isAscending ? -1 : 1;
      }

      if (elementA > elementB) {
        return isAscending ? 1 : -1;
      }

      return 0;
    });
  }

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
            {columns.map((column, idx) => {
              const isSortingByColumn = Boolean(sortingByColumn[column.key]);
              const isSortAscending = sortingByColumn[column.key] === 1;

              let sortingOrderingClassName = () => {
                if (!isSortingByColumn) return "";
                return isSortAscending
                  ? styles.thAscending
                  : styles.thDescending;
              };

              return (
                <th
                  key={`table_th_${idx}`}
                  onClick={() => sortByColumn(column.key)}
                  className={sortingOrderingClassName()}
                >
                  <div>{column.name}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((row, idx) => (
              <tr key={`table_tr_${idx}`}>
                {columns.map((column, idx) => {
                  let columnValue = row[column.key];
                  const isDeepProperty = column.key.includes(".");
                  if (isDeepProperty) {
                    const deepPath = column.key.split(".");
                    columnValue = deepPath.reduce(
                      (acc, curr) => (acc && acc[curr] ? acc[curr] : null),
                      row
                    );
                  }
                  if (column.key === "name") {
                    columnValue = (
                      <Link
                        href={`/characters/${createSlugFromText(row.name)}-${
                          row.id
                        }`}
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
          {data.allPeople.pageInfo.hasPreviousPage ? (
            <button
              onClick={() => {
                setSortingByColumn({});
                fetchMore({
                  variables: {
                    first: null,
                    after: null,
                    last: rowsPerPage,
                    before: data.allPeople.pageInfo.startCursor || null,
                  },
                });
              }}
            >
              Go to Previous page
            </button>
          ) : null}
          {data.allPeople.pageInfo.hasNextPage ? (
            <button
              onClick={() => {
                setSortingByColumn({});
                fetchMore({
                  variables: {
                    first: rowsPerPage,
                    after: data.allPeople.pageInfo.endCursor,
                    last: null,
                    before: null,
                  },
                });
              }}
            >
              Go to Next page
            </button>
          ) : null}
        </nav>
        <div>
          <select
            name="rowsPerPage"
            onChange={(e) => {
              const newRowsPerPage = Number(e.target.value);
              setSortingByColumn({});
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
