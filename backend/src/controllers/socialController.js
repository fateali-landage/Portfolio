import Social from '../models/socialModel.js'

// @desc    Get all social links
// @route   GET /api/social-links
// @access  Public
export const getSocials = async (req, res, next) => {
  try {
    const socials = await Social.find({})
    res.json(socials)
  } catch (error) {
    next(error)
  }
}

// @desc    Create a social link
// @route   POST /api/social-links
// @access  Private/Admin
export const createSocial = async (req, res, next) => {
  try {
    const { platform, url, value } = req.body

    const social = new Social({
      platform,
      url,
      value
    })

    const createdSocial = await social.save()
    res.status(201).json(createdSocial)
  } catch (error) {
    next(error)
  }
}

// @desc    Update a social link
// @route   PUT /api/social-links/:id
// @access  Private/Admin
export const updateSocial = async (req, res, next) => {
  try {
    const { platform, url, value } = req.body

    const social = await Social.findById(req.params.id)

    if (social) {
      social.platform = platform || social.platform
      social.url = url || social.url
      social.value = value || social.value

      const updatedSocial = await social.save()
      res.json(updatedSocial)
    } else {
      res.status(404).json({ message: 'Social link not found' })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a social link
// @route   DELETE /api/social-links/:id
// @access  Private/Admin
export const deleteSocial = async (req, res, next) => {
  try {
    const social = await Social.findById(req.params.id)

    if (social) {
      await Social.deleteOne({ _id: req.params.id })
      res.json({ message: 'Social link removed successfully' })
    } else {
      res.status(404).json({ message: 'Social link not found' })
    }
  } catch (error) {
    next(error)
  }
}
