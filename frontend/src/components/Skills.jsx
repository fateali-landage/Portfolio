import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaLinux, FaPython, FaNetworkWired
} from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io5'
import {
  SiTailwindcss, SiFramer, SiExpress, SiMongodb, SiMysql,
  SiVscodium, SiVercel, SiNumpy, SiPandas, SiScikitlearn, SiPytorch
} from 'react-icons/si'
import { FiCode, FiShield, FiCpu, FiTrendingUp } from 'react-icons/fi'
import skillService from '../services/skillService'

const iconMap = {
  'html5': FaHtml5,
  'css3': FaCss3Alt,
  'javascript': IoLogoJavascript,
  'react.js': FaReact,
  'tailwind css': SiTailwindcss,
  'node.js': FaNodeJs,
  'express.js': SiExpress,
  'python': FaPython,
  'mongodb': SiMongodb,
  'numpy': SiNumpy,
  'pandas': SiPandas,
  'machine learning fundamentals': SiScikitlearn,
  'deep learning fundamentals': SiPytorch,
  'linux fundamentals': FaLinux,
  'networking fundamentals': FaNetworkWired,
  'security concepts': FiShield,
  'tryhackme learning': FiShield,
  'git': FaGitAlt,
  'github': FaGithub,
  'vs code': SiVscodium,
  'wordpress': FiCode
}

function ProgressBar({ level, color, inView }) {
  return (
    <div className="relative h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0] } : {}}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="absolute inset-y-0 left-0 w-full rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
        }}
      />
    </div>
  )
}

function SkillRow({ skill, index, accentColor, inView }) {
  const IconComponent = iconMap[skill.name.toLowerCase()] || FiCode

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
      className="group flex items-center gap-4"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white/5"
        style={{ border: `1px solid ${skill.color}30` }}
      >
        <IconComponent className="text-xl" style={{ color: skill.color }} />
      </motion.div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.08 }}
            className="text-xs font-mono tabular-nums"
            style={{ color: accentColor }}
          >
            {skill.level}%
          </motion.span>
        </div>
        <ProgressBar level={skill.level} color={skill.color} inView={inView} />
      </div>
    </motion.div>
  )
}

