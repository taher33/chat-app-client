import React from "react";

import styles from "../styles/avatar.module.scss";

interface Props {
  text: string;
}

function Avatar(props: Props): JSX.Element {
  let firstLetter = "";
  if (props.text) {
    firstLetter = props.text.split("")[0];
  }
  console.log(props);
  return (
    <div className={styles.wrapper}>
      <h3>{firstLetter}</h3>{" "}
    </div>
  );
}

export default Avatar;
