import { motion } from 'framer-motion'
import * as Icons from 'react-icons/fi'

export default function CurrentlyLearning({ settings }) {
  const defaultTopics = [
    {
      iconName: 'FiCode',
      title: 'Advanced React',
      desc: 'Custom hooks, performance optimization, context architectures',
      color: '#61DAFB'
    },
    {
      iconName: 'FiTerminal',
      title: 'Python Development',
      desc: 'Automation tools, parsing JSON/CSV data files, script writing',
      color: '#3776AB'
    },
    {
      iconName: 'FiShield',
      title: 'Cybersecurity Fundamentals',
      desc: 'OWASP risk patterns, defensive programming, penetration logs checks',
      color: '#ef4444'
    },
    {
      iconName: 'FiBook',
      title: 'Linux Administration',
      desc: 'User permissions settings, process managers, cron scheduler automation',
      color: '#FCC624'
    },
    {
      iconName: 'FiGlobe',
      title: 'Networking Concepts',
      desc: 'TCP/IP diagnostics, local routing models, port checking utilities',
      color: '#3b82f6'
    }
  ]

  const topics = settings?.learningItems && settings.learningItems.length > 0
    ? settings.learningItems
    : defaultTopics

  return (
    <section id="Learning" className="py-24 bg-[#020005] relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-cyan-400 font-mono uppercase mb-4">06 / Continuous Study</p>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">Currently Learning</h3>
          <div className="h-0.5 w-16 bg-cyan-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {topics.map((topic, index) => {
            const Icon = Icons[topic.iconName] || Icons.FiCode
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass border border-white/5 hover:border-cyan-500/20 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.06)] bg-white/2 relative group"
              >
                <div className="space-y-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg border"
                    style={{ color: topic.color, borderColor: `${topic.color}25`, background: `${topic.color}08` }}
                  >
                    <Icon />
                  </div>
                  <h4 className="font-bold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {topic.desc || topic.status}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-mono font-bold text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>IN PROGRESS</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
