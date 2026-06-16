import { motion } from 'framer-motion'
import * as Icons from 'react-icons/fi'

export default function About({ settings }) {
  const aboutBio = settings?.aboutBio || 'Fatheali Landage is a BCA student graduating in 2026 with strong interests in Frontend Development, Python Programming, Artificial Intelligence, and Cybersecurity.'
  const aboutTitle = settings?.aboutTitle || 'Driven by Curiosity. Defined by Tech.'
  const aboutSubtitle = settings?.aboutSubtitle || '01 / Biography'

  const defaultCards = [
    {
      iconName: 'FiTerminal',
      title: 'React & Frontend Development',
      desc: 'Building modern interfaces using React.js and styling with Tailwind CSS. Committed to semantic layouts, responsive controls, and optimal visual hierarchy.'
    },
    {
      iconName: 'FiBookOpen',
      title: 'Python Programming',
      desc: 'Developing scripts to automate tasks, scrape web data, solve computational problems, and implement machine learning libraries.'
    },
    {
      iconName: 'FiCpu',
      title: 'Artificial Intelligence',
      desc: 'Studying AI fundamentals, generative tools, and Machine Learning workflows (using NumPy, Pandas, data cleaning, and classification algorithms).'
    },
    {
      iconName: 'FiShield',
      title: 'Cybersecurity Learning',
      desc: 'Studying fundamental concepts of networking, Linux operating systems administration, vulnerability scanners, and web application security.'
    }
  ]

  const cards = settings?.aboutCards && settings.aboutCards.length > 0
    ? settings.aboutCards
    : defaultCards

  const titleParts = aboutTitle.split('.')
  const bioParagraphs = aboutBio.split('\n').filter(p => p.trim() !== '')

  return (
    <section id="About" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-4"
          >
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">// {aboutSubtitle}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              {titleParts[0]}
              {titleParts.length > 1 && titleParts[1].trim() !== '' && (
                <>. <br /><span className="gradient-text">{titleParts[1]}</span></>
              )}
            </h2>
            <div className="text-slate-400 leading-relaxed space-y-4 text-base md:text-lg">
              {bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Right Cards list */}
          <div className="lg:col-span-3 grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, idx) => {
              const Icon = Icons[card.iconName] || Icons.FiTerminal
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="glass border border-white/5 hover:border-purple-500/20 p-6 rounded-2xl flex flex-col items-start gap-4 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(168,85,247,0.08)] bg-white/2"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">{card.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
