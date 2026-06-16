import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as Icons from 'react-icons/fi'
import timelineService from '../services/timelineService'

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = Icons[item.iconName] || Icons.FiAward

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative flex gap-6 md:gap-12 items-start group ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'
      }`}
    >
      {/* Dot on the center line */}
      <div className="absolute left-[calc(50%-20px)] hidden md:flex items-center justify-center z-20">
        <motion.div
          animate={inView ? { scale: [0, 1.2, 1] } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#020005] to-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors"
        >
          <Icon />
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`flex-1 md:flex-none md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="glass p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_24px_rgba(168,85,247,0.12)] bg-white/[0.01]"
        >
          <span className="inline-block text-xs font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2">
            {item.year}
          </span>
          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{item.title}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
        </motion.div>
      </div>

      {/* Spacer for other side */}
      <div className="hidden md:block w-[calc(50%-40px)]" />

      {/* Mobile icon placeholder */}
      <div className="md:hidden w-8 h-8 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 text-sm" >
        <Icon />
      </div>
    </motion.div>
  )
}

const defaultMilestones = [
  { year: '2023', title: 'Started Programming', detail: 'Explored core computational logic, structured syntax foundations, and basic programming algorithms.', iconName: 'FiCode', order: 1 },
  { year: '2024', title: 'Web Development Journey', detail: 'Mastered frontend essentials (HTML5, CSS3, JavaScript ES6) and started building interactive user interfaces.', iconName: 'FiGlobe', order: 2 },
  { year: '2025', title: 'React & Internships', detail: 'Developed dynamic web applications with React.js, Tailwind CSS and worked as a Web Developer Intern at InnoByte Services.', iconName: 'FiBriefcase', order: 3 },
  { year: '2025', title: 'Python & AI Certifications', detail: 'Acquired certifications in Python Programming (Cisco Network Academy) and studied AI/Machine Learning models.', iconName: 'FiCpu', order: 4 },
  { year: '2026', title: 'BCA Graduation', detail: 'Expected completion of Bachelor of Computer Applications with specialized academic focus.', iconName: 'FiAward', order: 5 },
  { year: 'Future', title: 'Frontend Developer / Security Engineer', detail: 'Aiming to build premium high-performance frontend interfaces and secure network operations infrastructures.', iconName: 'FiShield', order: 6 }
]

export default function Timeline() {
  const lineRef = useRef(null)
  const inView = useInView(lineRef, { once: true })
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const data = await timelineService.getAll()
        setMilestones(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } catch (err) {
        console.error('Error fetching timeline milestones:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMilestones()
  }, [])

  const milestonesToRender = milestones.length > 0 ? milestones : defaultMilestones;

  return (
    <section id="Timeline" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">// 05 / Milestones</span>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Learning Journey</h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="text-center py-20 font-mono text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 mx-auto mb-4"></div>
            Loading timeline...
          </div>
        ) : (
          <div className="relative">
            {/* Center vertical line */}
            <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block overflow-hidden">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{ originY: 0 }}
                className="h-full w-full bg-gradient-to-b from-purple-500 via-cyan-400 to-purple-500"
              />
            </div>

            <div className="flex flex-col gap-12 relative z-10">
              {milestonesToRender.map((item, i) => (
                <TimelineItem key={item._id || i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
