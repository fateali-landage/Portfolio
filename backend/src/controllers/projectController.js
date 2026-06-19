import Project from '../models/projectModel.js'
import { deleteFromCloudinary } from '../services/uploadService.js'

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res, next) => {
  try {
    const { title, description, image, githubUrl, demoUrl, technologies } = req.body

    const project = new Project({
      title,
      description,
      image,
      githubUrl,
      demoUrl,
      technologies
    })

    const createdProject = await project.save()
    res.status(201).json(createdProject)
  } catch (error) {
    next(error)
  }
}

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res, next) => {
  try {
    const { title, description, image, githubUrl, demoUrl, technologies } = req.body

    const project = await Project.findById(req.params.id)

    if (project) {
      project.title = title || project.title
      project.description = description || project.description
      
      // Delete old image from Cloudinary if image has changed
      if (image !== undefined && image !== project.image) {
        if (project.image) {
          await deleteFromCloudinary(project.image)
        }
        project.image = image
      }

      project.githubUrl = githubUrl || project.githubUrl
      project.demoUrl = demoUrl || project.demoUrl
      project.technologies = technologies || project.technologies

      const updatedProject = await project.save()
      res.json(updatedProject)
    } else {
      res.status(404).json({ message: 'Project not found' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
// export const deleteProject = async (req, res, next) => {
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)

    if (project) {
      if (project.image) {
        await deleteFromCloudinary(project.image)
      }
      await Project.deleteOne({ _id: req.params.id })
      res.json({ message: 'Project removed successfully' })
    } else {
      res.status(404).json({ message: 'Project not found' })
    }
  } catch (error) {
    next(error)
  }
}
