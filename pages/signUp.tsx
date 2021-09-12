import { NextPage } from "next";
import Head from "next/head";

import { useAppContext } from "../state";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { IoPersonOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/signup.module.scss";

interface Props {}
interface form {
  userName: string;
  email: string;
  password: string;
}

interface response {
  error:
    | {
        message: string;
        errors: any;
      }
    | undefined;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();
  const [apiErrors, setErrors] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user?.name) router.push("/chat");
  }, [router, user?.name]);

  const submitForm = (data: form) => {
    socket.emit("signup", data, (response: response) => {
      if (response.error) return setErrors(response.error.message);
      setUser({
        name: response.user!.name,
        email: response.user!.email,
        id: response.user!.id,
        imgUrl: undefined, // ! needs to be fixed when I implement images
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
          Already have an acount ?
          <Link passHref href="/login">
            <span>Login</span>
          </Link>
        </p>
        <span>{apiErrors}</span>
        <form onSubmit={handleSubmit(submitForm)}>
          <label>Username</label>
          {/* <IoPersonOutline /> */}
          <input
            type="text"
            {...register("userName", { required: "must specify a user name" })}
          />
          {errors.userName && <p>{errors.userName.message} </p>}
          <label>E-mail</label>
          <input
            type="email"
            {...register("email", {
              required: "must specify an email",
              pattern: {
                value: /^S+@S+.S+$/,
                message: "this is not a valid email",
              },
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
          <button>SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
