import React, { FC } from "react";
import Image from "next/image";
import { CgMenuRightAlt } from "react-icons/cg";

import styles from "../styles/navbar.module.scss";

interface Props {}

export const NavBar: FC = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Legate" width={137} height={83} />
      </div>
      <div className={styles.landingPageNav}>
        <span>Home</span>
        <span>About us</span>
        <span>FAQ</span>
      </div>
      <CgMenuRightAlt />
    </div>
  );
};
