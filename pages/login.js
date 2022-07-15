import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import Router from "next/dist/server/router";
import { useRouter } from 'next/router';

const Login = () => {
   
  const [email,setEmail] = useState("")
  const [msg,setMsg] = useState("")

  const router = useRouter();

  const handleEmailChange = (e) =>{
    setMsg("")
    setEmail(e.target.value)
  }

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    if(email){
      if(email ==="arefinhossain3@gmail.com"){
        router.push('/')
      }
      else{
        setMsg("Something Went Wrong login in!");
      }
    }
    else{
      setMsg("Enter a valid Email Address")
    }
  };

  
  return (
    <div className={styles.container}>
      <Head>
        <title>NetFlix SignIn</title>
      </Head>

      <header className={styles.header}>
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
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signInHeader}>Sign In</h1>
          <input
            type="email"
            placeholder="Email Address"
            className={styles.emailInput}
            onChange = {(e) =>handleEmailChange(e)}
          />
          <p className={styles.userMsg}>{msg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
