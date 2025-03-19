const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    imageUrl: String,
    projectUrl: String,
    githubUrl: String
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);