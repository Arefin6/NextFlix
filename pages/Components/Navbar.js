import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {React,useEffect,useState} from "react";
import styles from "../../styles/nav.module.css";
import { magic } from './../../libs/magic-Client';


const Navbar = () => {
    const router = useRouter()
    const [showNavigation,setShowNavigation] = useState(false)
    const [userName,setUserName] = useState('')
    const [didToken, setDidToken] = useState("");


    useEffect(()=>{
          const getUserData = async() =>{
            try {
              const {email} = await magic.user.getMetadata()
              const didToken = await magic.user.getIdToken();
              if(email){
                setUserName(email)
                setDidToken(didToken)
              }
             } catch (error) {
              console.error("Error Retriving User Email",error)
             }
          }
          getUserData()
    },[]) 

    const handleSignOut = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${didToken}`,
            "Content-Type": "application/json",
          },
        });
  
        const res = await response.json();
      } catch (error) {
        console.error("Error logging out", error);
        router.push("/login");
      }
    };
    const handleNavigateToHome = (e) =>{
      e.preventDefault()
      router.push('/')
    }
    const handleNavigateToMYList = (e) =>{
      e.preventDefault();
      router.push('/browse/my-List')
    }

    const handleShowNavigation = () =>{
       setShowNavigation(!showNavigation)
    }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header>
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
        </header>
        <ul className={styles.navItems}>
          {/* <li className={styles.navItem} onClick={handleNavigateToHome}>Home</li> */}
          {/* <li className={styles.navItem2} onClick={handleNavigateToMYList}>My List</li> */}
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowNavigation}>
              <p className={styles.username}>{userName}</p>
              <Image
               src="/static/expand_more.svg"
               alt="expand Iogo"
               width={24}
               height={24}
            />
            </button>
            { showNavigation && (
            <div className={styles.navDropdown}>
              <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
