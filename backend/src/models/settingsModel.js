import mongoose from 'mongoose'

const aboutCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  iconName: { type: String, default: 'FiTerminal' }
})

const offerItemSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true }
})

const learningItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  color: { type: String, default: '#3b82f6' },
  iconName: { type: String, default: 'FiCode' }
})

const cyberItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
  color: { type: String, default: '#ef4444' }
})

const achievementItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
})

const heroStatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  targetSection: { type: String, required: true, default: 'Projects' },
  order: { type: Number, default: 0 }
})

const settingsSchema = new mongoose.Schema({
  resumeUrl: {
    type: String,
    default: '/uploads/resume.pdf'
  },
  // Hero Section
  ownerName: {
    type: String,
    default: 'Fatheali Landage'
  },
  headline: {
    type: String,
    default: 'Frontend Developer | Python Learner | AI & Cybersecurity Enthusiast'
  },
  description: {
    type: String,
    default: 'BCA student graduating in 2026 with practical experience in web development, internships, React applications, Python programming, and emerging technologies.'
  },
  profileImage: {
    type: String,
    default: ''
  },
  // About Section
  aboutBio: {
    type: String,
    default: 'Fatheali Landage is a BCA student graduating in 2026 with strong interests in Frontend Development, Python Programming, Artificial Intelligence, and Cybersecurity. He has gained practical experience through multiple web development internships, industry certifications, technical projects, and continuous learning initiatives.'
  },
  aboutTitle: {
    type: String,
    default: 'Driven by Curiosity. Defined by Tech.'
  },
  aboutSubtitle: {
    type: String,
    default: '01 / Biography'
  },
  // Education Section
  degree: {
    type: String,
    default: 'Bachelor of Computer Applications'
  },
  institution: {
    type: String,
    default: "KLE's Basavprabhu Kore College"
  },
  location: {
    type: String,
    default: 'Chikodi, Karnataka'
  },
  duration: {
    type: String,
    default: 'Expected Graduation: 2026'
  },
  academicFocus: {
    type: String,
    default: 'Focusing on computational foundations, structured database design, object-oriented software engineering, responsive frontend programming, and modern networking systems.'
  },
  coursework: {
    type: [String],
    default: [
      'Data Structures & Algorithms',
      'Web Technologies (HTML, CSS, JS, React)',
      'Database Management Systems (SQL & MongoDB)',
      'Computer Networks & Protocols',
      'Linux System Administration',
      'Object Oriented Programming (Python/Java)'
    ]
  },
  // Contact Section
  contactEmail: {
    type: String,
    default: 'fathealilandage@gmail.com'
  },
  contactTitle: {
    type: String,
    default: "Let's Build Together"
  },
  contactDesc: {
    type: String,
    default: 'Have an open role, project opportunity, or just want to connect? Send a message below!'
  },
  // Cybersecurity Section Custom Items
  cybersecurityItems: {
    type: [cyberItemSchema],
    default: []
  },
  // Achievements Section Custom Items
  achievementsList: {
    type: [achievementItemSchema],
    default: []
  },
  // SEO configurations
  seoTitle: {
    type: String,
    default: 'Fatheali Landage | Frontend Developer | Python | AI & Cybersecurity'
  },
  seoDescription: {
    type: String,
    default: 'Fatheali Landage - Portfolio of a Frontend Developer, Python Programmer, and AI & Cybersecurity Enthusiast.'
  },
  seoKeywords: {
    type: String,
    default: 'Fatheali Landage, Frontend Developer, React Developer, Python Programmer, Artificial Intelligence, Cybersecurity, BCA 2026, Portfolio'
  },
  faviconUrl: {
    type: String,
    default: '/favicon.ico'
  },
  ogTitle: {
    type: String,
    default: 'Fatheali Landage | Frontend Developer & Cybersecurity Enthusiast'
  },
  ogDescription: {
    type: String,
    default: 'Explore the portfolio of Fatheali Landage - React Developer, Python coder, and AI / network security learner.'
  },
  ogImageUrl: {
    type: String,
    default: '/portfolio.png'
  },
  // Visual Themes Hex
  primaryColor: {
    type: String,
    default: '#a855f7'
  },
  secondaryColor: {
    type: String,
    default: '#06b6d4'
  },
  bgColor: {
    type: String,
    default: '#020005'
  },
  // Extended CMS Fields
  aboutCards: {
    type: [aboutCardSchema],
    default: []
  },
  offersReceived: {
    type: [offerItemSchema],
    default: []
  },
  learningItems: {
    type: [learningItemSchema],
    default: []
  },
  heroStats: {
    type: [heroStatSchema],
    default: []
  }
}, {
  timestamps: true
})

const Settings = mongoose.model('Settings', settingsSchema)
export default Settings
