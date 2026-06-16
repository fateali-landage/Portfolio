import { motion } from 'framer-motion'
import { FiBookOpen, FiCalendar, FiMapPin, FiActivity } from 'react-icons/fi'

export default function Education({ settings }) {
  const degree = settings?.degree || 'Bachelor of Computer Applications'
  const institution = settings?.institution || "KLE's Basavprabhu Kore College"
  const location = settings?.location || 'Chikodi, Karnataka'
  const duration = settings?.duration || 'Expected Graduation: 2026'
  const academicFocus = settings?.academicFocus || 'Focusing on computational foundations, structured database design, object-oriented software engineering, responsive frontend programming, and modern networking systems.'
  const coursework = settings?.coursework || [
    'Data Structures & Algorithms',
    'Web Technologies (HTML, CSS, JS, React)',
    'Database Management Systems (SQL & MongoDB)',
    'Computer Networks & Protocols',
    'Linux System Administration',
    'Object Oriented Programming (Python/Java)'
  ]

  return (
    <section id="Education" className="py-32 bg-[#04010a] relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">// Academic Background</span>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Education</h3>
        </motion.div>

        <div className="max-w-4xl mx-auto glass border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden bg-white/[0.01]">
          {/* Subtle decoration lines */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent blur-xl" />

          <div className="grid md:grid-cols-3 gap-8 items-start">
            
            {/* Degree and Institution */}
            <div className="md:col-span-2 space-y-4">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg inline-block uppercase">
                Academic Program
              </span>
              
              <h4 className="text-2xl md:text-3xl font-extrabold text-white">
                {degree}
              </h4>
              
              <p className="text-slate-300 text-lg font-medium flex items-center gap-2">
                {institution}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400 font-mono pt-2">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-cyan-400" /> {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="text-purple-400" /> {duration}
                </span>
              </div>

              <div className="pt-4 space-y-2">
                <h5 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <FiActivity className="text-cyan-400" /> Academic Focus:
                </h5>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {academicFocus}
                </p>
              </div>
            </div>

            {/* Coursework list */}
            <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 space-y-4">
              <h5 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <FiBookOpen className="text-purple-400" /> Relevant Coursework
              </h5>
              
              <ul className="space-y-2.5 text-xs font-mono text-slate-400">
                {coursework.map((course, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
