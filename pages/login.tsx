import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
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
  token: string | undefined;
}

const Login: NextPage<Props> = () => {
  const { user, setUser, socket } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const router = useRouter();
  //checks if user exists
  useEffect(() => {
    if (user?.name) router.push("/chat");
  }, [router, user?.name]);

  const submitForm = (data: Form) => {
    socket.emit("login", data, (response: response) => {
      if (response.error) return console.log(response.error);
      setUser({
        name: response.user!.name,
        email: response.user!.email,
        id: response.user!.id,
        imgUrl: undefined,
      });
      let token = response.token as string;
      localStorage.setItem("jid", token);
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
          don’t have an acount ?
          <Link href="/signUp" passHref>
            <span>sign up</span>
          </Link>
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <label>E-mail</label>
          <input
            type="text"
            {...register("email", {
              required: "must specify email",
              // pattern: {
              //   value: /^S+@S+.S+$/,
              //   message: "this is not a valid email",
              // },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "must specify a password",
              minLength: {
                value: 8,
                message: "password must be longer then 8 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <button>LOGIN</button>
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
