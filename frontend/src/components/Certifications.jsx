import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiCalendar, FiExternalLink, FiX } from 'react-icons/fi'
import certificateService from '../services/certificateService'
import { getAssetUrl } from '../utils/url'

const categorizeCertificate = (cert) => {
  const title = cert.title.toLowerCase();
  
  if (title.includes('python')) {
    return 'Python';
  }
  if (title.includes('security') || title.includes('cyber') || title.includes('network') || title.includes('linux') || title.includes('wireshark') || title.includes('tryhackme')) {
    return 'Cybersecurity';
  }
  if (title.includes('ai') || title.includes('artificial') || title.includes('machine learning') || title.includes('deep learning') || title.includes('numpy') || title.includes('pandas') || title.includes('pytorch')) {
    return 'Artificial Intelligence';
  }
  if (title.includes('web') || title.includes('html') || title.includes('css') || title.includes('javascript') || title.includes('js') || title.includes('react') || title.includes('frontend')) {
    return 'Web Development';
  }
  return 'Professional Development';
}

const CATEGORIES = ['Web Development', 'Python', 'Artificial Intelligence', 'Cybersecurity', 'Professional Development'];

export default function Certifications() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await certificateService.getAll()
        setCerts(data)
      } catch (err) {
        console.error('Error fetching certifications:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCerts()
  }, [])

  return (
    <section id="Certifications" className="py-32 bg-[#020005] relative">
      <div className="container mx-auto px-6">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">// 03 / Credentials</span>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Certifications</h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="text-center py-20 font-mono text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 mx-auto mb-4"></div>
            Loading credentials...
          </div>
        ) : (
          <div className="space-y-12">
            {CATEGORIES.map((category) => {
              const categoryCerts = certs.filter(cert => categorizeCertificate(cert) === category);
              if (categoryCerts.length === 0) return null;
              
              return (
                <div key={category} className="space-y-6">
                  <h4 className="text-base font-bold font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> // {category}
                  </h4>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {categoryCerts.map((cert, index) => (
                      <motion.div
                        key={cert._id || cert.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="glass border border-white/5 hover:border-purple-500/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.08)] bg-white/2 h-full"
                      >
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-2xl">
                            <FiAward />
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-white leading-snug">
                              {cert.title}
                            </h4>
                            <p className="text-slate-400 text-sm font-semibold mt-1">
                              {cert.issuer}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-mono">
                            <FiCalendar className="text-purple-400" /> {cert.issueDate}
                          </span>
                          
                          {cert.image && (
                            <button
                              onClick={() => setSelectedImage(cert.image)}
                              className="text-cyan-400 hover:text-cyan-300 font-semibold tracking-wider uppercase font-mono flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                            >
                              View Certificate <FiExternalLink />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] bg-[#020005] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedImage(null)} 
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-xl cursor-pointer border border-white/10 transition-colors"
              >
                <FiX />
              </button>
              
              <img 
                src={getAssetUrl(selectedImage)} 
                alt="Certificate Document" 
                className="max-w-full max-h-[80vh] object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1589330694653-ded6df53f6ee?w=800&auto=format&fit=crop&q=80";
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
