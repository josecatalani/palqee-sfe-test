import React, { useState } from "react";
import Link from "next/link";
import MenuList from "../../helpers/menu-list";
import styles from "../../styles/Sidebar.module.scss";

const MenuItem = ({ label, link, children, ...rest }) => (
  <li {...rest}>
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
  const [isOpened, setIsOpened] = useState({});

  const onChange = (key, value) =>
    setIsOpened({ ...isOpened, ...{ [key]: value } });

  return (
    <aside className={styles.sidebar}>
      <ul>
        {MenuList.map((menuItem, idx) => {
          const { children } = menuItem;
          const key = menuItem.label.toLowerCase();
          const value = Boolean(isOpened[key]);
          let rootMenuClass = "";

          if (children) {
            rootMenuClass = value
              ? styles.isMenuItemOpened
              : styles.isMenuItemClosed;
          }

          return (
            <MenuItem
              key={`menu_item_root_${idx}`}
              onClick={() => {
                children && onChange(key, !value);
              }}
              className={`${styles.menuItem} ${rootMenuClass}`}
              {...menuItem}
            >
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
