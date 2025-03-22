const portfolioData = require('../data/portfolioData');

// Get profile
exports.getProfile = (req, res) => {
  res.json(portfolioData);
};

// These endpoints are now removed since we're using static data
exports.updateProfile = (req, res) => {
  res.status(501).json({ message: 'This endpoint is no longer available as the site uses static data' });
};

exports.addProject = (req, res) => {
  res.status(501).json({ message: 'This endpoint is no longer available as the site uses static data' });
};