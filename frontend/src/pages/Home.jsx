import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Education from '../components/Education'
import Internships from '../components/Internships'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Certifications from '../components/Certifications'
import Cybersecurity from '../components/Cybersecurity'
import Timeline from '../components/Timeline'
import CurrentlyLearning from '../components/CurrentlyLearning'
import GitHubStats from '../components/GitHubStats'
import AchievementsGoals from '../components/AchievementsGoals'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CustomCursor from '../components/CustomCursor'
import Loader from '../components/Loader'
import ParticleBackground from '../components/ParticleBackground'
import { getAssetUrl } from '../utils/url'

import settingsService from '../services/settingsService'
import socialService from '../services/socialService'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  
  const [settings, setSettings] = useState(null)
  const [socials, setSocials] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchHomeSettings = async () => {
      try {
        const settingsData = await settingsService.getSettings()
        console.log("Settings API response:", settingsData)
        setSettings(settingsData)

        const socialsData = await socialService.getAll()
        setSocials(socialsData)
      } catch (err) {
        console.error('Failed to retrieve homepage asset configurations:', err)
      }
    }
    fetchHomeSettings()
  }, [])

  // Bind SEO and Visual identity settings to DOM
  useEffect(() => {
    if (settings) {
      // Dynamic Page Title
      document.title = settings.seoTitle || 'Fatheali Landage | Portfolio'
      
      // Dynamic Favicon
      let faviconLink = document.querySelector("link[rel~='icon']")
      if (!faviconLink) {
        faviconLink = document.createElement('link')
        faviconLink.rel = 'icon'
        document.head.appendChild(faviconLink)
      }
      faviconLink.href = getAssetUrl(settings.faviconUrl) || '/favicon.ico'

      // Dynamic SEO Meta Description
      let metaDesc = document.querySelector("meta[name='description']")
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = settings.seoDescription || 'Fatheali Landage - Frontend Developer, Python Programmer, AI & Cybersecurity Enthusiast'

      // Dynamic SEO Meta Keywords
      let metaKeywords = document.querySelector("meta[name='keywords']")
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.name = 'keywords'
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.content = settings.seoKeywords || 'Fatheali Landage, Portfolio'

      // Dynamic OG (OpenGraph) Metadata
      let ogTitle = document.querySelector("meta[property='og:title']")
      if (!ogTitle) {
        ogTitle = document.createElement('meta')
        ogTitle.setAttribute('property', 'og:title')
        document.head.appendChild(ogTitle)
      }
      ogTitle.content = settings.ogTitle || settings.seoTitle || ''

      let ogDesc = document.querySelector("meta[property='og:description']")
      if (!ogDesc) {
        ogDesc = document.createElement('meta')
        ogDesc.setAttribute('property', 'og:description')
        document.head.appendChild(ogDesc)
      }
      ogDesc.content = settings.ogDescription || settings.seoDescription || ''

      let ogImg = document.querySelector("meta[property='og:image']")
      if (!ogImg) {
        ogImg = document.createElement('meta')
        ogImg.setAttribute('property', 'og:image')
        document.head.appendChild(ogImg)
      }
      ogImg.content = getAssetUrl(settings.ogImageUrl) || '/portfolio.png'

      // Inject Theme Hex Variables into HTML element to drive active glows
      const root = document.documentElement
      root.style.setProperty('--color-primary', settings.primaryColor || '#a855f7')
      root.style.setProperty('--color-secondary', settings.secondaryColor || '#06b6d4')
      root.style.setProperty('--color-bg', settings.bgColor || '#020005')
    }
  }, [settings])

  const githubUrl = socials.find(s => s.platform.toLowerCase() === 'github')?.url || ''
  const linkedinUrl = socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url || ''

  return (
    <div className={darkMode ? 'dark' : ''}>
      {loading && <Loader />}
      {!loading && (
        <div className="relative min-h-screen bg-[#020005] text-white" style={{ backgroundColor: settings?.bgColor || '#020005' }}>
          <ParticleBackground />
          <CustomCursor />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <main>
            <Hero 
              settings={settings}
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
            />
            <About settings={settings} />
            <Education settings={settings} />
            <Internships settings={settings} />
            <Skills />
            <Projects />
            <Certifications />
            <Cybersecurity settings={settings} />
            <Timeline />
            <CurrentlyLearning settings={settings} />
            <GitHubStats githubUrl={githubUrl} />
            <AchievementsGoals settings={settings} />
            <Contact settings={settings} />
          </main>
          
          <Footer />
        </div>
      )}
    </div>
  )
}
