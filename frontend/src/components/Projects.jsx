import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import projectService from '../services/projectService'
import { getAssetUrl } from '../utils/url'

const getProjectDetails = (project) => {
  const title = project.title.toLowerCase();
  if (title.includes('portfolio')) {
    return {
      problem: "Consolidating diverse projects, certification paths, and cybersecurity accomplishments in a unified, professional, and easily manageable web presence.",
      solution: project.description
    };
  }
  if (title.includes('task manager') || title.includes('kanban')) {
    return {
      problem: "Simplifying task tracking and workload management with a visual, intuitive drag-and-drop workspace.",
      solution: project.description
    };
  }
  if (title.includes('expense') || title.includes('finance')) {
    return {
      problem: "Monitoring personal finances, visualizing spending trends, and managing monthly budgets.",
      solution: project.description
    };
  }
  if (title.includes('weather')) {
    return {
      problem: "Retrieving and presenting current meteorological indicators and forecasts in a responsive, search-friendly UI.",
      solution: project.description
    };
  }
  if (title.includes('automation') || title.includes('script')) {
    return {
      problem: "Reducing time spent on repetitive system administration tasks like log parsing, backup scheduling, and web scraping.",
      solution: project.description
    };
  }
  if (title.includes('security') || title.includes('labs') || title.includes('cyber')) {
    return {
      problem: "Analyzing network traffic patterns, auditing open ports, and modeling common vulnerability detection workflows.",
      solution: project.description
    };
  }
  // Fallback for user-added projects
  const parts = project.description.split('.');
  if (parts.length > 1) {
    return {
      problem: parts[0].trim() + '.',
      solution: parts.slice(1).join('.').trim() || project.description
    };
  }
  return {
    problem: "Deploying modern tech stack to solve real-world development challenges.",
    solution: project.description
  };
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll()
        setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="Projects" className="py-32 bg-[#04010a] relative">
      <div className="container mx-auto px-6">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3 block">// 02 / Portfolio</span>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Featured Projects</h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="text-center py-20 font-mono text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400 mx-auto mb-4"></div>
            Syncing project database...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {projects.map((project, index) => {
              const { problem, solution } = getProjectDetails(project);
              return (
                <motion.div
                  key={project._id || project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative flex flex-col h-full"
                >
                  {/* Glow behind card on hover */}
                  <div className="absolute -inset-px bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none" />

                  <div className="relative h-full flex flex-col glass rounded-2xl overflow-hidden border border-white/5 bg-[#020005]/90 hover:border-cyan-500/30 transition-all duration-300 flex-1">
                    
                    {/* Image/Mock Visual */}
                    <div className="relative h-48 overflow-hidden bg-slate-900 shrink-0">
                      {project.image && !imageErrors[project._id] ? (
                        <img 
                          src={getAssetUrl(project.image)} 
                          alt={project.title} 
                          className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          onError={() => {
                            setImageErrors(prev => ({ ...prev, [project._id]: true }))
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center p-4">
                          <span className="text-slate-500 font-mono text-xs text-center tracking-widest uppercase">
                            {project.title} Preview
                          </span>
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded border font-semibold ${
                          project.status === 'Completed' ? 'bg-green-950/70 text-green-400 border-green-500/30' :
                          project.status === 'In Progress' ? 'bg-amber-950/70 text-amber-400 border-amber-500/30' :
                          'bg-cyan-950/70 text-cyan-400 border-cyan-500/30'
                        }`}>
                          {project.status || 'Completed'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Body Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h4>
                        
                        <div className="space-y-2">
                          <div className="space-y-0.5">
                            <span className="text-[9px] uppercase font-mono tracking-widest text-purple-400 font-bold block">Problem Solved</span>
                            <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                              {problem}
                            </p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] uppercase font-mono tracking-widest text-cyan-400 font-bold block">Solution & Detail</span>
                            <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                              {solution}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 mt-auto">
                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map(tech => (
                            <span key={tech} className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 bg-cyan-500/10 rounded border border-cyan-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 border-t border-white/5 pt-4">
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                            >
                              <FiGithub className="text-sm" /> Code
                            </a>
                          )}
                          {project.demoUrl && (
                            <a 
                              href={project.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                            >
                              <FiExternalLink className="text-sm" /> Live
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
