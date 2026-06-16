import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true)
    }
    const out = () => setHovering(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-[9998]"
        animate={{ x: pos.x - 10, y: pos.y - 10, scale: hovering ? 2 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 pointer-events-none z-[9997]"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
      />
    </>
  )
}
