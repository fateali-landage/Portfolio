import Settings from '../models/settingsModel.js'

// @desc    Get global settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create({})
    }
    res.json(settings)
  } catch (error) {
    next(error)
  }
}

// @desc    Update global settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne()
    if (!settings) {
      settings = new Settings(req.body)
    } else {
      Object.assign(settings, req.body)
    }
    const updatedSettings = await settings.save()
    res.json(updatedSettings)
  } catch (error) {
    next(error)
  }
}
