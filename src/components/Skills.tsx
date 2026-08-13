'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Layers, Brain, Database, Cloud, Wifi } from 'lucide-react'

interface SkillData {
  category: string
  icon: React.ReactNode
  color: string
  items: string[]
  span: string
}

const SKILLS: SkillData[] = [
  {
    category: 'Languages',
    icon: <Code2 size={20} className="text-ktm" />,
    color: '#FF6B00',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash', 'PowerShell', 'HTML', 'CSS'],
    span: 'col-span-1',
  },
  {
    category: 'Frameworks',
    icon: <Layers size={20} className="text-violet-400" />,
    color: '#8B5CF6',
    items: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'React Native', 'Vite', 'Framer Motion', 'Aceternity UI', 'Tailwind CSS', 'Canvas API', 'FFmpeg'],
    span: 'col-span-1 md:col-span-2',
  },
  {
    category: 'AI / ML',
    icon: <Brain size={20} className="text-blue-400" />,
    color: '#3B82F6',
    items: ['OpenAI API', 'Claude Code', 'Antigravity', 'RAG', 'LangChain', 'MediaPipe', 'NumPy', 'Vector Embeddings'],
    span: 'col-span-1 md:col-span-2',
  },
  {
    category: 'Databases',
    icon: <Database size={20} className="text-emerald-400" />,
    color: '#10B981',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'pgvector', 'Redis', 'Alembic'],
    span: 'col-span-1',
  },
  {
    category: 'Cloud / Infra',
    icon: <Cloud size={20} className="text-sky-400" />,
    color: '#0EA5E9',
    items: ['AWS EC2', 'AWS S3', 'AWS CloudFront', 'GCP', 'Docker', 'Nginx', 'Cloudflare', 'MediaMTX', 'NVIDIA NVENC', 'JWT', 'Google OAuth', 'Linux'],
    span: 'col-span-1 md:col-span-2',
  },
  {
    category: 'Realtime',
    icon: <Wifi size={20} className="text-ktm" />,
    color: '#FF6B00',
    items: ['WebSocket', 'Socket.IO', 'Ably Chat SDK', 'HLS', 'WebRTC', 'UDP', 'TCP'],
    span: 'col-span-1',
  },
]

interface SkillCardProps {
  skill: SkillData
  index: number
}

function SkillCard({ skill, index }: SkillCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`${skill.span} relative rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-5 hover:border-white/[0.12] transition-all duration-300 group overflow-hidden`}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle, ${skill.color}40, transparent)` }}
      />

      <div className="flex items-center gap-3 mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ background: `${skill.color}12`, border: `1px solid ${skill.color}25` }}
        >
          {skill.icon}
        </div>
        <h3 className="font-syne font-bold text-white text-sm">{skill.category}</h3>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skill.items.map((item, ii) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.08 + ii * 0.04 }}
            className="px-2.5 py-1 rounded-lg font-mono text-xs text-white/60 bg-white/[0.04] border border-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-200 cursor-default"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section id="skills" className="py-28 bg-[#030303] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-ktm text-xs tracking-[0.4em] uppercase mb-3">Tool Kit</p>
          <h2 className="font-syne font-black text-4xl md:text-5xl text-white">Skills</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-ktm to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SKILLS.map((skill, si) => (
            <SkillCard key={skill.category} skill={skill} index={si} />
          ))}
        </div>
      </div>
    </section>
  )
}
