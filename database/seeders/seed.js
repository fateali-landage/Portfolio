import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import User from '../../backend/src/models/userModel.js'
import Project from '../../backend/src/models/projectModel.js'
import Skill from '../../backend/src/models/skillModel.js'
import Social from '../../backend/src/models/socialModel.js'
import Certificate from '../../backend/src/models/certificateModel.js'
import Settings from '../../backend/src/models/settingsModel.js'

// Resolve paths for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env variables
dotenv.config({ path: path.join(__dirname, '../../backend/.env') })

const defaultProjects = [
  {
    title: 'Personal Portfolio',
    description: 'A premium, modern React portfolio site showcasing personal projects, skill categories, and cybersecurity interests. Built with custom interactive layouts, Framer Motion animations, and a secure backend admin console.',
    image: '/portfolio.png',
    githubUrl: 'https://github.com/fateali-landage/Portfolio',
    demoUrl: 'https://fateali-landage.github.io/Portfolio/',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    status: 'Completed'
  },
  {
    title: 'React Task Manager',
    description: 'An interactive Kanban-style task management app supporting drag-and-drop workspace controls, custom status tags, user filters, and persistence. Engineered for optimal responsive UI/UX and micro-interactions.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/React-Task-Manager',
    demoUrl: 'https://github.com/fateali-landage/React-Task-Manager',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Local Storage'],
    status: 'Completed'
  },
  {
    title: 'Expense Tracker',
    description: 'A full-stack financial dashboard designed to track income and expenses. Visualizes spending behavior with interactive charts, monthly statistics, budget alerts, and clean transaction logging.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Expense-Tracker',
    demoUrl: 'https://github.com/fateali-landage/Expense-Tracker',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js'],
    status: 'Completed'
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard fetching real-time meteorological indicators from OpenWeather REST API. Features weekly forecasting, geolocation weather reports, search filters, and persistent recent searches.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Weather-Dashboard',
    demoUrl: 'https://github.com/fateali-landage/Weather-Dashboard',
    technologies: ['React', 'Tailwind CSS', 'OpenWeather API', 'JavaScript'],
    status: 'Completed'
  },
  {
    title: 'Python Automation Tool',
    description: 'A collection of script automation workflows performing administrative tasks including log sanitization, files sorting, background web scraping, and scheduled backups to optimize developer productivity.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Python-Automation',
    demoUrl: 'https://github.com/fateali-landage/Python-Automation',
    technologies: ['Python', 'Scripting', 'Automation', 'BeautifulSoup'],
    status: 'Completed'
  },
  {
    title: 'Cybersecurity Learning Labs',
    description: 'A packet analysis laboratory environment with scripts to analyze local network captures, check common ports, inspect mock vulnerability scan report data, and demonstrate defense logic.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Security-Labs',
    demoUrl: 'https://github.com/fateali-landage/Security-Labs',
    technologies: ['Python', 'Wireshark', 'Linux Bash', 'Network Security'],
    status: 'In Progress'
  }
]

const defaultSkills = [
  // Frontend
  { name: 'HTML', category: 'frontend', level: 95, color: '#E34F26' },
  { name: 'CSS', category: 'frontend', level: 90, color: '#1572B6' },
  { name: 'JavaScript', category: 'frontend', level: 85, color: '#F7DF1E' },
  { name: 'React', category: 'frontend', level: 82, color: '#61DAFB' },
  { name: 'Tailwind CSS', category: 'frontend', level: 88, color: '#06B6D4' },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 75, color: '#339933' },
  { name: 'Express.js', category: 'backend', level: 72, color: '#ffffff' },

  // Programming
  { name: 'Python', category: 'programming', level: 80, color: '#3776AB' },
  { name: 'JavaScript', category: 'programming', level: 85, color: '#F7DF1E' },

  // Database
  { name: 'MongoDB', category: 'database', level: 70, color: '#47A248' },
  { name: 'MySQL', category: 'database', level: 68, color: '#4479A1' },

  // Cybersecurity
  { name: 'Networking', category: 'cybersecurity', level: 78, color: '#0054FF' },
  { name: 'Linux', category: 'cybersecurity', level: 82, color: '#FCC624' },
  { name: 'Web Security Basics', category: 'cybersecurity', level: 70, color: '#E24A35' },

  // Tools
  { name: 'Git', category: 'tools', level: 85, color: '#F05032' },
  { name: 'GitHub', category: 'tools', level: 88, color: '#ffffff' },
  { name: 'VS Code', category: 'tools', level: 90, color: '#007ACC' }
]

const defaultSocials = [
  {
    platform: 'GitHub',
    url: 'https://github.com/fateali-landage',
    value: 'github.com/fateali-landage'
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/fatealilandage',
    value: 'linkedin.com/in/fatealilandage'
  },
  {
    platform: 'Email',
    url: 'mailto:fatealilandage@gmail.com',
    value: 'fatealilandage@gmail.com'
  }
]

const defaultCertificates = [
  {
    title: 'Python Programming',
    issuer: 'Cisco Networking Academy',
    issueDate: 'October 2025',
    image: ''
  },
  {
    title: 'JavaScript Fundamentals',
    issuer: 'SoloLearn',
    issueDate: 'September 2024',
    image: ''
  },
  {
    title: 'React Development',
    issuer: 'HackerRank',
    issueDate: 'February 2025',
    image: ''
  },
  {
    title: 'SQL Basics',
    issuer: 'Udemy',
    issueDate: 'December 2024',
    image: ''
  },
  {
    title: 'Linux Fundamentals',
    issuer: 'NDG / Cisco',
    issueDate: 'January 2025',
    image: ''
  },
  {
    title: 'Cybersecurity Fundamentals',
    issuer: 'Fortinet',
    issueDate: 'March 2026',
    image: ''
  }
]

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio'
    console.log(`Connecting to database for seeding: ${mongoUri}`)
    
    await mongoose.connect(mongoUri)
    console.log('Database connected.')

    // Clear existing collections
    await User.deleteMany({})
    await Project.deleteMany({})
    await Skill.deleteMany({})
    await Social.deleteMany({})
    await Certificate.deleteMany({})
    await Settings.deleteMany({})
    console.log('Cleared existing database entries.')

    // Create Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'fatealilandage@gmail.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'F9@Fateali9886'
    
    await User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    })
    console.log(`Admin user created with email: ${adminEmail}`)

    // Create default items
    await Project.insertMany(defaultProjects)
    console.log(`Seeded ${defaultProjects.length} projects.`)

    await Skill.insertMany(defaultSkills)
    console.log(`Seeded ${defaultSkills.length} skills.`)

    await Social.insertMany(defaultSocials)
    console.log(`Seeded ${defaultSocials.length} social links.`)

    await Certificate.insertMany(defaultCertificates)
    console.log(`Seeded ${defaultCertificates.length} certificates.`)

    // Create default settings (resumeUrl and default heroStats)
    await Settings.create({
      resumeUrl: '/uploads/resume.pdf',
      heroStats: [
        { value: '8+', title: 'Projects', subtitle: 'React • MERN • Python', targetSection: 'Projects', order: 1 },
        { value: '10+', title: 'Certifications', subtitle: 'Cisco • HackerRank', targetSection: 'Certifications', order: 2 },
        { value: '2+', title: 'Internships', subtitle: 'InnoByte • Dev Arena', targetSection: 'Internships', order: 3 },
        { value: '2026', title: 'BCA Graduate', subtitle: 'Expected graduation', targetSection: 'Education', order: 4 }
      ]
    })
    console.log('Seeded default website settings with hero statistics.')

    console.log('Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDB()
