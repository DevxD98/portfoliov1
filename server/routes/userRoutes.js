const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, addProject } = require('../controllers/userController');

router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.post('/profile/:id/projects', addProject);

module.exports = router;