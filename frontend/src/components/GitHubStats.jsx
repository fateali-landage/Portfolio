import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiFolder, FiStar, FiGitBranch, FiUsers, FiExternalLink } from 'react-icons/fi'

export default function GitHubStats({ githubUrl }) {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  const getUsername = () => {
    if (!githubUrl) return 'fateali-landage'
    try {
      // Add protocol if missing
      const urlToParse = githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`
      const parsed = new URL(urlToParse)
      if (parsed.hostname.includes('github.com')) {
        const parts = parsed.pathname.split('/').filter(Boolean)
        if (parts.length > 0) return parts[0]
      }
    } catch (e) {
      // Ignore invalid URL
    }
    return 'fateali-landage'
  }

  const username = getUsername()

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        ])
        
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setProfile(profileData)
        }
        
        if (reposRes.ok) {
          const reposData = await reposRes.json()
          if (Array.isArray(reposData)) {
            setRepos(reposData)
          }
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGitHubData()
  }, [])

  return (
    <section id="GitHub" className="py-32 bg-[#04010a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.4em] text-cyan-400 font-mono uppercase mb-4">08 / Open Source</p>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">GitHub Showcase</h3>
          <div className="h-0.5 w-16 bg-cyan-400 mx-auto mt-6" />
        </motion.div>

        {loading ? (
          <div className="text-center py-20 font-mono text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400 mx-auto mb-4"></div>
            Connecting to GitHub API...
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Profile Info Summary */}
            {profile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between bg-white/[0.01]"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.name || profile.login} 
                    className="w-20 h-20 rounded-2xl border border-white/10"
                  />
                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-bold text-white">{profile.name || profile.login}</h4>
                    <p className="text-xs font-mono text-cyan-400">@{profile.login}</p>
                    <p className="text-sm text-slate-400 max-w-md">{profile.bio || 'BCA student and developer.'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-white/5 w-full md:w-auto min-w-[280px]">
                  <div className="flex flex-col items-center px-4">
                    <span className="text-xl md:text-2xl font-extrabold text-cyan-400">{profile.public_repos}</span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase mt-1">Repositories</span>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className="text-xl md:text-2xl font-extrabold text-purple-400">{profile.followers}</span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase mt-1">Followers</span>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className="text-xl md:text-2xl font-extrabold text-cyan-400">{profile.following}</span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase mt-1">Following</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Repos list */}
            <div>
              <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-6 flex items-center gap-2">
                <FiFolder className="text-cyan-400" /> Recent Public Repositories
              </h4>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="glass border border-white/5 hover:border-cyan-500/20 p-5 rounded-2xl flex flex-col justify-between transition-all bg-[#020005]/40"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-purple-400 uppercase">
                          {repo.language || 'Code'}
                        </span>
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <FiExternalLink />
                        </a>
                      </div>
                      
                      <h5 className="font-bold text-white text-base truncate">
                        {repo.name}
                      </h5>
                      
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 h-8">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className="flex gap-4 items-center text-xs text-slate-500 font-mono pt-4 mt-4 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <FiStar className="text-amber-400" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiGitBranch className="text-cyan-400" /> {repo.forks_count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Button profiles */}
            <div className="text-center pt-6">
              <a 
                href={`https://github.com/${username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
              >
                <FiGithub /> View Full GitHub Profile
              </a>
            </div>

          </div>
        )}
      </div>
    </section>
  )
}
