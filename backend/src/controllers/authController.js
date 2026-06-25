import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// Helper function to generate JWT token with password fingerprint
const generateToken = (id, passwordHash) => {
  const fingerprint = passwordHash ? passwordHash.slice(-10) : ''
  return jwt.sign({ id, fp: fingerprint }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  })
}

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.password)
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Public (stateless cleanup)
export const logout = async (req, res) => {
  // Stateless JWT doesn't strictly need backend session cleanup,
  // but returning success confirms logout is processed.
  res.json({ message: 'Successfully logged out' })
}

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Change admin password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body

    // 1. All fields are required
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // 2. Confirm new password matches
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }

    // 3. Password strength policy:
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`\-]).{8,}$/
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' 
      })
    }

    // 4. Load the full user (including password) from the DB since middleware strips it
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found' })
    }

    // 5. Verify current password
    const isMatch = await user.matchPassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }

    // 6. Prevent password reuse
    const isSame = await user.matchPassword(newPassword)
    if (isSame) {
      return res.status(400).json({ message: 'New password must be different from the current password.' })
    }

    // 7. Update password (pre-save hook will automatically hash it)
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: 'Password updated successfully.'
    })
  } catch (error) {
    next(error)
  }
}
