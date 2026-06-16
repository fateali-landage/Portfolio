import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FiMail, FiLock, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, password)
    if (result.success) {
      navigate('/admin/dashboard')
    } else {
      setError(result.message)
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#020005] flex items-center justify-center px-6 overflow-hidden text-white font-sans">
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-cyan-700/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Back to Home Button */}
      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ x: -4 }}
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <FiArrowLeft /> Back to Site
      </motion.button>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Border glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-sm pointer-events-none" />

        <div className="relative glass rounded-2xl p-8 border border-white/10 bg-[#020005]/80 backdrop-blur-xl">
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h2 className="text-sm font-mono tracking-[0.4em] text-purple-400 uppercase mb-2">Security Portal</h2>
            <h3 className="text-3xl font-extrabold tracking-tight">
              Admin <span className="gradient-text">Console</span>
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-mono">AUTHORIZED ACCESS ONLY</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 px-4 py-3 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 text-sm"
            >
              <FiAlertCircle className="shrink-0 text-lg" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-mono tracking-[0.2em] text-slate-500 uppercase mb-2">
                Admin Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                  className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-11 pr-5 py-3.5 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-[0.2em] text-slate-500 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-11 pr-5 py-3.5 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-sans"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative overflow-hidden w-full py-4 mt-4 rounded-xl font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                boxShadow: '0 0 30px rgba(168,85,247,0.3)',
              }}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              
              {/* Shimmer */}
              {!loading && (
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                />
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