function CategoryCard({ cat, cardIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: cardIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative group h-full flex flex-col"
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${cat.accentColor}40, transparent, ${cat.accentColor}20)` }}
      />

      <div
        className="relative glass rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#020005]/80 flex flex-col h-full flex-1"
        style={{ borderColor: cat.borderColor }}
      >
        {/* Floating gradient orb inside card */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${cat.accentColor}60, transparent)` }}
        />

        {/* Header */}
        <div
          className="relative px-8 pt-8 pb-6 bg-white/[0.01]"
          style={{ borderBottom: `1px solid ${cat.borderColor}` }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 + cardIndex * 0.12 }}
            className="text-[10px] font-mono tracking-[0.3em] mb-2 block uppercase"
            style={{ color: cat.accentColor }}
          >
            Domain {String(cardIndex + 1).padStart(2, '0')}
          </motion.span>

          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 + cardIndex * 0.12, duration: 0.5 }}
            className="text-lg font-bold text-white mb-1"
          >
            {cat.label}
          </motion.h4>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 + cardIndex * 0.12 }}
            className="text-xs text-slate-500"
          >
            {cat.tagline}
          </motion.p>

          {/* Skill count badge */}
          <div
            className="absolute top-8 right-8 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border"
            style={{ background: `${cat.accentColor}10`, color: cat.accentColor, borderColor: `${cat.accentColor}30` }}
          >
            {cat.skills.length}
          </div>
        </div>

        {/* Skills list */}
        <div className="px-8 py-7 flex flex-col gap-5 flex-1 justify-start">
          {cat.skills.map((skill, i) => (
            <SkillRow
              key={skill._id || skill.name}
              skill={skill}
              index={i}
              accentColor={cat.accentColor}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'programming', label: 'Programming' },
  { id: 'database', label: 'Database' },
  { id: 'ai-ml', label: 'AI & ML' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'tools', label: 'Tools' },
]

export default function Skills() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const [activeTab, setActiveTab] = useState('all')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const categoryMeta = {
    frontend: {
      label: 'Frontend Development',
      tagline: 'Interfaces that live in browsers',
      accentColor: '#a855f7',
      borderColor: 'rgba(168,85,247,0.25)',
    },
    backend: {
      label: 'Backend Development',
      tagline: 'Logic, APIs & servers',
      accentColor: '#06b6d4',
      borderColor: 'rgba(6,182,212,0.25)',
    },
    programming: {
      label: 'Programming Languages',
      tagline: 'Core structured syntax',
      accentColor: '#3b82f6',
      borderColor: 'rgba(59,130,246,0.25)',
    },
    database: {
      label: 'Database Management',
      tagline: 'Persistent data layers',
      accentColor: '#10b981',
      borderColor: 'rgba(16,185,129,0.25)',
    },
    'ai-ml': {
      label: 'AI & Machine Learning',
      tagline: 'NumPy, Pandas & ML algorithms',
      accentColor: '#ec4899',
      borderColor: 'rgba(236,72,153,0.25)',
    },
    cybersecurity: {
      label: 'Cybersecurity Fundamentals',
      tagline: 'Defending networking systems',
      accentColor: '#ef4444',
      borderColor: 'rgba(239,68,68,0.25)',
    },
    tools: {
      label: 'Tools & Technologies',
      tagline: 'Ecosystem sharpening workflow',
      accentColor: '#f59e0b',
      borderColor: 'rgba(245,158,11,0.25)',
    }
  }

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillService.getAll()
        
        // Group skills by category
        const grouped = Object.keys(categoryMeta).map(catId => {
          const meta = categoryMeta[catId]
          const catSkills = data.filter(s => s.category === catId)
          return {
            id: catId,
            ...meta,
            skills: catSkills
          }
        }).filter(c => c.skills.length > 0)
        
        setCategories(grouped)
      } catch (err) {
        console.error('Error fetching skills:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const filtered = activeTab === 'all'
    ? categories
    : categories.filter((c) => c.id === activeTab)

  const activeCat = categories.find((c) => c.id === activeTab)
  const tabAccent = activeTab === 'all' ? '#a855f7' : activeCat?.accentColor

  // Count skills dynamically
  const totalSkills = categories.reduce((sum, cat) => sum + cat.skills.length, 0)
  const domainsCount = categories.length

  return (
    <section id="Skills" className="py-32 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-700/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-cyan-700/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block"
          >
            // Expertise
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Skills Inventory
          </motion.h3>

          {/* Decorative animated line */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ originX: 1 }}
              className="h-px w-24 bg-gradient-to-l from-purple-500 to-transparent"
            />
            <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.9)]" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ originX: 0 }}
              className="h-px w-24 bg-gradient-to-r from-cyan-500 to-transparent"
            />
          </div>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="relative flex flex-wrap justify-center items-center gap-2 p-1.5 glass rounded-2xl border border-white/5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const cat = categories.find((c) => c.id === tab.id)
              const color = tab.id === 'all' ? '#a855f7' : cat?.accentColor
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-200 focus:outline-none cursor-pointer"
                  style={{ color: isActive ? '#fff' : '#64748b' }}
                >
                  {/* Sliding active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-pill-skills"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                        border: `1px solid ${color}40`,
                        boxShadow: `0 0 14px ${color}15`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab.label}
                    {tab.id !== 'all' && cat && (
                      <span
                        className="text-[10px] px-1 py-0.5 rounded font-mono"
                        style={{
                          background: isActive ? `${color}25` : 'rgba(255,255,255,0.05)',
                          color: isActive ? color : '#475569',
                        }}
                      >
                        {cat.skills.length}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Animated card grid */}
        {loading ? (
          <div className="text-center py-20 font-mono text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 mx-auto mb-4"></div>
            Loading skills inventory...
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 xl:gap-8 ${
              filtered.length === 1
                ? 'max-w-2xl mx-auto'
                : filtered.length === 2
                ? 'md:grid-cols-2 max-w-4xl mx-auto'
                : 'md:grid-cols-2 xl:grid-cols-3'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col h-full"
                >
                  <CategoryCard cat={cat} cardIndex={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  )
}
