import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import projectService from '../services/projectService'
import skillService from '../services/skillService'
import certificateService from '../services/certificateService'
import socialService from '../services/socialService'
import uploadService from '../services/uploadService'
import settingsService from '../services/settingsService'
import timelineService from '../services/timelineService'
import internshipService from '../services/internshipService'
import { getAssetUrl } from '../utils/url'

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23111827'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%23a855f7'/></svg>"
import { 
  FiFolder, FiCode, FiAward, FiShare2, FiLogOut, FiPlus, 
  FiEdit2, FiTrash2, FiExternalLink, FiCheck, FiX, FiAlertCircle,
  FiFileText, FiUploadCloud, FiSearch, FiSliders, FiBriefcase, 
  FiClock, FiUser, FiBookOpen, FiShield, FiTrendingUp, FiArrowUp, FiArrowDown,
  FiActivity
} from 'react-icons/fi'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  // Navigation tabs: projects | skills | certificates | internships | timeline | socials | resume | hero | education | cybersecurity | achievements | settings
  const [activeTab, setActiveTab] = useState('projects') 
  
  // State for data
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [certificates, setCertificates] = useState([])
  const [socials, setSocials] = useState([])
  const [internships, setInternships] = useState([])
  const [timeline, setTimeline] = useState([])
  const [resumeUrl, setResumeUrl] = useState('')
  const [settings, setSettings] = useState({
    resumeUrl: '',
    ownerName: '',
    headline: '',
    description: '',
    profileImage: '',
    aboutBio: '',
    aboutTitle: '',
    aboutSubtitle: '',
    degree: '',
    institution: '',
    location: '',
    duration: '',
    academicFocus: '',
    coursework: [],
    contactEmail: '',
    contactTitle: '',
    contactDesc: '',
    cybersecurityItems: [],
    achievementsList: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    faviconUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImageUrl: '',
    primaryColor: '',
    secondaryColor: '',
    bgColor: '',
    aboutCards: [],
    offersReceived: [],
    learningItems: [],
    heroStats: []
  })
  
  // Loaders and errors
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [resumeLoading, setResumeLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // for projects
  const [categoryFilter, setCategoryFilter] = useState('all') // for skills

  // Modals state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Form states
  const [projectForm, setProjectForm] = useState({ 
    title: '', 
    description: '', 
    image: '', 
    githubUrl: '', 
    demoUrl: '', 
    technologies: '',
    status: 'Completed'
  })
  const [skillForm, setSkillForm] = useState({ name: '', category: 'frontend', level: 80, color: '#a855f7' })
  const [certForm, setCertForm] = useState({ title: '', issuer: '', issueDate: '', image: '' })
  const [socialForm, setSocialForm] = useState({ platform: '', url: '', value: '' })
  
  const [internshipForm, setInternshipForm] = useState({
    company: '',
    role: '',
    duration: '',
    highlights: '',
    certId: '',
    color: '#a855f7'
  })

  const [timelineForm, setTimelineForm] = useState({
    year: '',
    title: '',
    detail: '',
    iconName: 'FiAward'
  })

  // Sub-items editor helper states
  const [newCoursework, setNewCoursework] = useState('')
  const [cyberForm, setCyberForm] = useState({ title: '', desc: '', progress: 80, color: '#ef4444' })
  const [editingCyberIndex, setEditingCyberIndex] = useState(-1)
  const [achievementForm, setAchievementForm] = useState({ title: '', desc: '' })
  const [editingAchievementIndex, setEditingAchievementIndex] = useState(-1)
  const [aboutCardForm, setAboutCardForm] = useState({ title: '', desc: '', iconName: 'FiTerminal' })
  const [editingAboutCardIndex, setEditingAboutCardIndex] = useState(-1)
  const [offerForm, setOfferForm] = useState({ role: '', company: '' })
  const [editingOfferIndex, setEditingOfferIndex] = useState(-1)
  const [learningItemForm, setLearningItemForm] = useState({ title: '', desc: '', color: '#3b82f6', iconName: 'FiCode' })
  const [editingLearningIndex, setEditingLearningIndex] = useState(-1)

  // Hero Statistics Sub-form states
  const [heroStatForm, setHeroStatForm] = useState({ value: '', title: '', subtitle: '', targetSection: 'Projects', order: 0 })
  const [editingHeroStatIndex, setEditingHeroStatIndex] = useState(-1)

  // Fetch all data
  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      if (activeTab === 'projects') {
        const data = await projectService.getAll()
        setProjects(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } else if (activeTab === 'skills') {
        const data = await skillService.getAll()
        setSkills(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
        const settingsData = await settingsService.getSettings()
        setSettings(settingsData)
      } else if (activeTab === 'certificates') {
        const data = await certificateService.getAll()
        setCertificates(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } else if (activeTab === 'socials') {
        const data = await socialService.getAll()
        setSocials(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } else if (activeTab === 'resume') {
        const data = await settingsService.getSettings()
        setResumeUrl(data.resumeUrl)
      } else if (activeTab === 'internships') {
        const data = await internshipService.getAll()
        setInternships(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
        const settingsData = await settingsService.getSettings()
        setSettings(settingsData)
      } else if (activeTab === 'timeline') {
        const data = await timelineService.getAll()
        setTimeline(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      } else if (['hero', 'herostats', 'education', 'cybersecurity', 'achievements', 'settings'].includes(activeTab)) {
        const data = await settingsService.getSettings()
        setSettings(data)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch data from the server. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Reset filters when switching tabs
    setSearchQuery('')
    setStatusFilter('all')
    setCategoryFilter('all')
  }, [activeTab])

  // Reset forms helper
  const resetForm = () => {
    setProjectForm({ title: '', description: '', image: '', githubUrl: '', demoUrl: '', technologies: '', status: 'Completed' })
    setSkillForm({ name: '', category: 'frontend', level: 80, color: '#a855f7' })
    setCertForm({ title: '', issuer: '', issueDate: '', image: '' })
    setSocialForm({ platform: '', url: '', value: '' })
    setInternshipForm({ company: '', role: '', duration: '', highlights: '', certId: '', color: '#a855f7' })
    setTimelineForm({ year: '', title: '', detail: '', iconName: 'FiAward' })
    setEditingItem(null)
    setModalOpen(false)
  }

  // Open modal for creating new item
  const handleCreateOpen = () => {
    resetForm()
    setModalOpen(true)
  }

  // Open modal for editing existing item
  const handleEditOpen = (item) => {
    setEditingItem(item)
    setError('')
    if (activeTab === 'projects') {
      setProjectForm({
        title: item.title,
        description: item.description,
        image: item.image || '',
        githubUrl: item.githubUrl,
        demoUrl: item.demoUrl,
        technologies: item.technologies.join(', '),
        status: item.status || 'Completed'
      })
    } else if (activeTab === 'skills') {
      setSkillForm({
        name: item.name,
        category: item.category,
        level: item.level,
        color: item.color
      })
    } else if (activeTab === 'certificates') {
      setCertForm({
        title: item.title,
        issuer: item.issuer,
        issueDate: item.issueDate,
        image: item.image || ''
      })
    } else if (activeTab === 'socials') {
      setSocialForm({
        platform: item.platform,
        url: item.url,
        value: item.value
      })
    } else if (activeTab === 'internships') {
      setInternshipForm({
        company: item.company,
        role: item.role,
        duration: item.duration,
        highlights: item.highlights.join(', '),
        certId: item.certId || '',
        color: item.color || '#a855f7'
      })
    } else if (activeTab === 'timeline') {
      setTimelineForm({
        year: item.year,
        title: item.title,
        detail: item.detail,
        iconName: item.iconName || 'FiAward'
      })
    }
    setModalOpen(true)
  }

  // Handle image upload for Project or Certificate
  const handleImageUpload = async (e, formType) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadLoading(true)
    setError('')
    try {
      const data = await uploadService.uploadImage(file)
      console.log("Upload response data:", data)
      if (formType === 'project') {
        setProjectForm(prev => ({ ...prev, image: data.imageUrl }))
      } else if (formType === 'certificate') {
        setCertForm(prev => ({ ...prev, image: data.imageUrl }))
      } else if (formType === 'profile') {
        setSettings(prev => ({ ...prev, profileImage: data.imageUrl }))
      } else if (formType === 'og') {
        setSettings(prev => ({ ...prev, ogImageUrl: data.imageUrl }))
      }
      showNotification('Image uploaded successfully.')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to upload image.')
    } finally {
      setUploadLoading(false)
    }
  }

  // Handle PDF Resume replacement upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setResumeLoading(true)
    setError('')
    try {
      const data = await uploadService.uploadResume(file)
      setResumeUrl(data.resumeUrl)
      showNotification('Resume PDF uploaded and replaced successfully.')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to upload PDF resume.')
    } finally {
      setResumeLoading(false)
    }
  }

  // Handle Favicon upload
  const handleFaviconUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadLoading(true)
    setError('')
    try {
      const data = await uploadService.uploadFavicon(file)
      setSettings(prev => ({ ...prev, faviconUrl: data.faviconUrl }))
      showNotification('Favicon file uploaded successfully.')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to upload favicon.')
    } finally {
      setUploadLoading(false)
    }
  }

  // Handle Move / Reorder Items
  const handleMoveItem = async (index, direction) => {
    let list = []
    let service = null
    let setter = null

    if (activeTab === 'projects') {
      list = [...projects]
      service = projectService
      setter = setProjects
    } else if (activeTab === 'skills') {
      list = [...skills]
      service = skillService
      setter = setSkills
    } else if (activeTab === 'certificates') {
      list = [...certificates]
      service = certificateService
      setter = setCertificates
    } else if (activeTab === 'socials') {
      list = [...socials]
      service = socialService
      setter = setSocials
    } else if (activeTab === 'internships') {
      list = [...internships]
      service = internshipService
      setter = setInternships
    } else if (activeTab === 'timeline') {
      list = [...timeline]
      service = timelineService
      setter = setTimeline
    } else {
      return
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= list.length) return

    setActionLoading(true)
    setError('')
    try {
      // Ensure orders are defined and distinct. If not, normalize them.
      const needsNormalized = list.some((item, idx) => item.order === undefined || item.order === null || list.findIndex(x => x.order === item.order) !== idx)
      
      if (needsNormalized) {
        for (let i = 0; i < list.length; i++) {
          list[i].order = i
          await service.update(list[i]._id, { order: i })
        }
      }

      // Swap order properties
      const tempOrder = list[index].order
      list[index].order = list[targetIndex].order
      list[targetIndex].order = tempOrder

      // Persist swaps
      await service.update(list[index]._id, { order: list[index].order })
      await service.update(list[targetIndex]._id, { order: list[targetIndex].order })

      list.sort((a, b) => (a.order || 0) - (b.order || 0))
      setter(list)
      showNotification('Order swapped successfully.')
    } catch (err) {
      console.error(err)
      setError('Failed to update entry sequence.')
    } finally {
      setActionLoading(false)
    }
  }

  // Handle CRUD submit operations
  const handleSubmit = async (e) => {
    e.preventDefault()
    setActionLoading(true)
    setError('')
    setSuccess('')
    try {
      if (activeTab === 'projects') {
        const payload = {
          ...projectForm,
          technologies: projectForm.technologies.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        }
        if (editingItem) {
          const updated = await projectService.update(editingItem._id, payload)
          setProjects(projects.map(p => p._id === editingItem._id ? updated : p))
          showNotification('Project updated successfully.')
        } else {
          const created = await projectService.create(payload)
          setProjects([created, ...projects])
          showNotification('Project created successfully.')
        }
      } else if (activeTab === 'skills') {
        if (editingItem) {
          const updated = await skillService.update(editingItem._id, skillForm)
          setSkills(skills.map(s => s._id === editingItem._id ? updated : s))
          showNotification('Skill updated successfully.')
        } else {
          const created = await skillService.create(skillForm)
          setSkills([...skills, created])
          showNotification('Skill created successfully.')
        }
      } else if (activeTab === 'certificates') {
        if (editingItem) {
          const updated = await certificateService.update(editingItem._id, certForm)
          setCertificates(certificates.map(c => c._id === editingItem._id ? updated : c))
          showNotification('Certificate updated successfully.')
        } else {
          const created = await certificateService.create(certForm)
          setCertificates([created, ...certificates])
          showNotification('Certificate created successfully.')
        }
      } else if (activeTab === 'socials') {
        if (editingItem) {
          const updated = await socialService.update(editingItem._id, socialForm)
          setSocials(socials.map(s => s._id === editingItem._id ? updated : s))
          showNotification('Social link updated successfully.')
        } else {
          const created = await socialService.create(socialForm)
          setSocials([...socials, created])
          showNotification('Social link created successfully.')
        }
      } else if (activeTab === 'internships') {
        const payload = {
          ...internshipForm,
          highlights: internshipForm.highlights.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        }
        if (editingItem) {
          const updated = await internshipService.update(editingItem._id, payload)
          setInternships(internships.map(i => i._id === editingItem._id ? updated : i))
          showNotification('Internship experience updated successfully.')
        } else {
          const created = await internshipService.create(payload)
          setInternships([created, ...internships])
          showNotification('Internship experience created successfully.')
        }
      } else if (activeTab === 'timeline') {
        if (editingItem) {
          const updated = await timelineService.update(editingItem._id, timelineForm)
          setTimeline(timeline.map(t => t._id === editingItem._id ? updated : t))
          showNotification('Milestone updated successfully.')
        } else {
          const created = await timelineService.create(timelineForm)
          setTimeline([...timeline, created])
          showNotification('Milestone created successfully.')
        }
      }
      resetForm()
    } catch (err) {
      console.error(err)
      const errMsgs = err.response?.data?.errors
      if (errMsgs && Array.isArray(errMsgs)) {
        setError(errMsgs.map(e => e.msg).join('. '))
      } else {
        setError(err.response?.data?.message || 'Error occurred while saving data.')
      }
    } finally {
      setActionLoading(false)
    }
  }

  // Handle delete operations
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    setActionLoading(true)
    setError('')
    setSuccess('')
    try {
      if (activeTab === 'projects') {
        await projectService.delete(id)
        setProjects(projects.filter(p => p._id !== id))
        showNotification('Project deleted successfully.')
      } else if (activeTab === 'skills') {
        await skillService.delete(id)
        setSkills(skills.filter(s => s._id !== id))
        showNotification('Skill deleted successfully.')
      } else if (activeTab === 'certificates') {
        await certificateService.delete(id)
        setCertificates(certificates.filter(c => c._id !== id))
        showNotification('Certificate deleted successfully.')
      } else if (activeTab === 'socials') {
        await socialService.delete(id)
        setSocials(socials.filter(s => s._id !== id))
        showNotification('Social link deleted successfully.')
      } else if (activeTab === 'internships') {
        await internshipService.delete(id)
        setInternships(internships.filter(i => i._id !== id))
        showNotification('Internship experience deleted successfully.')
      } else if (activeTab === 'timeline') {
        await timelineService.delete(id)
        setTimeline(timeline.filter(t => t._id !== id))
        showNotification('Timeline milestone deleted successfully.')
      }
    } catch (err) {
      console.error(err)
      setError('Error occurred while deleting item.')
    } finally {
      setActionLoading(false)
    }
  }

  // Settings Save Helper (Hero, About, Education, SEO Settings)
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault()
    setActionLoading(true)
    setError('')
    setSuccess('')
    try {
      const updated = await settingsService.updateSettings(settings)
      setSettings(updated)
      showNotification('Global settings configurations saved.')
    } catch (err) {
      console.error(err)
      setError('Failed to update settings parameters.')
    } finally {
      setActionLoading(false)
    }
  }

  // Coursework Sub-handlers
  const handleAddCoursework = () => {
    if (!newCoursework.trim()) return
    if (settings.coursework.includes(newCoursework.trim())) return
    setSettings(prev => ({
      ...prev,
      coursework: [...prev.coursework, newCoursework.trim()]
    }))
    setNewCoursework('')
  }

  const handleRemoveCoursework = (val) => {
    setSettings(prev => ({
      ...prev,
      coursework: prev.coursework.filter(x => x !== val)
    }))
  }

  // Cybersecurity Items Sub-handlers
  const handleSaveCyberItem = (e) => {
    e.preventDefault()
    if (!cyberForm.title.trim() || !cyberForm.desc.trim()) return
    setSettings(prev => {
      const items = [...prev.cybersecurityItems]
      if (editingCyberIndex > -1) {
        items[editingCyberIndex] = cyberForm
      } else {
        items.push(cyberForm)
      }
      return { ...prev, cybersecurityItems: items }
    })
    setCyberForm({ title: '', desc: '', progress: 80, color: '#ef4444' })
    setEditingCyberIndex(-1)
  }

  const handleEditCyberItem = (index) => {
    setCyberForm(settings.cybersecurityItems[index])
    setEditingCyberIndex(index)
  }

  const handleRemoveCyberItem = (index) => {
    setSettings(prev => ({
      ...prev,
      cybersecurityItems: prev.cybersecurityItems.filter((_, idx) => idx !== index)
    }))
  }

  // Achievements Items Sub-handlers
  const handleSaveAchievementItem = (e) => {
    e.preventDefault()
    if (!achievementForm.title.trim() || !achievementForm.desc.trim()) return
    setSettings(prev => {
      const list = [...prev.achievementsList]
      if (editingAchievementIndex > -1) {
        list[editingAchievementIndex] = achievementForm
      } else {
        list.push(achievementForm)
      }
      return { ...prev, achievementsList: list }
    })
    setAchievementForm({ title: '', desc: '' })
    setEditingAchievementIndex(-1)
  }

  const handleEditAchievementItem = (index) => {
    setAchievementForm(settings.achievementsList[index])
    setEditingAchievementIndex(index)
  }

  const handleRemoveAchievementItem = (index) => {
    setSettings(prev => ({
      ...prev,
      achievementsList: prev.achievementsList.filter((_, idx) => idx !== index)
    }))
  }

  // About Cards helpers
  const handleSaveAboutCard = (e) => {
    if (e) e.preventDefault()
    if (!aboutCardForm.title.trim() || !aboutCardForm.desc.trim()) return
    setSettings(prev => {
      const list = [...prev.aboutCards]
      if (editingAboutCardIndex > -1) {
        list[editingAboutCardIndex] = aboutCardForm
      } else {
        list.push(aboutCardForm)
      }
      return { ...prev, aboutCards: list }
    })
    setAboutCardForm({ title: '', desc: '', iconName: 'FiTerminal' })
    setEditingAboutCardIndex(-1)
  }

  const handleEditAboutCard = (index) => {
    setEditingAboutCardIndex(index)
    setAboutCardForm(settings.aboutCards[index])
  }

  const handleRemoveAboutCard = (index) => {
    setSettings(prev => ({
      ...prev,
      aboutCards: prev.aboutCards.filter((_, i) => i !== index)
    }))
  }

  // Offers Received helpers
  const handleSaveOffer = (e) => {
    if (e) e.preventDefault()
    if (!offerForm.role.trim() || !offerForm.company.trim()) return
    setSettings(prev => {
      const list = [...prev.offersReceived]
      if (editingOfferIndex > -1) {
        list[editingOfferIndex] = offerForm
      } else {
        list.push(offerForm)
      }
      return { ...prev, offersReceived: list }
    })
    setOfferForm({ role: '', company: '' })
    setEditingOfferIndex(-1)
  }

  const handleEditOffer = (index) => {
    setEditingOfferIndex(index)
    setOfferForm(settings.offersReceived[index])
  }

  const handleRemoveOffer = (index) => {
    setSettings(prev => ({
      ...prev,
      offersReceived: prev.offersReceived.filter((_, i) => i !== index)
    }))
  }

  // Learning Items helpers
  const handleSaveLearningItem = (e) => {
    if (e) e.preventDefault()
    if (!learningItemForm.title.trim() || !learningItemForm.desc.trim()) return
    setSettings(prev => {
      const list = [...prev.learningItems]
      if (editingLearningIndex > -1) {
        list[editingLearningIndex] = learningItemForm
      } else {
        list.push(learningItemForm)
      }
      return { ...prev, learningItems: list }
    })
    setLearningItemForm({ title: '', desc: '', color: '#3b82f6', iconName: 'FiCode' })
    setEditingLearningIndex(-1)
  }

  const handleEditLearningItem = (index) => {
    setEditingLearningIndex(index)
    setLearningItemForm(settings.learningItems[index])
  }

  const handleRemoveLearningItem = (index) => {
    setSettings(prev => ({
      ...prev,
      learningItems: prev.learningItems.filter((_, i) => i !== index)
    }))
  }

  // Hero Statistics Sub-handlers
  const handleSaveHeroStatItem = (e) => {
    if (e) e.preventDefault()
    if (!heroStatForm.value.trim() || !heroStatForm.title.trim()) return
    setSettings(prev => {
      const list = prev.heroStats ? [...prev.heroStats] : []
      if (editingHeroStatIndex > -1) {
        list[editingHeroStatIndex] = { ...heroStatForm, order: Number(heroStatForm.order) || 0 }
      } else {
        list.push({ ...heroStatForm, order: Number(heroStatForm.order) || list.length + 1 })
      }
      return { ...prev, heroStats: list.sort((a, b) => (a.order || 0) - (b.order || 0)) }
    })
    setHeroStatForm({ value: '', title: '', subtitle: '', targetSection: 'Projects', order: 0 })
    setEditingHeroStatIndex(-1)
  }

  const handleEditHeroStatItem = (index) => {
    setHeroStatForm(settings.heroStats[index])
    setEditingHeroStatIndex(index)
  }

  const handleRemoveHeroStatItem = (index) => {
    setSettings(prev => ({
      ...prev,
      heroStats: (prev.heroStats || []).filter((_, idx) => idx !== index)
    }))
  }

  const handleMoveHeroStatItem = (index, direction) => {
    setSettings(prev => {
      if (!prev.heroStats) return prev
      const list = [...prev.heroStats]
      const targetIndex = index + direction
      if (targetIndex < 0 || targetIndex >= list.length) return prev
      
      // Swap items
      const temp = list[index]
      list[index] = list[targetIndex]
      list[targetIndex] = temp
      
      // Reassign order fields based on new indices
      const updatedList = list.map((item, idx) => ({
        ...item,
        order: idx + 1
      }))
      return { ...prev, heroStats: updatedList }
    })
  }


  const showNotification = (msg) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(''), 4000)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Filter listings helper
  const getFilteredItems = () => {
    if (activeTab === 'projects') {
      return projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter
        return matchesSearch && matchesStatus
      })
    }
    if (activeTab === 'skills') {
      return skills.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter
        return matchesSearch && matchesCategory
      })
    }
    if (activeTab === 'certificates') {
      return certificates.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (activeTab === 'socials') {
      return socials.filter(s => 
        s.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (activeTab === 'internships') {
      return internships.filter(i =>
        i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (activeTab === 'timeline') {
      return timeline.filter(t =>
        t.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.detail.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return []
  }

  const filteredItems = getFilteredItems()
  const isDirectSettingsTab = ['hero', 'herostats', 'education', 'cybersecurity', 'achievements', 'settings'].includes(activeTab)

  return (
    <div className="min-h-screen bg-[#020005] text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 glass border-b border-white/5 bg-[#020005]/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold font-mono shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Admin Terminal</h1>
            <p className="text-xs text-slate-500 font-mono">Fatheali Landage Portfolio CMS</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg">
            Role: Admin ({user?.email})
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs bg-red-950/20 border border-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 text-red-300 font-semibold px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 relative z-10 container mx-auto px-6 py-10 grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 flex flex-col gap-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-sidebar-scrollbar">
          <h2 className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase px-3 mb-1">Portfolio Items</h2>
          {[
            { id: 'projects', label: 'Projects', icon: FiFolder, color: '#06b6d4' },
            { id: 'skills', label: 'Skills', icon: FiCode, color: '#a855f7' },
            { id: 'certificates', label: 'Certificates', icon: FiAward, color: '#06b6d4' },
            { id: 'internships', label: 'Work Experience', icon: FiBriefcase, color: '#a855f7' },
            { id: 'timeline', label: 'Timeline Milestones', icon: FiClock, color: '#06b6d4' },
            { id: 'socials', label: 'Social Links', icon: FiShare2, color: '#a855f7' },
            { id: 'resume', label: 'Manage Resume', icon: FiFileText, color: '#06b6d4' }
          ].map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer border ${
                  active 
                    ? 'bg-white/5 text-white border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]' 
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/2'
                }`}
              >
                <Icon className="text-lg shrink-0" style={{ color: active ? tab.color : undefined }} />
                <span>{tab.label}</span>
              </button>
            )
          })}

          <h2 className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase px-3 mt-4 mb-1">General Settings</h2>
          {[
            { id: 'hero', label: 'Hero & About', icon: FiUser, color: '#a855f7' },
            { id: 'herostats', label: 'Hero Statistics', icon: FiActivity, color: '#06b6d4' },
            { id: 'education', label: 'Education Details', icon: FiBookOpen, color: '#a855f7' },
            { id: 'cybersecurity', label: 'Cybersecurity Panel', icon: FiShield, color: '#06b6d4' },
            { id: 'achievements', label: 'Achievements List', icon: FiTrendingUp, color: '#a855f7' },
            { id: 'settings', label: 'SEO & Visual Themes', icon: FiSliders, color: '#06b6d4' }
          ].map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer border ${
                  active 
                    ? 'bg-white/5 text-white border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]' 
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/2'
                }`}
              >
                <Icon className="text-lg shrink-0" style={{ color: active ? tab.color : undefined }} />
                <span>{tab.label}</span>
              </button>
            )
          })}

          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-3 mt-6 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            <FiExternalLink /> Live Portfolio
          </button>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-3 flex flex-col gap-6">
          {/* Notifications */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-5 py-4 bg-red-950/40 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-300 text-sm"
              >
                <FiAlertCircle className="text-lg shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-5 py-4 bg-green-950/40 border border-green-500/30 rounded-2xl flex items-center gap-3 text-green-300 text-sm"
              >
                <FiCheck className="text-lg shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Heading & Action Headers */}
          {!isDirectSettingsTab && activeTab !== 'resume' ? (
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/3 border border-white/5 rounded-2xl p-6">
              <div className="min-w-[150px]">
                <h2 className="text-2xl font-bold capitalize">
                  {activeTab === 'internships' ? 'Work Experiences' : activeTab}
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Manage entries</p>
              </div>

              {/* Search and Filters */}
              <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111827] border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                  />
                </div>

                {/* Specific Filters */}
                {activeTab === 'projects' && (
                  <div className="relative min-w-[140px]">
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="all" className="bg-[#111827] text-white">All Statuses</option>
                      <option value="Completed" className="bg-[#111827] text-white">Completed</option>
                      <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
                      <option value="Learning Project" className="bg-[#111827] text-white">Learning Project</option>
                    </select>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="relative min-w-[140px]">
                    <select
                      value={categoryFilter}
                      onChange={e => setCategoryFilter(e.target.value)}
                      className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="all" className="bg-[#111827] text-white">All Categories</option>
                      <option value="frontend" className="bg-[#111827] text-white">Frontend</option>
                      <option value="backend" className="bg-[#111827] text-white">Backend</option>
                      <option value="programming" className="bg-[#111827] text-white">Programming</option>
                      <option value="database" className="bg-[#111827] text-white">Database</option>
                      <option value="ai-ml" className="bg-[#111827] text-white">AI & ML</option>
                      <option value="cybersecurity" className="bg-[#111827] text-white">Cybersecurity</option>
                      <option value="tools" className="bg-[#111827] text-white">Tools</option>
                    </select>
                  </div>
                )}
              </div>

              <button
                onClick={handleCreateOpen}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all cursor-pointer shrink-0"
              >
                <FiPlus /> Add New
              </button>
            </div>
          ) : activeTab === 'resume' ? (
            <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
              <h2 className="text-2xl font-bold">Resume Administrator</h2>
              <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Upload or Replace active CV document</p>
            </div>
          ) : (
            <div className="bg-white/3 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold capitalize">
                  {activeTab === 'hero' ? 'Hero & Biography' : 
                   activeTab === 'herostats' ? 'Hero Statistics Panel' : 
                   activeTab === 'education' ? 'Academic Program' : 
                   activeTab === 'cybersecurity' ? 'Cybersecurity Operations' : 
                   activeTab === 'achievements' ? 'Achievements List' : 
                   'SEO & Colors Setup'}
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Configure global section variables</p>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={actionLoading || uploadLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                <FiCheck /> {actionLoading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          )}

          {/* Table / Grid list views / Inline Panel Editors */}
          <div className="glass border border-white/5 rounded-2xl overflow-hidden bg-[#020005]/40 p-1">
            {loading ? (
              <div className="py-24 text-center text-slate-500 font-mono">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 mx-auto mb-4 font-sans"></div>
                Loading details...
              </div>
            ) : (
              <>
                {/* ── PROJECTS TAB ── */}
                {activeTab === 'projects' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-500 text-xs font-mono uppercase bg-white/2">
                          <th className="py-4 px-6 w-12">Seq</th>
                          <th className="py-4 px-6">Project Title</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Technologies</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length === 0 ? (
                          <tr><td colSpan="5" className="py-12 text-center text-slate-600 font-mono">No matching projects found.</td></tr>
                        ) : (
                          filteredItems.map((project, idx) => (
                            <tr key={project._id} className="border-b border-white/5 hover:bg-white/1 transition-all">
                              <td className="py-5 px-6">
                                <div className="flex flex-col items-center gap-1">
                                  <button disabled={idx === 0} onClick={() => handleMoveItem(idx, 'up')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowUp /></button>
                                  <button disabled={idx === filteredItems.length - 1} onClick={() => handleMoveItem(idx, 'down')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowDown /></button>
                                </div>
                              </td>
                              <td className="py-5 px-6 font-semibold">{project.title}</td>
                              <td className="py-5 px-6">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                                  project.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                  project.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                  'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                }`}>
                                  {project.status || 'Completed'}
                                </span>
                              </td>
                              <td className="py-5 px-6">
                                <div className="flex flex-wrap gap-1.5 max-w-xs">
                                  {project.technologies.map(t => (
                                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">{t}</span>
                                  ))}
                                </div>
                              </td>
                              <td className="py-5 px-6 flex items-center gap-3">
                                <button onClick={() => handleEditOpen(project)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiEdit2 /></button>
                                <button onClick={() => handleDelete(project._id)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiTrash2 /></button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ── SKILLS TAB ── */}
                {activeTab === 'skills' && (
                  <>
                    <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-500 text-xs font-mono uppercase bg-white/2">
                          <th className="py-4 px-6 w-12">Seq</th>
                          <th className="py-4 px-6">Skill</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Proficiency</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length === 0 ? (
                          <tr><td colSpan="5" className="py-12 text-center text-slate-600 font-mono">No matching skills found.</td></tr>
                        ) : (
                          filteredItems.map((skill, idx) => (
                            <tr key={skill._id} className="border-b border-white/5 hover:bg-white/1 transition-all">
                              <td className="py-5 px-6">
                                <div className="flex flex-col items-center gap-1">
                                  <button disabled={idx === 0} onClick={() => handleMoveItem(idx, 'up')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowUp /></button>
                                  <button disabled={idx === filteredItems.length - 1} onClick={() => handleMoveItem(idx, 'down')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowDown /></button>
                                </div>
                              </td>
                              <td className="py-5 px-6 font-semibold flex items-center gap-3">
                                <div className="w-3.5 h-3.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" style={{ backgroundColor: skill.color }} />
                                {skill.name}
                              </td>
                              <td className="py-5 px-6 capitalize text-slate-400 font-mono text-sm">{skill.category}</td>
                              <td className="py-5 px-6 font-mono text-purple-400">{skill.level}%</td>
                              <td className="py-5 px-6 flex items-center gap-3">
                                <button onClick={() => handleEditOpen(skill)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiEdit2 /></button>
                                <button onClick={() => handleDelete(skill._id)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiTrash2 /></button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                    {/* Currently Learning Topics Sub-section */}
                    <div className="border-t border-white/5 pt-8 mt-6 px-6" />
                    
                    <div className="p-6 flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">Currently Learning Topics</h3>
                          <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Configure self-study paths shown on the homepage</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleSaveSettings}
                          disabled={actionLoading}
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                        >
                          <FiCheck /> {actionLoading ? 'Saving...' : 'Save Learning Topics'}
                        </button>
                      </div>

                      <form onSubmit={handleSaveLearningItem} className="bg-white/2 border border-white/5 p-5 rounded-2xl flex flex-col gap-4 mt-2">
                        <h4 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">
                          {editingLearningIndex > -1 ? 'Edit Learning Topic' : 'Add Learning Topic'}
                        </h4>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Topic Title</label>
                            <input 
                              type="text"
                              placeholder="Advanced React"
                              value={learningItemForm.title}
                              onChange={e => setLearningItemForm({...learningItemForm, title: e.target.value})}
                              className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Icon Component</label>
                            <select
                              value={learningItemForm.iconName}
                              onChange={e => setLearningItemForm({...learningItemForm, iconName: e.target.value})}
                              className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                            >
                              <option value="FiCode" className="bg-[#111827] text-white">Code Bracket (FiCode)</option>
                              <option value="FiTerminal" className="bg-[#111827] text-white">Terminal Command (FiTerminal)</option>
                              <option value="FiShield" className="bg-[#111827] text-white">Shield Security (FiShield)</option>
                              <option value="FiBook" className="bg-[#111827] text-white">Book Library (FiBook)</option>
                              <option value="FiGlobe" className="bg-[#111827] text-white">Globe Web (FiGlobe)</option>
                              <option value="FiActivity" className="bg-[#111827] text-white">Activity Pulse (FiActivity)</option>
                              <option value="FiAward" className="bg-[#111827] text-white">Award Badge (FiAward)</option>
                              <option value="FiCpu" className="bg-[#111827] text-white">Processor (FiCpu)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 items-center">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Topic Accent Color</label>
                            <div className="flex gap-2">
                              <input 
                                type="color"
                                value={learningItemForm.color}
                                onChange={e => setLearningItemForm({...learningItemForm, color: e.target.value})}
                                className="h-10 w-10 bg-transparent border-0 cursor-pointer rounded-lg"
                              />
                              <input 
                                type="text"
                                value={learningItemForm.color}
                                onChange={e => setLearningItemForm({...learningItemForm, color: e.target.value})}
                                placeholder="#61DAFB"
                                className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Brief Description / Status</label>
                            <input 
                              type="text"
                              placeholder="Custom hooks, performance optimization, state trees"
                              value={learningItemForm.desc}
                              onChange={e => setLearningItemForm({...learningItemForm, desc: e.target.value})}
                              className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-1">
                          {editingLearningIndex > -1 && (
                            <button 
                              type="button" 
                              onClick={() => { setEditingLearningIndex(-1); setLearningItemForm({ title: '', desc: '', color: '#3b82f6', iconName: 'FiCode' }); }} 
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                          <button 
                            type="submit" 
                            className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] text-white font-semibold rounded-xl text-xs cursor-pointer"
                          >
                            {editingLearningIndex > -1 ? 'Update Topic' : 'Add Topic'}
                          </button>
                        </div>
                      </form>

                      {/* Listing of current topics */}
                      <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Configured Learning Topics</h4>
                        
                        {!settings.learningItems || settings.learningItems.length === 0 ? (
                          <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-slate-500 font-mono text-xs">
                            No learning topics configured yet.
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {settings.learningItems.map((topic, idx) => (
                              <div key={idx} className="bg-white/2 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-all font-sans">
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold text-slate-200 flex items-center gap-2">
                                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: topic.color }} />
                                      {topic.title}
                                    </h5>
                                    <span className="text-[10px] font-mono text-slate-500">[{topic.iconName}]</span>
                                  </div>
                                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{topic.desc}</p>
                                </div>
                                <div className="flex justify-end gap-2 border-t border-white/5 pt-3">
                                  <button type="button" onClick={() => handleEditLearningItem(idx)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"><FiEdit2 /></button>
                                  <button type="button" onClick={() => handleRemoveLearningItem(idx)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg cursor-pointer"><FiTrash2 /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* ── CERTIFICATES TAB ── */}
                {activeTab === 'certificates' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-500 text-xs font-mono uppercase bg-white/2">
                          <th className="py-4 px-6 w-12">Seq</th>
                          <th className="py-4 px-6">Certificate</th>
                          <th className="py-4 px-6">Issuer</th>
                          <th className="py-4 px-6">Issue Date</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length === 0 ? (
                          <tr><td colSpan="5" className="py-12 text-center text-slate-600 font-mono">No matching certificates found.</td></tr>
                        ) : (
                          filteredItems.map((cert, idx) => (
                            <tr key={cert._id} className="border-b border-white/5 hover:bg-white/1 transition-all">
                              <td className="py-5 px-6">
                                <div className="flex flex-col items-center gap-1">
                                  <button disabled={idx === 0} onClick={() => handleMoveItem(idx, 'up')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowUp /></button>
                                  <button disabled={idx === filteredItems.length - 1} onClick={() => handleMoveItem(idx, 'down')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowDown /></button>
                                </div>
                              </td>
                              <td className="py-5 px-6 font-semibold">{cert.title}</td>
                              <td className="py-5 px-6 text-slate-300">{cert.issuer}</td>
                              <td className="py-5 px-6 font-mono text-slate-400 text-sm">{cert.issueDate}</td>
                              <td className="py-5 px-6 flex items-center gap-3">
                                <button onClick={() => handleEditOpen(cert)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiEdit2 /></button>
                                <button onClick={() => handleDelete(cert._id)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiTrash2 /></button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ── WORK EXPERIENCE (INTERNSHIPS) TAB ── */}
                {activeTab === 'internships' && (
                  <>
                    <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-500 text-xs font-mono uppercase bg-white/2">
                          <th className="py-4 px-6 w-12">Seq</th>
                          <th className="py-4 px-6">Company</th>
                          <th className="py-4 px-6">Role</th>
                          <th className="py-4 px-6">Duration</th>
                          <th className="py-4 px-6">Highlights</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length === 0 ? (
                          <tr><td colSpan="6" className="py-12 text-center text-slate-600 font-mono">No experience entries found.</td></tr>
                        ) : (
                          filteredItems.map((intern, idx) => (
                            <tr key={intern._id} className="border-b border-white/5 hover:bg-white/1 transition-all">
                              <td className="py-5 px-6">
                                <div className="flex flex-col items-center gap-1">
                                  <button disabled={idx === 0} onClick={() => handleMoveItem(idx, 'up')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowUp /></button>
                                  <button disabled={idx === filteredItems.length - 1} onClick={() => handleMoveItem(idx, 'down')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowDown /></button>
                                </div>
                              </td>
                              <td className="py-5 px-6 font-semibold flex items-center gap-3">
                                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: intern.color }} />
                                {intern.company}
                              </td>
                              <td className="py-5 px-6 text-slate-200">{intern.role}</td>
                              <td className="py-5 px-6 text-slate-400 font-mono text-sm">{intern.duration}</td>
                              <td className="py-5 px-6">
                                <ul className="list-disc list-inside text-xs text-slate-400 max-w-xs truncate">
                                  {intern.highlights.map((h, i) => <li key={i} className="truncate">{h}</li>)}
                                </ul>
                              </td>
                              <td className="py-5 px-6 flex items-center gap-3">
                                <button onClick={() => handleEditOpen(intern)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiEdit2 /></button>
                                <button onClick={() => handleDelete(intern._id)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiTrash2 /></button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                    {/* Offers Received / Other Opportunities Sub-section */}
                    <div className="border-t border-white/5 pt-8 mt-6 px-6" />
                    
                    <div className="p-6 flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">Other Opportunities / Offers Received</h3>
                          <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Configure additional offer items shown on the homepage</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleSaveSettings}
                          disabled={actionLoading}
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                        >
                          <FiCheck /> {actionLoading ? 'Saving...' : 'Save Offers'}
                        </button>
                      </div>

                      <form onSubmit={handleSaveOffer} className="bg-white/2 border border-white/5 p-5 rounded-2xl flex flex-col gap-4 mt-2">
                        <h4 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">
                          {editingOfferIndex > -1 ? 'Edit Offer Entry' : 'Add Offer Entry'}
                        </h4>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Offer Role / Title</label>
                            <input 
                              type="text"
                              placeholder="Web Developer Intern"
                              value={offerForm.role}
                              onChange={e => setOfferForm({...offerForm, role: e.target.value})}
                              className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Company Name</label>
                            <input 
                              type="text"
                              placeholder="InnoByte Services"
                              value={offerForm.company}
                              onChange={e => setOfferForm({...offerForm, company: e.target.value})}
                              className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-1">
                          {editingOfferIndex > -1 && (
                            <button 
                              type="button" 
                              onClick={() => { setEditingOfferIndex(-1); setOfferForm({ role: '', company: '' }); }} 
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                          <button 
                            type="submit" 
                            className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] text-white font-semibold rounded-xl text-xs cursor-pointer"
                          >
                            {editingOfferIndex > -1 ? 'Update Offer' : 'Add Offer'}
                          </button>
                        </div>
                      </form>

                      {/* Listing of current offers */}
                      <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Configured Offers</h4>
                        
                        {!settings.offersReceived || settings.offersReceived.length === 0 ? (
                          <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-slate-500 font-mono text-xs">
                            No additional offers configured.
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-4">
                            {settings.offersReceived.map((offer, idx) => (
                              <div key={idx} className="bg-white/2 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-all font-sans">
                                <div>
                                  <h5 className="font-semibold text-slate-200 leading-snug">{offer.role}</h5>
                                  <p className="text-xs text-slate-400 mt-1">{offer.company}</p>
                                </div>
                                <div className="flex justify-end gap-2 border-t border-white/5 pt-3 mt-4">
                                  <button type="button" onClick={() => handleEditOffer(idx)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"><FiEdit2 /></button>
                                  <button type="button" onClick={() => handleRemoveOffer(idx)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg cursor-pointer"><FiTrash2 /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* ── TIMELINE MILESTONES TAB ── */}
                {activeTab === 'timeline' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-500 text-xs font-mono uppercase bg-white/2">
                          <th className="py-4 px-6 w-12">Seq</th>
                          <th className="py-4 px-6">Year</th>
                          <th className="py-4 px-6">Milestone Title</th>
                          <th className="py-4 px-6">Description</th>
                          <th className="py-4 px-6">Icon</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length === 0 ? (
                          <tr><td colSpan="6" className="py-12 text-center text-slate-600 font-mono">No timeline milestones found.</td></tr>
                        ) : (
                          filteredItems.map((milestone, idx) => (
                            <tr key={milestone._id} className="border-b border-white/5 hover:bg-white/1 transition-all">
                              <td className="py-5 px-6">
                                <div className="flex flex-col items-center gap-1">
                                  <button disabled={idx === 0} onClick={() => handleMoveItem(idx, 'up')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowUp /></button>
                                  <button disabled={idx === filteredItems.length - 1} onClick={() => handleMoveItem(idx, 'down')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowDown /></button>
                                </div>
                              </td>
                              <td className="py-5 px-6 font-mono text-purple-400 font-semibold">{milestone.year}</td>
                              <td className="py-5 px-6 font-semibold text-slate-200">{milestone.title}</td>
                              <td className="py-5 px-6 text-slate-400 text-sm max-w-xs truncate">{milestone.detail}</td>
                              <td className="py-5 px-6 font-mono text-xs text-slate-500">{milestone.iconName || 'FiAward'}</td>
                              <td className="py-5 px-6 flex items-center gap-3">
                                <button onClick={() => handleEditOpen(milestone)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiEdit2 /></button>
                                <button onClick={() => handleDelete(milestone._id)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiTrash2 /></button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ── SOCIAL LINKS TAB ── */}
                {activeTab === 'socials' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-slate-500 text-xs font-mono uppercase bg-white/2">
                          <th className="py-4 px-6 w-12">Seq</th>
                          <th className="py-4 px-6">Platform</th>
                          <th className="py-4 px-6">URL Link</th>
                          <th className="py-4 px-6">Display Handle</th>
                          <th className="py-4 px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length === 0 ? (
                          <tr><td colSpan="5" className="py-12 text-center text-slate-600 font-mono">No matching social links found.</td></tr>
                        ) : (
                          filteredItems.map((social, idx) => (
                            <tr key={social._id} className="border-b border-white/5 hover:bg-white/1 transition-all">
                              <td className="py-5 px-6">
                                <div className="flex flex-col items-center gap-1">
                                  <button disabled={idx === 0} onClick={() => handleMoveItem(idx, 'up')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowUp /></button>
                                  <button disabled={idx === filteredItems.length - 1} onClick={() => handleMoveItem(idx, 'down')} className="text-slate-500 hover:text-white disabled:opacity-20 cursor-pointer"><FiArrowDown /></button>
                                </div>
                              </td>
                              <td className="py-5 px-6 font-semibold text-cyan-400">{social.platform}</td>
                              <td className="py-5 px-6 font-mono text-xs text-slate-500 max-w-xs truncate">{social.url}</td>
                              <td className="py-5 px-6 font-mono text-purple-400">{social.value}</td>
                              <td className="py-5 px-6 flex items-center gap-3">
                                <button onClick={() => handleEditOpen(social)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiEdit2 /></button>
                                <button onClick={() => handleDelete(social._id)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all cursor-pointer"><FiTrash2 /></button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ── RESUME TAB ── */}
                {activeTab === 'resume' && (
                  <div className="p-8 flex flex-col gap-6 items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center text-3xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                      <FiFileText />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold">Active CV Document</h3>
                      <p className="text-sm text-slate-400 mt-2 max-w-sm">
                        Upload a new PDF to update the download link for recruiters. Overwrites the existing file directly.
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
                      {resumeUrl && (
                        <a 
                          href={resumeUrl.startsWith('http') ? resumeUrl : `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000'}${resumeUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-white/20 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <FiExternalLink /> View Current PDF
                        </a>
                      )}
                      
                      <label className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer">
                        <FiUploadCloud /> {resumeLoading ? 'Uploading...' : 'Upload New Resume'}
                        <input 
                          type="file" 
                          accept=".pdf" 
                          onChange={handleResumeUpload} 
                          disabled={resumeLoading} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* ── HERO & ABOUT CONFIG PANEL ── */}
                {activeTab === 'hero' && (
                  <div className="p-6 flex flex-col gap-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Owner Full Name</label>
                        <input 
                          type="text" 
                          value={settings.ownerName}
                          onChange={e => setSettings({...settings, ownerName: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Headline / Job Title</label>
                        <input 
                          type="text" 
                          value={settings.headline}
                          onChange={e => setSettings({...settings, headline: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Profile Image Preview / URL</label>
                      <div className="flex gap-3 items-center">
                        <img 
                          src={getAssetUrl(settings.profileImage) || DEFAULT_AVATAR} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DEFAULT_AVATAR;
                          }}
                          className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 bg-slate-900" 
                          alt="profile" 
                        />
                        <input 
                          type="text" 
                          value={settings.profileImage} 
                          onChange={e => setSettings({...settings, profileImage: e.target.value})}
                          placeholder="/uploads/photo.jpg"
                          className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                        <label className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-mono shrink-0">
                          <FiUploadCloud /> {uploadLoading ? 'Uploading...' : 'Upload File'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, 'profile')} 
                            disabled={uploadLoading}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Hero Narrative Summary</label>
                      <textarea 
                        value={settings.description} 
                        onChange={e => setSettings({...settings, description: e.target.value})}
                        required
                        rows={3}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div className="border-t border-white/5 pt-4 my-2" />

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Biography Section Title</label>
                        <input 
                          type="text" 
                          value={settings.aboutTitle}
                          onChange={e => setSettings({...settings, aboutTitle: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Biography Section Index/Sub</label>
                        <input 
                          type="text" 
                          value={settings.aboutSubtitle}
                          onChange={e => setSettings({...settings, aboutSubtitle: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Detailed Biography Content</label>
                      <textarea 
                        value={settings.aboutBio} 
                        onChange={e => setSettings({...settings, aboutBio: e.target.value})}
                        required
                        rows={4}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div className="border-t border-white/5 pt-4 my-2" />
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Contact Callout Email</label>
                        <input 
                          type="email" 
                          value={settings.contactEmail}
                          onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Contact Title Banner</label>
                        <input 
                          type="text" 
                          value={settings.contactTitle}
                          onChange={e => setSettings({...settings, contactTitle: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Contact Description Callout</label>
                      <input 
                        type="text" 
                        value={settings.contactDesc}
                        onChange={e => setSettings({...settings, contactDesc: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>

                    {/* Biography Cards (About Section) */}
                    <div className="border-t border-white/5 pt-6 my-2" />
                    
                    <div className="bg-white/2 border border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                      <h4 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">
                        {editingAboutCardIndex > -1 ? 'Edit About Card' : 'Add About Card'}
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Card Title</label>
                          <input 
                            type="text"
                            placeholder="React Development"
                            value={aboutCardForm.title}
                            onChange={e => setAboutCardForm({...aboutCardForm, title: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Icon Component</label>
                          <select
                            value={aboutCardForm.iconName}
                            onChange={e => setAboutCardForm({...aboutCardForm, iconName: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          >
                            <option value="FiTerminal" className="bg-[#111827] text-white">Terminal (FiTerminal)</option>
                            <option value="FiBookOpen" className="bg-[#111827] text-white">Book Open (FiBookOpen)</option>
                            <option value="FiCpu" className="bg-[#111827] text-white">Processor (FiCpu)</option>
                            <option value="FiShield" className="bg-[#111827] text-white">Shield Security (FiShield)</option>
                            <option value="FiAward" className="bg-[#111827] text-white">Award Badge (FiAward)</option>
                            <option value="FiCode" className="bg-[#111827] text-white">Code Bracket (FiCode)</option>
                            <option value="FiActivity" className="bg-[#111827] text-white">Activity Pulsar (FiActivity)</option>
                            <option value="FiGlobe" className="bg-[#111827] text-white">Globe Network (FiGlobe)</option>
                            <option value="FiTarget" className="bg-[#111827] text-white">Target Bullseye (FiTarget)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Description</label>
                        <textarea 
                          placeholder="Write card summary details..."
                          value={aboutCardForm.desc}
                          onChange={e => setAboutCardForm({...aboutCardForm, desc: e.target.value})}
                          rows={2}
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-3 mt-1">
                        {editingAboutCardIndex > -1 && (
                          <button 
                            type="button" 
                            onClick={() => { setEditingAboutCardIndex(-1); setAboutCardForm({ title: '', desc: '', iconName: 'FiTerminal' }); }} 
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          type="button"
                          onClick={handleSaveAboutCard}
                          className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] text-white font-semibold rounded-xl text-xs cursor-pointer"
                        >
                          {editingAboutCardIndex > -1 ? 'Update Card' : 'Add Card'}
                        </button>
                      </div>
                    </div>

                    {/* Listing of current cards */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Configured About Cards</h4>
                      
                      {!settings.aboutCards || settings.aboutCards.length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-slate-500 font-mono text-xs">
                          No about biography cards configured.
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {settings.aboutCards.map((card, idx) => (
                            <div key={idx} className="bg-white/2 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-all">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-semibold text-slate-200 flex items-center gap-2">
                                    <span className="text-xs font-mono text-slate-500">[{card.iconName}]</span>
                                    {card.title}
                                  </h5>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed mb-4">{card.desc}</p>
                              </div>
                              <div className="flex justify-end gap-2 border-t border-white/5 pt-3">
                                <button type="button" onClick={() => handleEditAboutCard(idx)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"><FiEdit2 /></button>
                                <button type="button" onClick={() => handleRemoveAboutCard(idx)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg cursor-pointer"><FiTrash2 /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── EDUCATION CONFIG PANEL ── */}
                {activeTab === 'education' && (
                  <form onSubmit={handleSaveSettings} className="p-6 flex flex-col gap-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Degree Name</label>
                        <input 
                          type="text" 
                          value={settings.degree}
                          onChange={e => setSettings({...settings, degree: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Institution Name</label>
                        <input 
                          type="text" 
                          value={settings.institution}
                          onChange={e => setSettings({...settings, institution: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Location</label>
                        <input 
                          type="text" 
                          value={settings.location}
                          onChange={e => setSettings({...settings, location: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Duration / Graduating dates</label>
                        <input 
                          type="text" 
                          value={settings.duration}
                          onChange={e => setSettings({...settings, duration: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Academic Focus Overview</label>
                      <textarea 
                        value={settings.academicFocus} 
                        onChange={e => setSettings({...settings, academicFocus: e.target.value})}
                        required
                        rows={3}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Major Coursework / Core Subjects</label>
                      <div className="flex gap-3 mb-3">
                        <input 
                          type="text" 
                          value={newCoursework}
                          onChange={e => setNewCoursework(e.target.value)}
                          placeholder="e.g. Object Oriented Programming"
                          className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCoursework(); } }}
                        />
                        <button 
                          type="button" 
                          onClick={handleAddCoursework}
                          className="px-6 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer"
                        >
                          Add Subject
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 p-3 bg-white/2 border border-white/5 rounded-xl min-h-[60px] items-center">
                        {settings.coursework.length === 0 ? (
                          <span className="text-xs text-slate-500 font-mono">No coursework items added. Use the input field above to list core topics.</span>
                        ) : (
                          settings.coursework.map(course => (
                            <span key={course} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
                              <span>{course}</span>
                              <button type="button" onClick={() => handleRemoveCoursework(course)} className="text-slate-400 hover:text-red-400 cursor-pointer"><FiX /></button>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </form>
                )}

                {/* ── CYBERSECURITY OPS PANEL ── */}
                {activeTab === 'cybersecurity' && (
                  <div className="p-6 flex flex-col gap-6">
                    {/* Inline sub-form */}
                    <form onSubmit={handleSaveCyberItem} className="bg-white/2 border border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                      <h4 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">
                        {editingCyberIndex > -1 ? 'Edit Security Metric' : 'Add Security Metric'}
                      </h4>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Metric Title</label>
                          <input 
                            type="text"
                            placeholder="Network Penetration"
                            value={cyberForm.title}
                            onChange={e => setCyberForm({...cyberForm, title: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Brief Description</label>
                          <input 
                            type="text"
                            placeholder="Port scanning, Wireshark packet capture analysis, firewall testing"
                            value={cyberForm.desc}
                            onChange={e => setCyberForm({...cyberForm, desc: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 items-center">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Knowledge Level ({cyberForm.progress}%)</label>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            value={cyberForm.progress}
                            onChange={e => setCyberForm({...cyberForm, progress: parseInt(e.target.value)})}
                            className="w-full accent-purple-500 cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Theme Accent Color</label>
                          <div className="flex gap-2">
                            <input 
                              type="color"
                              value={cyberForm.color}
                              onChange={e => setCyberForm({...cyberForm, color: e.target.value})}
                              className="h-10 w-10 bg-transparent border-0 cursor-pointer rounded-lg"
                            />
                            <input 
                              type="text"
                              value={cyberForm.color}
                              onChange={e => setCyberForm({...cyberForm, color: e.target.value})}
                              placeholder="#ef4444"
                              className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 mt-2">
                        {editingCyberIndex > -1 && (
                          <button 
                            type="button" 
                            onClick={() => { setEditingCyberIndex(-1); setCyberForm({ title: '', desc: '', progress: 80, color: '#ef4444' }); }} 
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          type="submit" 
                          className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] text-white font-semibold rounded-xl text-xs cursor-pointer"
                        >
                          {editingCyberIndex > -1 ? 'Update Item' : 'Add Item'}
                        </button>
                      </div>
                    </form>

                    {/* Listing of current items */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Configured Cybersecurity Items</h4>
                      
                      {settings.cybersecurityItems.length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-slate-500 font-mono text-xs">
                          No cybersecurity metrics listed yet.
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {settings.cybersecurityItems.map((item, idx) => (
                            <div key={idx} className="bg-white/2 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-all">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-semibold text-slate-200 flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    {item.title}
                                  </h5>
                                  <span className="text-xs font-mono" style={{ color: item.color }}>{item.progress}%</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                              </div>
                              <div className="flex justify-end gap-2 border-t border-white/5 pt-3">
                                <button type="button" onClick={() => handleEditCyberItem(idx)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"><FiEdit2 /></button>
                                <button type="button" onClick={() => handleRemoveCyberItem(idx)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg cursor-pointer"><FiTrash2 /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── ACHIEVEMENTS CONFIG PANEL ── */}
                {activeTab === 'achievements' && (
                  <div className="p-6 flex flex-col gap-6">
                    {/* Inline sub-form */}
                    <form onSubmit={handleSaveAchievementItem} className="bg-white/2 border border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                      <h4 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">
                        {editingAchievementIndex > -1 ? 'Edit Achievement Entry' : 'Add Achievement Entry'}
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Achievement Title</label>
                          <input 
                            type="text"
                            placeholder="Secured 1st Place in Hackathon"
                            value={achievementForm.title}
                            onChange={e => setAchievementForm({...achievementForm, title: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Achievement Details / Links</label>
                          <input 
                            type="text"
                            placeholder="Competed among 40 teams, building a Python threat intelligence app"
                            value={achievementForm.desc}
                            onChange={e => setAchievementForm({...achievementForm, desc: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 mt-1">
                        {editingAchievementIndex > -1 && (
                          <button 
                            type="button" 
                            onClick={() => { setEditingAchievementIndex(-1); setAchievementForm({ title: '', desc: '' }); }} 
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          type="submit" 
                          className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] text-white font-semibold rounded-xl text-xs cursor-pointer"
                        >
                          {editingAchievementIndex > -1 ? 'Update Entry' : 'Add Entry'}
                        </button>
                      </div>
                    </form>

                    {/* Listing of current items */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Configured Achievements</h4>
                      
                      {settings.achievementsList.length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-slate-500 font-mono text-xs">
                          No achievements listed yet.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {settings.achievementsList.map((item, idx) => (
                            <div key={idx} className="bg-white/2 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all">
                              <div>
                                <h5 className="font-semibold text-slate-200">{item.title}</h5>
                                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                              </div>
                              <div className="flex gap-2">
                                <button type="button" onClick={() => handleEditAchievementItem(idx)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"><FiEdit2 /></button>
                                <button type="button" onClick={() => handleRemoveAchievementItem(idx)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg cursor-pointer"><FiTrash2 /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── HERO STATS CONFIG PANEL ── */}
                {activeTab === 'herostats' && (
                  <div className="p-6 flex flex-col gap-6">
                    {/* Inline sub-form */}
                    <form onSubmit={handleSaveHeroStatItem} className="bg-white/2 border border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                      <h4 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono">
                        {editingHeroStatIndex > -1 ? 'Edit Hero Statistic' : 'Add Hero Statistic'}
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Value (e.g., "8+", "2026")</label>
                          <input 
                            type="text"
                            placeholder="8+"
                            value={heroStatForm.value}
                            onChange={e => setHeroStatForm({...heroStatForm, value: e.target.value})}
                            required
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Title (e.g., "Projects")</label>
                          <input 
                            type="text"
                            placeholder="Projects"
                            value={heroStatForm.title}
                            onChange={e => setHeroStatForm({...heroStatForm, title: e.target.value})}
                            required
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Subtitle (e.g., "React • MERN • Python")</label>
                          <input 
                            type="text"
                            placeholder="React • MERN • Python"
                            value={heroStatForm.subtitle}
                            onChange={e => setHeroStatForm({...heroStatForm, subtitle: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Target Section</label>
                          <select 
                            value={heroStatForm.targetSection}
                            onChange={e => setHeroStatForm({...heroStatForm, targetSection: e.target.value})}
                            className="w-full bg-[#111827] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 appearance-none cursor-pointer"
                          >
                            <option value="Projects">Projects</option>
                            <option value="Certifications">Certifications</option>
                            <option value="Internships">Internships</option>
                            <option value="Education">Education</option>
                            <option value="Skills">Skills</option>
                            <option value="Contact">Contact</option>
                            <option value="Custom">Custom</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 mt-2">
                        {editingHeroStatIndex > -1 && (
                          <button 
                            type="button" 
                            onClick={() => { setEditingHeroStatIndex(-1); setHeroStatForm({ value: '', title: '', subtitle: '', targetSection: 'Projects', order: 0 }); }} 
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          type="submit" 
                          className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] text-white font-semibold rounded-xl text-xs cursor-pointer"
                        >
                          {editingHeroStatIndex > -1 ? 'Update Stat' : 'Add Stat'}
                        </button>
                      </div>
                    </form>

                    {/* Listing of current stats items */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest px-1">Configured Hero Statistics</h4>
                      
                      {(!settings.heroStats || settings.heroStats.length === 0) ? (
                        <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-slate-500 font-mono text-xs">
                          No statistics configured yet. Default hero stats will be shown on the homepage.
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {settings.heroStats.map((item, idx) => (
                            <div key={idx} className="bg-white/2 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-all animate-fadeIn">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-extrabold text-cyan-400">{item.value}</span>
                                    <h5 className="font-semibold text-slate-200">{item.title}</h5>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 bg-white/5 border border-white/8 rounded-md">{item.targetSection}</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.subtitle || 'No subtitle provided'}</p>
                              </div>
                              <div className="flex justify-between items-center border-t border-white/5 pt-3">
                                <div className="flex gap-1">
                                  <button 
                                    type="button" 
                                    disabled={idx === 0}
                                    onClick={() => handleMoveHeroStatItem(idx, -1)} 
                                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 rounded cursor-pointer"
                                  >
                                    <FiArrowUp />
                                  </button>
                                  <button 
                                    type="button" 
                                    disabled={idx === settings.heroStats.length - 1}
                                    onClick={() => handleMoveHeroStatItem(idx, 1)} 
                                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 rounded cursor-pointer"
                                  >
                                    <FiArrowDown />
                                  </button>
                                </div>
                                <div className="flex gap-2">
                                  <button type="button" onClick={() => handleEditHeroStatItem(idx)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"><FiEdit2 /></button>
                                  <button type="button" onClick={() => handleRemoveHeroStatItem(idx)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg cursor-pointer"><FiTrash2 /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── WEBSITE & SEO & THEMES TAB ── */}
                {activeTab === 'settings' && (
                  <form onSubmit={handleSaveSettings} className="p-6 flex flex-col gap-5">
                    <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">SEO Headers Metadata</h3>
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Browser Search Page Title</label>
                        <input 
                          type="text" 
                          value={settings.seoTitle}
                          onChange={e => setSettings({...settings, seoTitle: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Search Keywords (comma-separated)</label>
                        <input 
                          type="text" 
                          value={settings.seoKeywords}
                          onChange={e => setSettings({...settings, seoKeywords: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Page Meta Description (SEO)</label>
                      <textarea 
                        value={settings.seoDescription} 
                        onChange={e => setSettings({...settings, seoDescription: e.target.value})}
                        required
                        rows={2}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Social Preview Title (OpenGraph)</label>
                        <input 
                          type="text" 
                          value={settings.ogTitle}
                          onChange={e => setSettings({...settings, ogTitle: e.target.value})}
                          required
                          className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Social Preview Image URL</label>
                        <div className="flex gap-3">
                          <input 
                            type="text" 
                            value={settings.ogImageUrl}
                            onChange={e => setSettings({...settings, ogImageUrl: e.target.value})}
                            required
                            className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                          <label className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-mono shrink-0">
                            <FiUploadCloud /> {uploadLoading ? 'Uploading...' : 'Upload'}
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleImageUpload(e, 'og')} 
                              disabled={uploadLoading}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Social Preview Description (OpenGraph)</label>
                      <input 
                        type="text" 
                        value={settings.ogDescription}
                        onChange={e => setSettings({...settings, ogDescription: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Site Favicon Image (.ico/.png/.svg)</label>
                      <div className="flex gap-3 items-center">
                        <input 
                          type="text" 
                          value={settings.faviconUrl}
                          onChange={e => setSettings({...settings, faviconUrl: e.target.value})}
                          required
                          className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                        <label className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-mono shrink-0">
                          <FiUploadCloud /> {uploadLoading ? 'Uploading...' : 'Upload Favicon'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFaviconUpload} 
                            disabled={uploadLoading}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 my-2" />
                    <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">Visual Identity Colors</h3>

                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Primary Color (Accent Glow)</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={settings.primaryColor} 
                            onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                            className="h-12 w-12 bg-transparent border-0 cursor-pointer rounded-xl"
                          />
                          <input 
                            type="text" 
                            value={settings.primaryColor} 
                            onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                            className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Secondary Color (Cyan Glow)</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={settings.secondaryColor} 
                            onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                            className="h-12 w-12 bg-transparent border-0 cursor-pointer rounded-xl"
                          />
                          <input 
                            type="text" 
                            value={settings.secondaryColor} 
                            onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                            className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Background Color</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={settings.bgColor} 
                            onChange={e => setSettings({...settings, bgColor: e.target.value})}
                            className="h-12 w-12 bg-transparent border-0 cursor-pointer rounded-xl"
                          />
                          <input 
                            type="text" 
                            value={settings.bgColor} 
                            onChange={e => setSettings({...settings, bgColor: e.target.value})}
                            className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* CRUD MODAL FOR PROJECTS, SKILLS, CERTIFICATES, SOCIALS, INTERNSHIPS, TIMELINE */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#04010d] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={resetForm} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white rounded-lg transition-all cursor-pointer"><FiX /></button>
              
              <h3 className="text-xl font-bold mb-6">
                {editingItem ? 'Edit' : 'Add New'} <span className="capitalize">{activeTab === 'internships' ? 'Work Experience' : activeTab.slice(0, -1)}</span>
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* ── PROJECTS FORM FIELDS ── */}
                {activeTab === 'projects' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Title</label>
                      <input 
                        type="text" 
                        value={projectForm.title} 
                        onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Description</label>
                      <textarea 
                        value={projectForm.description} 
                        onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                        required
                        rows={3}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Status</label>
                      <select
                        value={projectForm.status}
                        onChange={e => setProjectForm({...projectForm, status: e.target.value})}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 appearance-none cursor-pointer"
                      >
                        <option value="Completed" className="bg-[#111827] text-white">Completed</option>
                        <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
                        <option value="Learning Project" className="bg-[#111827] text-white">Learning Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Technologies (comma-separated)</label>
                      <input 
                        type="text" 
                        value={projectForm.technologies} 
                        onChange={e => setProjectForm({...projectForm, technologies: e.target.value})}
                        placeholder="React, Tailwind, Node.js"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">GitHub Repository URL</label>
                      <input 
                        type="url" 
                        value={projectForm.githubUrl} 
                        onChange={e => setProjectForm({...projectForm, githubUrl: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Demo / Live Site URL</label>
                      <input 
                        type="url" 
                        value={projectForm.demoUrl} 
                        onChange={e => setProjectForm({...projectForm, demoUrl: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Image Preview / URL</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={projectForm.image} 
                          onChange={e => setProjectForm({...projectForm, image: e.target.value})}
                          placeholder="/portfolio.png or upload file"
                          className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                        <label className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-mono shrink-0">
                          <FiUploadCloud /> {uploadLoading ? 'Uploading...' : 'Upload'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, 'project')} 
                            disabled={uploadLoading}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* ── SKILLS FORM FIELDS ── */}
                {activeTab === 'skills' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Skill Name</label>
                      <input 
                        type="text" 
                        value={skillForm.name} 
                        onChange={e => setSkillForm({...skillForm, name: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Category</label>
                      <select 
                        value={skillForm.category}
                        onChange={e => setSkillForm({...skillForm, category: e.target.value})}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      >
                        <option value="frontend" className="bg-[#111827] text-white">Frontend</option>
                        <option value="backend" className="bg-[#111827] text-white">Backend</option>
                        <option value="programming" className="bg-[#111827] text-white">Programming</option>
                        <option value="database" className="bg-[#111827] text-white">Database</option>
                        <option value="ai-ml" className="bg-[#111827] text-white">AI & ML</option>
                        <option value="cybersecurity" className="bg-[#111827] text-white">Cybersecurity</option>
                        <option value="tools" className="bg-[#111827] text-white">Tools</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Proficiency Level ({skillForm.level}%)</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100"
                        value={skillForm.level} 
                        onChange={e => setSkillForm({...skillForm, level: parseInt(e.target.value)})}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Theme Hex Color</label>
                      <div className="flex gap-3">
                        <input 
                          type="color" 
                          value={skillForm.color} 
                          onChange={e => setSkillForm({...skillForm, color: e.target.value})}
                          className="h-12 w-12 bg-transparent border-0 cursor-pointer rounded-xl"
                        />
                        <input 
                          type="text" 
                          value={skillForm.color} 
                          onChange={e => setSkillForm({...skillForm, color: e.target.value})}
                          placeholder="#ffffff"
                          required
                          className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* ── CERTIFICATE FORM FIELDS ── */}
                {activeTab === 'certificates' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Title</label>
                      <input 
                        type="text" 
                        value={certForm.title} 
                        onChange={e => setCertForm({...certForm, title: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Issuer</label>
                      <input 
                        type="text" 
                        value={certForm.issuer} 
                        onChange={e => setCertForm({...certForm, issuer: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Issue Date</label>
                      <input 
                        type="text" 
                        value={certForm.issueDate} 
                        onChange={e => setCertForm({...certForm, issueDate: e.target.value})}
                        placeholder="December 2025"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Image Certificate / URL</label>
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={certForm.image} 
                          onChange={e => setCertForm({...certForm, image: e.target.value})}
                          placeholder="Link or path or upload file"
                          className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                        <label className="px-4 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-mono shrink-0">
                          <FiUploadCloud /> {uploadLoading ? 'Uploading...' : 'Upload'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, 'certificate')} 
                            disabled={uploadLoading}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* ── WORK EXPERIENCE (INTERNSHIP) FORM FIELDS ── */}
                {activeTab === 'internships' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Company Name</label>
                      <input 
                        type="text" 
                        value={internshipForm.company} 
                        onChange={e => setInternshipForm({...internshipForm, company: e.target.value})}
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Intern / Employee Role</label>
                      <input 
                        type="text" 
                        value={internshipForm.role} 
                        onChange={e => setInternshipForm({...internshipForm, role: e.target.value})}
                        placeholder="Frontend Web Developer Intern"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Duration (Dates)</label>
                      <input 
                        type="text" 
                        value={internshipForm.duration} 
                        onChange={e => setInternshipForm({...internshipForm, duration: e.target.value})}
                        placeholder="Oct 2024 - Dec 2024 (3 Months)"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Key Highlights (comma-separated)</label>
                      <textarea 
                        value={internshipForm.highlights} 
                        onChange={e => setInternshipForm({...internshipForm, highlights: e.target.value})}
                        placeholder="Designed responsive interfaces, Integrated REST endpoints, Optimized CSS bundle sizes"
                        required
                        rows={3}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Certificate ID / Link (Optional)</label>
                      <input 
                        type="text" 
                        value={internshipForm.certId} 
                        onChange={e => setInternshipForm({...internshipForm, certId: e.target.value})}
                        placeholder="Verification code or URL link"
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Accent Theme Color</label>
                      <div className="flex gap-3">
                        <input 
                          type="color" 
                          value={internshipForm.color} 
                          onChange={e => setInternshipForm({...internshipForm, color: e.target.value})}
                          className="h-12 w-12 bg-transparent border-0 cursor-pointer rounded-xl"
                        />
                        <input 
                          type="text" 
                          value={internshipForm.color} 
                          onChange={e => setInternshipForm({...internshipForm, color: e.target.value})}
                          className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* ── TIMELINE MILESTONES FORM FIELDS ── */}
                {activeTab === 'timeline' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Milestone Year</label>
                      <input 
                        type="text" 
                        value={timelineForm.year} 
                        onChange={e => setTimelineForm({...timelineForm, year: e.target.value})}
                        placeholder="2024"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Milestone Title</label>
                      <input 
                        type="text" 
                        value={timelineForm.title} 
                        onChange={e => setTimelineForm({...timelineForm, title: e.target.value})}
                        placeholder="Began BCA degree"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Milestone Details</label>
                      <textarea 
                        value={timelineForm.detail} 
                        onChange={e => setTimelineForm({...timelineForm, detail: e.target.value})}
                        placeholder="Enrolled in Basavprabhu Kore College, focusing on foundational computing systems."
                        required
                        rows={3}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Icon Graphic (Name)</label>
                      <select
                        value={timelineForm.iconName}
                        onChange={e => setTimelineForm({...timelineForm, iconName: e.target.value})}
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 appearance-none cursor-pointer"
                      >
                        <option value="FiAward" className="bg-[#111827] text-white">Award Medal (FiAward)</option>
                        <option value="FiBriefcase" className="bg-[#111827] text-white">Briefcase (FiBriefcase)</option>
                        <option value="FiCode" className="bg-[#111827] text-white">Code Symbol (FiCode)</option>
                        <option value="FiBookOpen" className="bg-[#111827] text-white">Book / Education (FiBookOpen)</option>
                        <option value="FiShield" className="bg-[#111827] text-white">Shield (FiShield)</option>
                      </select>
                    </div>
                  </>
                )}

                {/* ── SOCIAL LINK FORM FIELDS ── */}
                {activeTab === 'socials' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Platform</label>
                      <input 
                        type="text" 
                        value={socialForm.platform} 
                        onChange={e => setSocialForm({...socialForm, platform: e.target.value})}
                        placeholder="GitHub"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">URL Link</label>
                      <input 
                        type="url" 
                        value={socialForm.url} 
                        onChange={e => setSocialForm({...socialForm, url: e.target.value})}
                        placeholder="https://github.com/fateali-landage"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Display Value</label>
                      <input 
                        type="text" 
                        value={socialForm.value} 
                        onChange={e => setSocialForm({...socialForm, value: e.target.value})}
                        placeholder="github.com/fateali-landage"
                        required
                        className="w-full bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={actionLoading || uploadLoading}
                  className="w-full mt-4 py-3.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Save Entry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
