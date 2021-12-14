import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Breadcrumb.module.scss";

const BreadcrumbItem = ({ label, link }) => (
  <li className={styles.breadcrumbItem}>
    {link ? (
      <Link href={link}>
        <a>{label}</a>
      </Link>
    ) : (
      label
    )}
  </li>
);

const Breadcrumb = ({ characterSlug }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    console.log({ router });
    if (router.asPath === "/") return [];
    const dictionary = {
      "": {
        label: "Home",
        link: "/",
      },
      characters: {
        label: "Characters List",
        link: "/characters/",
      },
      "[slug]": {
        label: characterSlug || "Character Detail",
      },
    };
    const routes = router.route.split("/");
    let crumbs = routes.map((routeItem) => dictionary[routeItem]);
    setBreadcrumbs(crumbs);
  }, []);

  if (!breadcrumbs.length) return null;

  return (
    <div className={styles.breadcrumb}>
      <ul className={styles.breadcrumbList}>
        {breadcrumbs.map((crumb, idx) => (
          <BreadcrumbItem key={`breadcrumb_item_${idx}`} {...crumb} />
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
