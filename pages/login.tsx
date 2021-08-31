import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../state";

import styles from "../styles/login.module.scss";

interface Props {}

interface Form {
  email: string;
  password: string;
}
interface response {
  error: string | undefined;
  user:
    | {
        name: string;
        email: string;
        id: string;
      }
    | undefined;
}

const Login: NextPage<Props> = () => {
  const { user, setUser, socket } = useAppContext();
  const { register, handleSubmit, reset } = useForm<Form>();

  const submitForm = (data: Form) => {
    socket.emit("login", data, (response: response) => {
      if (response.error) return console.log(response.error);
      setUser({
        name: response.user!.name,
        email: response.user!.email,
        id: response.user!.id,
      });
      console.log(response.user);
    });
  };

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
        <form onSubmit={handleSubmit(submitForm)}>
          <label>E-mail</label>
          <input type="text" {...register("email")} />
          <label>
            Password <input type="password" {...register("password")} />
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

export default Login;
