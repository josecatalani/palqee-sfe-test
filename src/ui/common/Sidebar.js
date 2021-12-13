import React from "react";
import Link from "next/link";
import MenuList from "../../helpers/menu-list";
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
  return (
    <aside className={styles.sidebar}>
      <ul>
        {MenuList.map((menuItem, idx) => {
          const { children } = menuItem;
          return (
            <MenuItem key={`menu_item_root_${idx}`} {...menuItem}>
              {children ? (
                <ul>
                  {children.map((childrenItem) => (
                    <MenuItem
                      key={`menu_item_children_${idx}`}
                      {...childrenItem}
                    />
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
