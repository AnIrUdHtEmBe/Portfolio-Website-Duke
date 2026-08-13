'use client'
import { useState, useCallback } from 'react'
import PageLoader from '@/components/PageLoader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <PageLoader onComplete={handleLoaderComplete} />
      {loaded && (
        <main className="min-h-screen bg-black">
          <Navbar />
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  )
}
