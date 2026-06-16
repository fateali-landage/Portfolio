import { motion } from 'framer-motion'
import * as Icons from 'react-icons/fi'

export default function AchievementsGoals({ settings }) {
  const defaultItems = [
    { title: 'Completed Multiple Web Development Internships', desc: 'Completed internships at Prodigy InfoTech and The Developers Arena, gaining hands-on industrial web development experience.' },
    { title: 'Qualified ICAT with AIR 311', desc: 'Scored 63 on the Internship Common Aptitude Test, ranking in the top tier nationally.' },
    { title: 'Cisco Python Essentials Certification', desc: 'Certified in core Python, covering file streams operations, structured logic, and exception handlers.' },
    { title: 'Advanced Machine Learning Training', desc: 'Mastered Pandas, NumPy, Regression models, Random Forest, Decision Trees, and Deep Learning basics.' },
    { title: 'Elements of AI Certification', desc: 'Studied Artificial Intelligence methodologies, ethical impacts, and algorithms systems under University of Helsinki.' },
    { title: 'Gemini Certified Student', desc: 'Certified by Google for Education in using AI tools and Generative AI structures.' },
    { title: 'Participated in Bengaluru GAFX 2026', desc: 'Joined the leading design, animation, and visual effects convention to study emerging graphics technology.' },
    { title: 'Built Multiple Frontend & MERN Projects', desc: 'Successfully created Kanban boards, expense trackers, responsive Batman navigation systems, and weather portals.' },
    { title: 'Delivered Technical Seminar on Requirement Validation', desc: 'Presented validation methods, constraints mappings, and prototyping tools for product development requirements.' }
  ]

  const items = settings?.achievementsList && settings.achievementsList.length > 0
    ? settings.achievementsList
    : defaultItems

  const achievementIcons = [
    Icons.FiAward,
    Icons.FiStar,
    Icons.FiBook,
    Icons.FiCheckCircle,
    Icons.FiTarget,
    Icons.FiActivity,
    Icons.FiCpu
  ]

  return (
    <section id="Goals" className="py-24 bg-[#04010a] relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-purple-400 font-mono uppercase mb-4">07 / Record</p>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Achievements &amp; Activities</h3>
          <div className="h-0.5 w-16 bg-purple-500 mx-auto mt-6" />
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {items.map((item, index) => {
            const SelectedIcon = achievementIcons[index % achievementIcons.length]
            
            return (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass border border-white/5 hover:border-purple-500/20 p-6 rounded-2xl flex gap-4 transition-all bg-white/1"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">
                  <SelectedIcon />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-bold text-white leading-snug break-words">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed break-words font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
