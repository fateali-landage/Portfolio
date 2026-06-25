import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protectAdmin = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token, verify they are admin
      req.user = await User.findById(decoded.id)

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' })
      }

      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, administrator role required' })
      }

      // Validate token fingerprint (revocation check)
      const currentFingerprint = req.user.password.slice(-10)
      if (!decoded.fp || decoded.fp !== currentFingerprint) {
        return res.status(401).json({ message: 'Not authorized, session expired' })
      }

      // Strip password hash from request user to avoid downstream leakage
      req.user.password = undefined

      return next()
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Not authorized, token validation failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' })
  }
}
