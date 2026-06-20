import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiDownload, FiMail } from 'react-icons/fi'

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23111827'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%23a855f7'/></svg>"

export default function Hero({ settings, githubUrl, linkedinUrl }) {
  console.log('settings', settings)
  console.log('loading', !settings)
  console.log('resumeUrl', settings?.resumeUrl)
  console.log('profileImage', settings?.profileImage)

  const ownerName = settings?.ownerName || 'Fatheali Landage'
  const headline = settings?.headline || 'Frontend Developer | Python Learner | AI & Cybersecurity Enthusiast'
  const description = settings?.description || 'BCA student graduating in 2026 with practical experience in web development, internships, React applications, Python programming, and emerging technologies.'

  const defaultStats = [
    { value: '8+', title: 'Projects', subtitle: 'React • MERN • Python', targetSection: 'Projects', order: 1 },
    { value: '10+', title: 'Certifications', subtitle: 'Cisco • HackerRank', targetSection: 'Certifications', order: 2 },
    { value: '2+', title: 'Internships', subtitle: 'InnoByte • Dev Arena', targetSection: 'Internships', order: 3 },
    { value: '2026', title: 'BCA Graduate', subtitle: 'Expected graduation', targetSection: 'Education', order: 4 }
  ]
  
  const statsToRender = settings?.heroStats && settings.heroStats.length > 0
    ? [...settings.heroStats].sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultStats

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  // Split headline dynamically for typing sequence animation
  const animSequence = headline
    .split('|')
    .map(part => part.trim())
    .filter(part => part !== '')
    .reduce((acc, current) => {
      acc.push(current)
      acc.push(2000)
      return acc
    }, [])

  return (
    <section id="Home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute top-1/3 -left-64 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p variants={itemVariants} className="text-cyan-400 tracking-[0.2em] text-xs font-mono uppercase">
            BCA Student // Portfolio Showcase
          </motion.p>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Hi, I'm <br />
            <span className="text-white">{ownerName}</span>
          </motion.h1>
          <motion.div variants={itemVariants} className="text-xl md:text-2xl font-light text-slate-300 h-[60px] flex items-center">
            {animSequence.length > 0 && (
              <TypeAnimation
                sequence={animSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text font-semibold font-mono"
              />
            )}
          </motion.div>
          <motion.p variants={itemVariants} className="text-slate-400 max-w-[600px] leading-relaxed text-base md:text-lg">
            {description}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-4">
            {!settings ? (
              <button
                disabled
                className="px-6 py-3.5 bg-slate-800/40 text-slate-500 border border-white/5 font-semibold rounded-xl flex items-center gap-2 text-sm cursor-not-allowed animate-pulse"
              >
                <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                Loading Resume...
              </button>
            ) : !settings.resumeUrl || settings.resumeUrl.trim() === '' ? (
              <button
                disabled
                className="px-6 py-3.5 bg-slate-800/20 text-slate-500 border border-white/5 font-semibold rounded-xl flex items-center gap-2 text-sm cursor-not-allowed"
              >
                <FiDownload /> No Resume Available
              </button>
            ) : (
              <a 
                href={settings.resumeUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <FiDownload /> Resume Download
              </a>
            )}
            
            <Link to="Contact" smooth={true} duration={800} className="cursor-pointer">
              <button className="px-6 py-3.5 border border-white/10 hover:border-white/20 font-semibold rounded-xl hover:bg-white/5 transition-all text-sm flex items-center gap-2 cursor-pointer">
                <FiMail /> Contact Me
              </button>
            </Link>

            <div className="flex gap-4 items-center">
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all text-lg cursor-pointer"
                >
                  <FiGithub />
                </a>
              )}
              {linkedinUrl && (
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all text-lg cursor-pointer"
                >
                  <FiLinkedin />
                </a>
              )}
            </div>
          </motion.div>

          {/* Recruiter Stats Section */}
          {statsToRender.length > 0 && (
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5"
            >
              {statsToRender.map((stat, idx) => {
                const isPurple = idx % 2 === 0
                const cardContent = (
                  <div className={`h-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center sm:text-left hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between ${
                    isPurple ? 'hover:border-purple-500/25' : 'hover:border-cyan-500/25'
                  }`}>
                    <div>
                      <div className={`text-2xl md:text-3xl font-extrabold transition-colors ${
                        isPurple ? 'text-purple-400 group-hover:text-purple-300' : 'text-cyan-400 group-hover:text-cyan-300'
                      }`}>
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-200 font-bold uppercase tracking-wider mt-1">{stat.title}</div>
                    </div>
                    {stat.subtitle && (
                      <div className="text-[10px] text-slate-400 font-mono mt-1 leading-tight">{stat.subtitle}</div>
                    )}
                  </div>
                )

                const hasTarget = stat.targetSection && stat.targetSection !== 'Custom'

                if (hasTarget) {
                  return (
                    <Link 
                      key={stat._id || idx}
                      to={stat.targetSection} 
                      smooth={true} 
                      duration={800} 
                      className="cursor-pointer group block h-full"
                    >
                      {cardContent}
                    </Link>
                  )
                }

                return (
                  <div key={stat._id || idx} className="group h-full">
                    {cardContent}
                  </div>
                )
              })}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="relative flex justify-center items-center lg:justify-end"
        >
          <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
            {/* Rotating gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-transparent to-cyan-500 p-1 opacity-70 blur-md"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-10px] rounded-full border border-cyan-500/30 border-dashed"
            />
            <div className="absolute inset-2 bg-[#020005] rounded-full overflow-hidden flex items-center justify-center border border-white/5">
              {!settings ? (
                <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400/50">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <img
                  src={settings.profileImage || DEFAULT_AVATAR}
                  alt={ownerName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_AVATAR;
                  }}
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
