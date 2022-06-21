import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {React,useState} from "react";
import styles from "../../styles/nav.module.css";


const Navbar = ({ username }) => {
    const router = useRouter()
    const [showNavigation,setShowNavigation] = useState(false)

    const handleSignout = () =>{

    }
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleNavigateToHome}>Home</li>
          <li className={styles.navItem2} onClick={handleNavigateToMYList}>My List</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowNavigation}>
              <p className={styles.username}>{username}</p>
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
                <Link href={'/login'}>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign out
                  </a>
                </Link>
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
