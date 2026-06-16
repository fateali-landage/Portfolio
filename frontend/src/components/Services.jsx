import { motion } from 'framer-motion'
import { FiLayout, FiCode, FiSmartphone, FiFigma } from 'react-icons/fi'

const services = [
  {
    title: 'Frontend Development',
    description: 'Building scalable, pixel-perfect, and highly performant web applications using React and modern toolchains.',
    icon: FiCode,
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive and cinematic user interfaces with a focus on motion, typography, and visual hierarchy.',
    icon: FiFigma,
  },
  {
    title: 'Responsive Layouts',
    description: 'Ensuring flawless experiences across all devices, from ultra-wide monitors to mobile screens.',
    icon: FiSmartphone,
  },
  {
    title: 'Web Animation',
    description: 'Implementing complex, buttery-smooth animations and interactions that bring interfaces to life.',
    icon: FiLayout,
  },
]

export default function Services() {
  return (
    <section id="Services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-sm tracking-[0.3em] text-purple-400 mb-4 font-semibold uppercase">Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-bold">What I Bring to the Table</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-2xl text-white" />
              </div>
              <h4 className="text-2xl font-semibold mb-4">{service.title}</h4>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
