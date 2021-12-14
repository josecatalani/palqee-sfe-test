import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Breadcrumb.module.scss";

const BreadcrumbItem = ({ label, link }) => (
  <li className={styles.breadcrumbItem}>
    <Link href={link}>
      <a>{label}</a>
    </Link>
  </li>
);

const Breadcrumb = ({ characterSlug }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
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
        link: `/characters/${characterSlug}`,
      },
    };
    const routes = router.asPath.split("/");
    setBreadcrumbs(routes.map((routeItem) => dictionary[routeItem]));
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
