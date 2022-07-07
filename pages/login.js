import Head from "next/head";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Login.module.css";

const Login = () => {
  return (
    <div>
      <Head>
        <title>NetFlix SignIn</title>
      </Head>

      <header>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/Netflix.svg"
                alt="Netfix Iogo"
                width={144}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Login;
