import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import { useRouter } from 'next/router';
import { magic } from "../libs/magic-Client";

const Login = () => {
   
  const [email,setEmail] = useState("")
  const [msg,setMsg] = useState("")
  const [isLoading,setLoading] = useState(false)

  const router = useRouter();

  const handleEmailChange = (e) =>{
    setMsg("")
    setEmail(e.target.value)
  }

   useEffect(()=>{
     const handleComplete = () =>{
      setLoading(false)
     }
     router.events.on("routeChangeComplete",handleComplete)
     router.events.on("routeChangeError",handleComplete)
     return () =>{
      router.events.off("routeChangeComplete",handleComplete)
      router.events.off("routeChangeError",handleComplete)
     }
    
   },[router])

  const handleLoginWithEmail = async(e) => {
    e.preventDefault();
    if(email){  
       try {
        setLoading(true)
        const didToken = await magic.auth.loginWithMagicLink({email})
        console.log({didToken})
        if(didToken){
          const response =  await fetch('/api/login',{
            method:"POST",
            headers:{
              Authorization:`Bearer ${didToken}`,
              "Content-Type": "Application/json",
            }
          })
          const loggedInResponse = await response.json()
          if(loggedInResponse.done){
            router.push('/')
          }
          else{
            setLoading(false)
            setMsg("Something went wrong logging in!")
          }
         
        }
       } catch (error) {
        setLoading(false)
        console.error(error)
       }
    }
    else{
      setLoading(false)
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
            {isLoading ?"Loading...":"Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
