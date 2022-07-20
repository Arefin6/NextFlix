/* eslint-disable react-hooks/exhaustive-deps */
import '../styles/globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../libs/magic-Client';
import Loading from './Components/Loading';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading,setLoading] = useState(false)
  useEffect(()=>{
    // const checkIfLoggedIn = async() =>{
    //   const isLoggedIn = await magic.user.isLoggedIn() 
    //   if(isLoggedIn){
    //     router.push('/')
    //   } 
    //   else{
    //     router.push('/login')
    //   }
    // }
    // checkIfLoggedIn()    
  },[])

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

  return isLoading ? <Loading></Loading> :<Component {...pageProps} />
}

export default MyApp
