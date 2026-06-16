import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import User from './models/userModel.js'
import Project from './models/projectModel.js'
import Skill from './models/skillModel.js'
import Social from './models/socialModel.js'
import Certificate from './models/certificateModel.js'
import Settings from './models/settingsModel.js'
import Timeline from './models/timelineModel.js'
import Internship from './models/internshipModel.js'

// Resolve paths for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') })

const defaultProjects = [
  {
    title: 'Personal Portfolio',
    description: 'A premium, modern React portfolio site showcasing developer projects, skill categories, and cybersecurity learning. Built with dynamic interactive layouts, Framer Motion animations, and a secure backend admin console.',
    image: '/portfolio.png',
    githubUrl: 'https://github.com/fateali-landage/Portfolio',
    demoUrl: 'https://fateali-landage.github.io/Portfolio/',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    status: 'Completed',
    order: 1
  },
  {
    title: 'React Task Manager',
    description: 'An interactive Kanban-style task management board supporting drag-and-drop workspace controls, custom status tags, user filters, and state persistence. Engineered for optimal responsive UI/UX and micro-interactions.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/React-Task-Manager',
    demoUrl: 'https://github.com/fateali-landage/React-Task-Manager',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Local Storage'],
    status: 'Completed',
    order: 2
  },
  {
    title: 'Expense Tracker',
    description: 'A full-stack financial dashboard designed to track income and expenses. Visualizes spending behavior with interactive charts, monthly statistics, budget alerts, and clean transaction logging.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Expense-Tracker',
    demoUrl: 'https://github.com/fateali-landage/Expense-Tracker',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js'],
    status: 'Completed',
    order: 3
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard fetching real-time meteorological indicators from OpenWeather REST API. Features weekly forecasting, geolocation weather reports, search filters, and persistent recent searches.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Weather-Dashboard',
    demoUrl: 'https://github.com/fateali-landage/Weather-Dashboard',
    technologies: ['React', 'Tailwind CSS', 'OpenWeather API', 'JavaScript'],
    status: 'Completed',
    order: 4
  },
  {
    title: 'Python Automation Tool',
    description: 'A collection of script automation workflows performing administrative tasks including log sanitization, files sorting, background web scraping, and scheduled backups to optimize developer productivity.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Python-Automation',
    demoUrl: 'https://github.com/fateali-landage/Python-Automation',
    technologies: ['Python', 'Scripting', 'Automation', 'BeautifulSoup'],
    status: 'Completed',
    order: 5
  },
  {
    title: 'Cybersecurity Learning Labs',
    description: 'A packet analysis laboratory environment with scripts to analyze local network captures, check common ports, inspect mock vulnerability scan report data, and demonstrate defense logic.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage/Security-Labs',
    demoUrl: 'https://github.com/fateali-landage/Security-Labs',
    technologies: ['Python', 'Wireshark', 'Linux Bash', 'Network Security'],
    status: 'Learning Project',
    order: 6
  },
  {
    title: 'Batman-Themed Navigation UI',
    description: 'A cinematic, dark-themed navigation system featuring glow effects, custom UI animations, and smooth transitions inspired by the Dark Knight.',
    image: '/b-navigation.png',
    githubUrl: 'https://github.com/fateali-landage/Batman-theme-navigation',
    demoUrl: 'https://fateali-landage.github.io/Batman-theme-navigation/',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    status: 'Completed',
    order: 7
  },
  {
    title: 'Batman Responsive Website',
    description: 'A highly responsive web interface built with modern layouts, custom animated scroll events, and CSS stylesheets celebrating the Batman aesthetic.',
    image: '',
    githubUrl: 'https://github.com/fateali-landage',
    demoUrl: 'https://github.com/fateali-landage',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    status: 'Completed',
    order: 8
  }
]

