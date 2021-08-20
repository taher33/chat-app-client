import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowUpRight } from "react-icons/fi";

import styles from "../styles/Home.module.scss";

interface form {
  name: string;
  room: string;
}

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Legate</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.leftSection}>
        <h1>Discover, meet new people with Legate now</h1>
        <p>
          chat with people around the world with Legate privetly or using rooms
          with ur friends
        </p>
        {/* <Link passHref href="/signup"> */}
        <button>
          Sign up <FiArrowUpRight />
        </button>
        {/* </Link> */}
      </div>
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.heroImg} src="/heroImg.png" alt="hero image" />
      }
    </div>
  );
}
