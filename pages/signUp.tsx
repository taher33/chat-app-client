import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { IoPersonOutline } from "react-icons/io5";

import styles from "../styles/signup.module.scss";

interface Props {}

const signUp: NextPage<Props> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>signup</title>
        <meta name="description" content="sign up page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <img className={styles.ul} src="./signup.png" alt="ullistartion" />
          }
        </div>
      </div>
      <div className={styles.leftSection}>
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/legate.png" alt="legate" />
        }
        <h1>Create an Acount</h1>
        <p>
          Already have an acount ? <span>Login</span>
        </p>
        <form>
          <label>Username</label>
          {/* <IoPersonOutline /> */}
          <input type="text" name="userName" />
          <label>
            E-mail
            <input type="email" name="email" />
          </label>
          <label>
            Password <input type="password" name="password" />
          </label>
          <button onClick={(e) => e.preventDefault()}>SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default signUp;