const defaultSkills = [
  // Frontend
  { name: 'HTML5', category: 'frontend', level: 95, color: '#E34F26', order: 1 },
  { name: 'CSS3', category: 'frontend', level: 90, color: '#1572B6', order: 2 },
  { name: 'JavaScript', category: 'frontend', level: 85, color: '#F7DF1E', order: 3 },
  { name: 'React.js', category: 'frontend', level: 82, color: '#61DAFB', order: 4 },
  { name: 'Tailwind CSS', category: 'frontend', level: 88, color: '#06B6D4', order: 5 },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 75, color: '#339933', order: 1 },
  { name: 'Express.js', category: 'backend', level: 72, color: '#ffffff', order: 2 },

  // Programming
  { name: 'Python', category: 'programming', level: 80, color: '#3776AB', order: 1 },
  { name: 'JavaScript', category: 'programming', level: 85, color: '#F7DF1E', order: 2 },

  // Database
  { name: 'MongoDB', category: 'database', level: 70, color: '#47A248', order: 1 },

  // AI & Machine Learning
  { name: 'NumPy', category: 'ai-ml', level: 78, color: '#3776AB', order: 1 },
  { name: 'Pandas', category: 'ai-ml', level: 75, color: '#150458', order: 2 },
  { name: 'Machine Learning Fundamentals', category: 'ai-ml', level: 70, color: '#a855f7', order: 3 },
  { name: 'Deep Learning Fundamentals', category: 'ai-ml', level: 60, color: '#06b6d4', order: 4 },

  // Cybersecurity
  { name: 'Linux Fundamentals', category: 'cybersecurity', level: 80, color: '#FCC624', order: 1 },
  { name: 'Networking Fundamentals', category: 'cybersecurity', level: 78, color: '#0054FF', order: 2 },
  { name: 'Security Concepts', category: 'cybersecurity', level: 72, color: '#ef4444', order: 3 },
  { name: 'TryHackMe Learning', category: 'cybersecurity', level: 75, color: '#ef4444', order: 4 },

  // Tools
  { name: 'Git', category: 'tools', level: 85, color: '#F05032', order: 1 },
  { name: 'GitHub', category: 'tools', level: 88, color: '#ffffff', order: 2 },
  { name: 'VS Code', category: 'tools', level: 90, color: '#007ACC', order: 3 },
  { name: 'WordPress', category: 'tools', level: 80, color: '#21759b', order: 4 }
]

const defaultSocials = [
  {
    platform: 'GitHub',
    url: 'https://github.com/fateali-landage',
    value: 'github.com/fateali-landage',
    order: 1
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/fathealilandage',
    value: 'linkedin.com/in/fathealilandage',
    order: 2
  },
  {
    platform: 'Email',
    url: 'mailto:fathealilandage@gmail.com',
    value: 'fathealilandage@gmail.com',
    order: 3
  }
]

const defaultCertificates = [
  // Web Development
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    issueDate: '2025',
    image: '',
    order: 1
  },
  {
    title: 'WordPress Website Development',
    issuer: 'Coursera Project Network',
    issueDate: '2025',
    image: '',
    order: 2
  },
  {
    title: 'Google My Business',
    issuer: 'Google',
    issueDate: '2025',
    image: '',
    order: 3
  },

  // Python & AI
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    issueDate: '2025',
    image: '',
    order: 4
  },
  {
    title: 'Advanced Machine Learning with Python',
    issuer: 'Industry Training',
    issueDate: '2026',
    image: '',
    order: 5
  },
  {
    title: 'Elements of AI',
    issuer: 'University of Helsinki',
    issueDate: '2025',
    image: '',
    order: 6
  },
  {
    title: 'Gemini Certified Student',
    issuer: 'Google for Education',
    issueDate: '2026',
    image: '',
    order: 7
  },

  // Professional Development
  {
    title: 'Internship Common Aptitude Test (ICAT) - Score: 63 (AIR 311)',
    issuer: 'ICAT Board',
    issueDate: '2025',
    image: '',
    order: 8
  }
]

const defaultTimeline = [
  {
    year: '2025',
    iconName: 'FiAward',
    title: 'Core Certifications & Work',
    detail: 'Earned freeCodeCamp Responsive Web Design, Cisco Python Essentials, and University of Helsinki Elements of AI credentials. Completed a WordPress web development project.',
    order: 1
  },
  {
    year: '2025',
    iconName: 'FiBriefcase',
    title: 'Internship & ICAT Rank 311',
    detail: 'Completed a Web Development internship at Prodigy InfoTech. Qualified the ICAT Common Aptitude Test, scoring 63 with an All India Rank of 311. Secured an internship opportunity with InnoByte Services.',
    order: 2
  },
  {
    year: '2026',
    iconName: 'FiCpu',
    title: 'Advanced AI Study & Industry Interns',
    detail: 'Completed Advanced Machine Learning with Python training, focusing on data frameworks, regression, boosting, and deep learning. Certified Gemini Student by Google. Participated in Bengaluru GAFX 2026. Completed a 3-month Web Development internship at The Developers Arena.',
    order: 3
  },
  {
    year: 'Future',
    iconName: 'FiTarget',
    title: 'Career Aspirations',
    detail: 'Pursuing professional roles as a Frontend Developer, Python Developer, or Cybersecurity Engineer.',
    order: 4
  }
]

