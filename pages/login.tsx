import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import styles from "../styles/login.module.scss";

interface Props {}

const signUp: NextPage<Props> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>login</title>
        <meta name="description" content="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.leftSection}>
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/legate.png" alt="legate" />
        }
        <h1>Welcome back</h1>
        <p>
          don’t have an acount ? <span>sign up</span>
        </p>
        <form>
          <label>Username</label>
          <input type="text" name="userName" />
          <label>
            Password <input type="password" name="password" />
          </label>
          <button onClick={(e) => e.preventDefault()}>LOGIN</button>
        </form>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.wrapper}>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.logo}
              src="./legate-white.png"
              alt="legate"
            />
          }
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.ul} src="./login.png" alt="ullistartion" />
          }
        </div>
      </div>
    </div>
  );
};

export default signUp;
