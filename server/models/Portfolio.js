import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  name: String,
  title: String,
  department: String,
  about: String,
  email: String,
  phone: String,
  location: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  },
  skills: [String],
  experiences: [{
    company: String,
    position: String,
    duration: String,
    description: String,
    current: Boolean
  }],
  education: [{
    institution: String,
    degree: String,
    year: String,
    description: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    githubLink: String,
    liveLink: String,
    image: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: String,
    issuer: String
  }]
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);