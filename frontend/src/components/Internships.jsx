import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiCheck, FiAward } from 'react-icons/fi'
import internshipService from '../services/internshipService'

export default function Internships({ settings }) {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultOffers = [
    { role: 'Web Developer Intern', company: 'InnoByte Services' },
    { role: 'Internship Offer', company: 'The Developers Arena' }
  ]

  const offers = settings?.offersReceived && settings.offersReceived.length > 0
    ? settings.offersReceived
    : defaultOffers

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await internshipService.getAll()
        setExperiences(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } catch (err) {
        console.error('Error fetching internship experiences:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  return (
    <section id="Internships" className="py-32 bg-[#020005] relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">// Experience</span>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Internships</h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="text-center py-20 font-mono text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 mx-auto mb-4"></div>
            Loading experiences...
          </div>
        ) : (
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-start">
            
            {/* Internships List */}
            <div className="md:col-span-2 space-y-6">
              {experiences.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl text-slate-500 font-mono text-sm">
                  No internships listed yet.
                </div>
              ) : (
                experiences.map((exp, index) => (
                  <motion.div
                    key={exp._id || exp.company}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="glass border border-white/5 hover:border-purple-500/20 p-6 md:p-8 rounded-3xl relative overflow-hidden bg-white/[0.01] flex flex-col md:flex-row gap-6 md:items-start transition-all"
                  >
                    {/* Visual border highlight */}
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: exp.color || '#a855f7' }} />

                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-xl shrink-0" style={{ color: exp.color || '#a855f7' }}>
                      <FiBriefcase />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-xl font-bold text-white leading-snug">{exp.role}</h4>
                          <p className="text-slate-300 font-medium text-sm">{exp.company}</p>
                        </div>
                        <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 bg-white/5 border border-white/8 text-slate-400 rounded-lg shrink-0">
                          {exp.duration}
                        </span>
                      </div>

                      <ul className="grid sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-400 font-sans">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <FiCheck className="text-green-400 shrink-0 text-sm" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.certId && (
                        <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500">
                          <FiAward className="text-purple-400" /> Certificate ID: <span className="text-slate-400">{exp.certId}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Other Offers */}
            <div className="md:col-span-1 space-y-6">
              <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase px-1">Other Opportunities</h4>
              
              <div className="space-y-4">
                {offers.map((off, index) => (
                  <motion.div
                    key={off.company + index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass border border-white/5 p-5 rounded-2xl bg-[#020005]/80 hover:border-cyan-500/20 transition-all flex flex-col gap-2"
                  >
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">Offer Received</span>
                    <h5 className="font-bold text-white text-sm leading-snug">{off.role}</h5>
                    <p className="text-slate-400 text-xs font-semibold">{off.company}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
