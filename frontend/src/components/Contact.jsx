import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiDownload, FiCheckCircle } from 'react-icons/fi'
import socialService from '../services/socialService'

const iconMap = {
  'github': FiGithub,
  'linkedin': FiLinkedin,
  'email': FiMail
}

export default function Contact({ settings }) {
  const contactTitle = settings?.contactTitle || "Let's Build Something Great Together"
  const contactDesc = settings?.contactDesc || 'Have an open role, project opportunity, or just want to connect? Send a message below!'

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [socials, setSocials] = useState([])
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const timeoutRef = useRef(null)

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const data = await socialService.getAll()
        setSocials(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } catch (err) {
        console.error('Error fetching social links:', err)
      }
    }
    fetchSocials()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulating message transmission
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setStatus('idle'), 4000)
  }

  // Helper to split and render styled title
  const renderTitle = (title) => {
    if (title === "Let's Build Something Great Together") {
      return (
        <>
          Let's Build <span className="gradient-text">Something Great</span> Together
        </>
      )
    }
    return title;
  }

  return (
    <section id="Contact" className="py-32 bg-[#020005] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">// 09 / Connect</span>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {renderTitle(contactTitle)}
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base mt-2">
            {contactDesc}
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-5 gap-12 items-start">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase px-1">Connect Details</h4>
            
            <div className="space-y-4">
              {socials.map((item) => {
                const IconComponent = iconMap[item.platform.toLowerCase()] || FiMail
                return (
                  <motion.a
                    key={item._id || item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6, scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-500/20 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all text-xl shrink-0">
                      <IconComponent />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-mono">{item.platform}</p>
                      <p className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}

              {/* Resume download quicklink */}
              {!settings ? (
                <div
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed animate-pulse w-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center text-slate-500 text-xl shrink-0">
                    <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-slate-600 uppercase font-mono">CV Document</p>
                    <p className="font-semibold text-sm text-slate-500 mt-0.5">
                      Loading Resume...
                    </p>
                  </div>
                </div>
              ) : !settings.resumeUrl || settings.resumeUrl.trim() === '' ? (
                <div
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] opacity-50 cursor-not-allowed w-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800/20 border border-white/5 flex items-center justify-center text-slate-500 text-xl shrink-0">
                    <FiDownload />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-slate-600 uppercase font-mono">CV Document</p>
                    <p className="font-semibold text-sm text-slate-500 mt-0.5">
                      No Resume Available
                    </p>
                  </div>
                </div>
              ) : (
                <motion.a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-purple-500/20 transition-all duration-300 group cursor-pointer w-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-slate-400 group-hover:text-purple-400 group-hover:scale-110 transition-all text-xl shrink-0">
                    <FiDownload />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-mono">CV Document</p>
                    <p className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors mt-0.5">
                      Download PDF Resume
                    </p>
                  </div>
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 glass rounded-2xl p-6 md:p-8 border border-white/5 flex flex-col gap-5 bg-white/[0.01]"
          >
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Fatheali Landage"
                required
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="fathealilandage@gmail.com"
                required
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your email details here..."
                rows={4}
                required
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/60 transition-all resize-none text-sm"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative overflow-hidden w-full py-4 mt-2 rounded-xl font-semibold tracking-wide transition-all duration-300 disabled:opacity-60 cursor-pointer"
              style={{
                background: status === 'sent'
                  ? 'linear-gradient(135deg, #059669, #10b981)'
                  : 'linear-gradient(135deg, #a855f7, #06b6d4)',
                boxShadow: '0 0 25px rgba(168,85,247,0.25)',
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {status === 'idle' && 'Send Message'}
                {status === 'sending' && 'Sending...'}
                {status === 'sent' && (
                  <>
                    <FiCheckCircle /> Message Sent Successfully!
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
