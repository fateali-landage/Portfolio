import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import * as Icons from 'react-icons/fi'

export default function Cybersecurity({ settings }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const defaultDomains = [
    { title: 'Linux Fundamentals', desc: 'Navigating terminal systems, user permissions administration, process logging, and bash scripting.', progress: 85, color: '#ef4444' },
    { title: 'Network Security', desc: 'OSI and TCP/IP layering, internet protocols (HTTP, DNS, TCP, UDP), and port checking utility sweeps.', progress: 80, color: '#3b82f6' },
    { title: 'Python Security Automation', desc: 'Developing scripts for port scanning, web directories discovery, and cryptographic logs sorting.', progress: 80, color: '#a855f7' },
    { title: 'TryHackMe Learning', desc: 'Completing fundamental rooms, network enumerations, security policies analysis, and mock scanner runs.', progress: 75, color: '#f59e0b' },
    { title: 'Security Concepts', desc: 'Studying risk control frameworks, security auditing systems, logging structures, and threat modeling.', progress: 75, color: '#06b6d4' }
  ]

  const domains = settings?.cybersecurityItems && settings.cybersecurityItems.length > 0
    ? settings.cybersecurityItems
    : defaultDomains

  // Helper to get matching icons or fallback
  const getIcon = (title, index) => {
    const key = title.toLowerCase()
    let iconComp = Icons.FiShield
    if (key.includes('linux') || key.includes('terminal')) iconComp = Icons.FiTerminal
    else if (key.includes('network') || key.includes('port')) iconComp = Icons.FiGlobe
    else if (key.includes('python') || key.includes('script') || key.includes('automation')) iconComp = Icons.FiActivity
    else if (key.includes('tryhackme') || key.includes('labs') || key.includes('learning')) iconComp = Icons.FiTarget
    else if (key.includes('concept') || key.includes('fundamental') || key.includes('audit')) iconComp = Icons.FiCpu
    
    const Component = iconComp
    return <Component />
  }

  return (
    <section id="Cybersecurity" className="py-32 bg-[#04010a] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-red-500 mb-3 block">// 04 / Security Operations</span>
          <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Cybersecurity Ops</h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-red-500 to-amber-500 mx-auto mt-4" />
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Side: Domain listings */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold font-mono tracking-wider text-slate-200 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Core Security Targets
            </h4>
            
            <div className="grid sm:grid-cols-2 gap-4 items-stretch">
              {domains.map((dom, index) => {
                return (
                  <motion.div
                    key={dom.title + index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 glass border border-white/5 bg-black/40 rounded-xl space-y-3 flex flex-col justify-between h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border shrink-0"
                          style={{ color: dom.color, borderColor: `${dom.color}25`, background: `${dom.color}08` }}
                        >
                          {getIcon(dom.title, index)}
                        </div>
                        <h5 className="font-bold text-white text-sm truncate">{dom.title}</h5>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed h-12 overflow-hidden">{dom.desc}</p>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="space-y-1.5 pt-1 mt-auto">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>Proficiency</span>
                        <span style={{ color: dom.color }}>{dom.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${dom.progress}%` } : {}}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: dom.color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Side: Cyber console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="glass border border-red-500/20 bg-black/80 rounded-2xl overflow-hidden shadow-2xl relative self-stretch flex flex-col"
          >
            {/* Terminal header */}
            <div className="bg-red-950/15 border-b border-white/5 px-4 py-3 flex items-center justify-between font-mono text-xs text-slate-400 shrink-0">
              <span className="flex items-center gap-2 text-red-500 font-semibold uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Security Console
              </span>
              <span>bash - tryhackme@labs</span>
            </div>

            {/* Terminal contents */}
            <div className="p-6 font-mono text-xs md:text-sm space-y-4 text-green-400 overflow-x-auto flex-1">
              <div className="text-slate-500"># Initializing network scanning...</div>
              <div>$ nmap -sV -F 192.168.1.1</div>
              <div className="text-slate-400 pl-4 whitespace-pre leading-relaxed">
                Starting Nmap 7.92 ( https://nmap.org )<br />
                Nmap scan report for target (192.168.1.1)<br />
                Host is up (0.0031s latency).<br />
                PORT&nbsp;&nbsp;&nbsp;STATE&nbsp;SERVICE&nbsp;&nbsp;VERSION<br />
                22/tcp&nbsp;&nbsp;open&nbsp;&nbsp;ssh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OpenSSH 8.2p1<br />
                80/tcp&nbsp;&nbsp;open&nbsp;&nbsp;http&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apache httpd 2.4.41<br />
                443/tcp&nbsp;open&nbsp;&nbsp;ssl/http&nbsp;Apache httpd 2.4.41
              </div>
              <div className="text-slate-500"># Evaluating active defense status...</div>
              <div className="text-yellow-500 animate-pulse font-bold">
                [ALERT] Web Sec Lab checks: SUCCESS (No vulnerabilities detected)
              </div>
              <div className="text-slate-500 pt-4 flex items-center gap-1.5 animate-pulse">
                <span>cursor_</span><span className="w-2.5 h-4 bg-green-500 inline-block" />
              </div>
            </div>

            <div className="absolute inset-0 border border-red-500/25 pointer-events-none rounded-2xl shadow-[inset_0_0_30px_rgba(239,68,68,0.05)]" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
