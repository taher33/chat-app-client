import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useAppContext } from "../state";

import { CgMenuRightAlt } from "react-icons/cg";
import styles from "../styles/navbar-chat.module.scss";
import Avatar from "./Avatar";

interface Props {}

export const NavBarChat: FC = (props: Props) => {
  const { user, setUser, socket } = useAppContext();

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Legate" width={89.13} height={54} />
      </div>
      <div className={styles.landingPageNav}>
        {!user?.imgUrl ? (
          <Avatar text={user!.email} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/user.jpg" alt="user image" />
        )}
      </div>
      <CgMenuRightAlt />
    </div>
  );
};
