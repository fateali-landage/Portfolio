import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const sections = ['Home', 'About', 'Education', 'Internships', 'Skills', 'Projects', 'Certifications', 'Cybersecurity', 'Timeline', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          <Link to="Home" smooth={true} duration={800} className="cursor-pointer group">
            <h1 className="text-2xl font-bold tracking-tighter">
              Fatheali<span className="text-cyan-400">.</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 lg:gap-8 items-center justify-center">
          {sections.map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={800}
              spy={true}
              activeClass="active-nav-item"
              className="relative text-[10px] lg:text-xs uppercase tracking-widest text-slate-400 hover:text-white cursor-pointer transition-colors font-medium"
            >
              {section}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 transition-opacity duration-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.8)] indicator" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex flex-1 justify-end">
          {/* Balancing spacer for desktop menu centering */}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl flex-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full glass flex flex-col py-6 px-6 gap-6 md:hidden"
        >
          {sections.map((section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={800}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium tracking-wide"
            >
              {section}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
