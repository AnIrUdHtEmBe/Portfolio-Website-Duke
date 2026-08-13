'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'My Duke', href: '/bike' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,107,0,0.08)]'
          : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-ktm/10 border border-ktm/30 flex items-center justify-center group-hover:bg-ktm/20 group-hover:border-ktm/60 transition-all duration-300">
            <span className="font-syne font-black text-ktm text-sm">AT</span>
          </div>
          <span className="font-syne font-bold text-white/80 group-hover:text-white transition-colors hidden sm:block">
            Anirudh
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            link.href.startsWith('/') ? (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-3 py-1.5 text-sm font-grotesk text-white/50 hover:text-ktm transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-ktm scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3 py-1.5 text-sm font-grotesk text-white/50 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-ktm scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            )
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/AnIrUdHtEmBe"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/anirudh-tembe-0bb6a0233"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-white/40 hover:text-ktm hover:bg-ktm/5 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
