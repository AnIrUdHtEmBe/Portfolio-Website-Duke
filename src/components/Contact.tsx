'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight, X, Send } from 'lucide-react'

function EmailModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fromEmail, setFromEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSending(true)
    // Open the user's mail client with pre-filled fields
    const mailtoLink = `mailto:anirudhat797@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${fromEmail}\n\n${body}`)}`
    window.open(mailtoLink, '_self')
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setTimeout(() => {
        setSent(false)
        onClose()
        setFromEmail('')
        setSubject('')
        setBody('')
      }, 2000)
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0A0A0A] shadow-[0_0_60px_rgba(255,107,0,0.1)] overflow-hidden">
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ktm/60 to-transparent" />

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-ktm/10 border border-ktm/20">
                    <Mail size={16} className="text-ktm" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-white text-sm">Send a Message</h3>
                    <p className="font-mono text-white/30 text-[10px] tracking-wider">anirudhat797@gmail.com</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <div className="p-5 space-y-4">
                <div>
                  <label className="font-mono text-white/30 text-[10px] uppercase tracking-widest mb-1.5 block">Your Email</label>
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white font-grotesk text-sm placeholder:text-white/20 focus:outline-none focus:border-ktm/40 focus:shadow-[0_0_12px_rgba(255,107,0,0.08)] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="font-mono text-white/30 text-[10px] uppercase tracking-widest mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white font-grotesk text-sm placeholder:text-white/20 focus:outline-none focus:border-ktm/40 focus:shadow-[0_0_12px_rgba(255,107,0,0.08)] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="font-mono text-white/30 text-[10px] uppercase tracking-widest mb-1.5 block">Message</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your message..."
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white font-grotesk text-sm placeholder:text-white/20 focus:outline-none focus:border-ktm/40 focus:shadow-[0_0_12px_rgba(255,107,0,0.08)] transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0">
                <button
                  onClick={handleSend}
                  disabled={!fromEmail || !subject || !body || sending}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ktm text-black font-syne font-bold text-sm hover:bg-ktm-hi transition-all duration-200 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_40px_rgba(255,107,0,0.5)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ktm disabled:hover:shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                >
                  {sent ? (
                    'Mail Client Opened ✓'
                  ) : sending ? (
                    'Opening...'
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [emailModalOpen, setEmailModalOpen] = useState(false)

  return (
    <>
      <section id="contact" className="py-28 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,107,0,0.05)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="font-mono text-ktm text-xs tracking-[0.4em] uppercase mb-3">Get In Touch</p>
            <h2 className="font-syne font-black text-4xl md:text-5xl text-white mb-4">Let&apos;s Build Something</h2>
            <p className="text-white/40 font-grotesk text-base max-w-md mx-auto mb-12">
              Open to full-time roles, freelance, and interesting side projects.
            </p>

            {/* Contact cards */}
            <div className="flex flex-col items-center gap-4 mb-12">
              <button
                onClick={() => setEmailModalOpen(true)}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-[#0A0A0A] hover:border-ktm/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,0,0.08)] text-left w-full max-w-sm cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-ktm/10 border border-ktm/20 group-hover:bg-ktm/20 transition-colors">
                  <Mail size={18} className="text-ktm" />
                </div>
                <div>
                  <p className="font-mono text-white/30 text-[10px] uppercase tracking-widest">Email</p>
                  <p className="font-grotesk text-white text-sm mt-0.5">anirudhat797@gmail.com</p>
                </div>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-ktm ml-auto transition-colors" />
              </button>
            </div>

            {/* Social */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://github.com/AnIrUdHtEmBe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/50 font-grotesk text-sm hover:border-white/30 hover:text-white transition-all duration-200"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/anirudh-tembe-0bb6a0233"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ktm/30 text-ktm font-grotesk text-sm hover:bg-ktm/10 transition-all duration-200"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Modal */}
      <EmailModal isOpen={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
    </>
  )
}
