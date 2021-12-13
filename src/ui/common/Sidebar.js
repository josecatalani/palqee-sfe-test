import React from "react";
import Link from "next/link";
import styles from "../../styles/Sidebar.module.scss";

const MenuItem = ({ label, link, children }) => (
  <li className={styles.menuItem}>
    {children ? (
      <>
        {label}
        {children}
      </>
    ) : (
      <Link href={link}>
        <a>{label}</a>
      </Link>
    )}
  </li>
);

const Sidebar = () => {
  const menuList = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "StarWars",
      children: [
        {
          label: "Characters",
          link: "/characters",
        },
      ],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul>
        {menuList.map((menuItem) => {
          const { children } = menuItem;
          return (
            <MenuItem {...menuItem}>
              {children ? (
                <ul>
                  {children.map((childrenItem) => (
                    <MenuItem {...childrenItem} />
                  ))}
                </ul>
              ) : null}
            </MenuItem>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
