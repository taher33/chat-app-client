import { NextPage } from "next";
import Head from "next/head";

import { useAppContext } from "../state";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { IoPersonOutline } from "react-icons/io5";
import styles from "../styles/signup.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {}
interface form {
  userName: string;
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

const SignUp: NextPage<Props> = () => {
  const { user, setUser, socket } = useAppContext();
  const { register, handleSubmit, reset } = useForm<form>();
  const router = useRouter();

  useEffect(() => {
    if (user?.name) router.push("/chat");
  }, [router, user?.name]);

  const submitForm = (data: form) => {
    socket.emit("signup", data, (response: response) => {
      if (response.error) return console.log(response.error);
      setUser({
        name: response.user!.name,
        email: response.user!.email,
        id: response.user!.id,
      });
      let token = response.token as string;
      localStorage.setItem("jid", token);
    });
  };
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
          Already have an acount ?{" "}
          <Link passHref href="/login">
            <span>Login</span>
          </Link>
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <label>Username</label>
          {/* <IoPersonOutline /> */}
          <input type="text" {...register("userName")} />
          <label>
            E-mail
            <input type="email" {...register("email")} />
          </label>
          <label>
            Password <input type="password" {...register("password")} />
          </label>
          <button>SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
