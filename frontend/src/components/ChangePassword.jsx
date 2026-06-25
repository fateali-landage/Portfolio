import { useState } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import authService from '../services/authService'

export default function ChangePassword({ logout, setSuccess, setError }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Client-side validations
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (newPassword === currentPassword) {
      setError('New password must be different from the current password.')
      return
    }

    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`\-]).{8,}$/
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
      return
    }

    setLoading(true)
    try {
      const res = await authService.changePassword(currentPassword, newPassword, confirmPassword)
      if (res.success) {
        setSuccess('Password updated successfully. Logging out...')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        
        // Wait 1.5 seconds so they can see the success notification
        setTimeout(() => {
          logout()
        }, 1500)
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update password.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">Update Admin Credentials</h3>
        <p className="text-xs text-slate-400">
          Set a secure administrative password. Upon successful update, all current sessions (including this one) will be revoked on the server, and you will be redirected to log in again.
        </p>
      </div>

      <div className="flex flex-col gap-5 max-w-xl">
        {/* Current Password */}
        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Current Password</label>
          <div className="relative">
            <input 
              type={showCurrent ? "text" : "password"} 
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-sm placeholder-slate-600"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer"
            >
              {showCurrent ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-2">New Password</label>
          <div className="relative">
            <input 
              type={showNew ? "text" : "password"} 
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-sm placeholder-slate-600"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer"
            >
              {showNew ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-1 leading-normal">
            Complexity rules: At least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character (e.g. !@#$%^&*).
          </p>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Confirm New Password</label>
          <div className="relative">
            <input 
              type={showConfirm ? "text" : "password"} 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-sm placeholder-slate-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                Updating Password...
              </>
            ) : (
              <>
                <FiLock /> Update Password
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
