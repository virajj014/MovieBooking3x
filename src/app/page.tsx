"use client"
import Image from 'next/image'
import styles from './page.module.css'
import HomeSlider from '@/components/HomeSlider/HomeSlider'
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel'

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeSlider />
      <MovieCarousel/>
    </main>
  )
}