const defaultInternships = [
  {
    company: 'The Developers Arena',
    role: 'Web Development Intern',
    duration: '3 Months',
    highlights: [
      'Frontend Development',
      'Real-world project implementation',
      'Best coding practices',
      'Practical industry experience'
    ],
    certId: 'CERT-202602-EMP20251110-281',
    color: '#a855f7',
    order: 1
  },
  {
    company: 'Prodigy InfoTech',
    role: 'Web Development Intern',
    duration: '1 Month',
    highlights: [
      'Responsive website development',
      'Modern web technologies',
      'Practical project execution',
      'Problem-solving skills'
    ],
    certId: 'PIT/SEP25/01817',
    color: '#06b6d4',
    order: 2
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
    await Timeline.deleteMany({})
    await Internship.deleteMany({})
    console.log('Cleared existing database entries.')

    // Create Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'fathealilandage@gmail.com'
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

    await Timeline.insertMany(defaultTimeline)
    console.log(`Seeded ${defaultTimeline.length} timeline milestones.`)

    await Internship.insertMany(defaultInternships)
    console.log(`Seeded ${defaultInternships.length} internships.`)

    // Create default settings
    await Settings.create({
      resumeUrl: '/uploads/resume.pdf',
      ownerName: 'Fatheali Landage',
      headline: 'Frontend Developer | Python Learner | AI & Cybersecurity Enthusiast',
      description: 'BCA student graduating in 2026 with practical experience in web development, internships, React applications, Python programming, and emerging technologies.',
      profileImage: '',
      aboutBio: 'Fatheali Landage is a BCA student graduating in 2026 with strong interests in Frontend Development, Python Programming, Artificial Intelligence, and Cybersecurity. He has gained practical experience through multiple web development internships, industry certifications, technical projects, and continuous learning initiatives.',
      aboutTitle: 'Driven by Curiosity. Defined by Tech.',
      aboutSubtitle: '01 / Biography',
      degree: 'Bachelor of Computer Applications',
      institution: "KLE's Basavprabhu Kore College",
      location: 'Chikodi, Karnataka',
      duration: 'Expected Graduation: 2026',
      academicFocus: 'Focusing on computational foundations, structured database design, object-oriented software engineering, responsive frontend programming, and modern networking systems.',
      coursework: [
        'Data Structures & Algorithms',
        'Web Technologies (HTML, CSS, JS, React)',
        'Database Management Systems (SQL & MongoDB)',
        'Computer Networks & Protocols',
        'Linux System Administration',
        'Object Oriented Programming (Python/Java)'
      ],
      contactEmail: 'fathealilandage@gmail.com',
      contactTitle: "Let's Build Together",
      contactDesc: 'Have an open role, project opportunity, or just want to connect? Send a message below!',
      cybersecurityItems: [
        { title: 'Linux Fundamentals', desc: 'Navigating terminal systems, user permissions administration, process logging, and bash scripting.', progress: 85, color: '#ef4444' },
        { title: 'Networking Concepts', desc: 'OSI and TCP/IP layering, internet protocols (HTTP, DNS, TCP, UDP), and port checking utility sweeps.', progress: 80, color: '#3b82f6' },
        { title: 'Web Security Basics', desc: 'Understanding OWASP Top 10 vulnerabilities (XSS, SQL Injection, CSRF) and safe input sanitization logic.', progress: 70, color: '#10b981' },
        { title: 'Cybersecurity Fundamentals', desc: 'Studying risk control frameworks, security auditing systems, logging structures, and threat modeling.', progress: 75, color: '#06b6d4' },
        { title: 'Python Security Automation', desc: 'Developing scripts for port scanning, web directories discovery, and cryptographic logs sorting.', progress: 80, color: '#a855f7' },
        { title: 'TryHackMe Labs', desc: 'Completing fundamental rooms, network enumerations, security policies analysis, and mock scanner runs.', progress: 75, color: '#f59e0b' }
      ],
      achievementsList: [
        { title: 'Completed Multiple Web Development Internships', desc: 'Completed internships at Prodigy InfoTech and The Developers Arena, gaining hands-on industrial web development experience.' },
        { title: 'Qualified ICAT with AIR 311', desc: 'Scored 63 on the Internship Common Aptitude Test, ranking in the top tier nationally.' },
        { title: 'Cisco Python Essentials Certification', desc: 'Certified in core Python, covering file streams operations, structured logic, and exception handlers.' },
        { title: 'Advanced Machine Learning Training', desc: 'Mastered Pandas, NumPy, Regression models, Random Forest, Decision Trees, and Deep Learning basics.' },
        { title: 'Elements of AI Certification', desc: 'Studied Artificial Intelligence methodologies, ethical impacts, and algorithms systems under University of Helsinki.' },
        { title: 'Gemini Certified Student', desc: 'Certified by Google for Education in using AI tools and Generative AI structures.' },
        { title: 'Participated in Bengaluru GAFX 2026', desc: 'Joined the leading design, animation, and visual effects convention to study emerging graphics technology.' },
        { title: 'Built Multiple Frontend & MERN Projects', desc: 'Successfully created Kanban boards, expense trackers, responsive Batman navigation systems, and weather portals.' },
        { title: 'Delivered Technical Seminar on Requirement Validation', desc: 'Presented validation methods, constraints mappings, and prototyping tools for product development requirements.' }
      ],
      seoTitle: 'Fatheali Landage | Frontend Developer | Python | AI & Cybersecurity',
      seoDescription: 'Fatheali Landage - Portfolio of a Frontend Developer, Python Programmer, and AI & Cybersecurity Enthusiast.',
      seoKeywords: 'Fatheali Landage, Frontend Developer, React Developer, Python Programmer, Artificial Intelligence, Cybersecurity, BCA 2026, Portfolio',
      faviconUrl: '/favicon.ico',
      ogTitle: 'Fatheali Landage | Frontend Developer & Cybersecurity Enthusiast',
      ogDescription: 'Explore the portfolio of Fatheali Landage - React Developer, Python coder, and AI / network security learner.',
      ogImageUrl: '/portfolio.png',
      primaryColor: '#a855f7',
      secondaryColor: '#06b6d4',
      bgColor: '#020005',
      aboutCards: [
        { iconName: 'FiTerminal', title: 'React & Frontend Development', desc: 'Building modern interfaces using React.js and styling with Tailwind CSS. Committed to semantic layouts, responsive controls, and optimal visual hierarchy.' },
        { iconName: 'FiBookOpen', title: 'Python Programming', desc: 'Developing scripts to automate tasks, scrape web data, solve computational problems, and implement machine learning libraries.' },
        { iconName: 'FiCpu', title: 'Artificial Intelligence', desc: 'Studying AI fundamentals, generative tools, and Machine Learning workflows (using NumPy, Pandas, data cleaning, and classification algorithms).' },
        { iconName: 'FiShield', title: 'Cybersecurity Learning', desc: 'Studying fundamental concepts of networking, Linux operating systems administration, vulnerability scanners, and web application security.' }
      ],
      offersReceived: [
        { role: 'Web Developer Intern', company: 'InnoByte Services' },
        { role: 'Internship Offer', company: 'The Developers Arena' }
      ],
      learningItems: [
        { iconName: 'FiCode', title: 'Advanced React', desc: 'Custom hooks, performance optimization, context architectures', color: '#61DAFB' },
        { iconName: 'FiTerminal', title: 'Python Development', desc: 'Automation tools, parsing JSON/CSV data files, script writing', color: '#3776AB' },
        { iconName: 'FiShield', title: 'Cybersecurity Fundamentals', desc: 'OWASP risk patterns, defensive programming, penetration logs checks', color: '#ef4444' },
        { iconName: 'FiBook', title: 'Linux Administration', desc: 'User permissions settings, process managers, cron scheduler automation', color: '#FCC624' },
        { iconName: 'FiGlobe', title: 'Networking Concepts', desc: 'TCP/IP diagnostics, local routing models, port checking utilities', color: '#3b82f6' }
      ],
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
