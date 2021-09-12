import React, { useEffect } from "react";

import { BiX } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import styles from "../styles/dialog.module.scss";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function Dialog(props: Props): JSX.Element {
  //ui
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <BiX onClick={() => props.setShow(false)} />
        <h2>Legate</h2>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.actionsWrapper}>
        <div className={styles.action}>
          <CgProfile />
          change profile picture
        </div>
        <div className={styles.action}>
          <AiOutlineLogout />
          logout
        </div>
      </div>
    </div>
  );
}

export default Dialog;
