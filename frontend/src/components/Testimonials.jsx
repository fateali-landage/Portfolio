import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Fateali's attention to detail and clean code architecture impressed our entire team. He delivered a UI that felt production-ready from day one.",
    name: 'Arjun Mehta',
    title: 'Senior Developer, TechCorp',
    avatar: 'AM',
    color: '#a855f7',
  },
  {
    quote: "He delivered a stunning interface that exceeded our expectations on both timeline and visual quality. Rare to find that combination in a developer this early in their career.",
    name: 'Priya Sharma',
    title: 'Project Lead, DesignWave',
    avatar: 'PS',
    color: '#06b6d4',
  },
  {
    quote: "His React skills and design sensibility make him stand out from other junior developers. His components are reusable, readable, and genuinely beautiful.",
    name: 'Rahul Desai',
    title: 'Fullstack Engineer, CloudBase',
    avatar: 'RD',
    color: '#a855f7',
  },
]

export default function Testimonials() {
  return (
    <section id="Testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-sm tracking-[0.3em] text-purple-400 mb-4 font-semibold uppercase">Social Proof</p>
          <h3 className="text-4xl md:text-5xl font-bold">What People Say</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="relative glass p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-400 group"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at top left, ${t.color}10, transparent 70%)`,
                }}
              />

              {/* Quote mark */}
              <div
                className="text-7xl font-serif leading-none mb-4 opacity-30 select-none"
                style={{ color: t.color }}
              >
                "
              </div>

              <p className="text-slate-300 leading-relaxed mb-8 relative z-10 text-base">
                {t.quote}
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{t.title}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="absolute top-8 right-8 flex gap-0.5">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} className="w-3.5 h-3.5" style={{ color: t.color }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
