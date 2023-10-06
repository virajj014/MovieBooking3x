"use client"
import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import HomeSlider from '@/components/HomeSlider/HomeSlider'
import MovieCarousel from '@/components/moviecarousel/MovieCarousel'

export default function Home() {

  const checkLogin = async () => {
    // let authToken = await getCookie('authToken')
    // let refreshToken = await getCookie('refreshToken')

    // console.log(authToken, refreshToken)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response)



        if (response.ok) {
          // toast(response.message, {
          //     type: 'success',
          //     position: 'top-right',
          //     autoClose: 2000
          // })

          // window.location.href = "/"


        } else {
          // toast(response.message, {
          //     type: 'error',
          //     position: 'top-right',
          //     autoClose: 2000
          // });

          window.location.href = "/auth/signin"
        }
      })
      .catch((error) => {
        window.location.href = "/auth/signin"

      })
  };

  React.useEffect(() => {
    checkLogin()
  }, [])
  return (
    <main className={styles.main}>
      <HomeSlider />
      <MovieCarousel />
    </main>
  )
}
