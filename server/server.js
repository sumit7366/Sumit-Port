import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// In-memory storage (for development)
let portfolioData = {
  name: "Sumit Kumar",
  title: "Full Stack Developer",
  department: "Computer Science",
  shortBio: "Passionate about creating innovative web solutions and learning new technologies.",
  profilePicture: "",
  email: "sumit@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, Country",
  socialLinks: {
    github: "https://github.com//sumit7366",
    linkedin: "https://www.linkedin.com/in/sumitkumarrr/",
    twitter: "https://twitter.com/yourusername"
  },
  skills: ["React", "Node.js", "JavaScript", "MongoDB", "CSS3"],
  experiences: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022-Present",
      description: "Leading development of web applications using React and Node.js.",
      current: true
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      year: "2016-2020",
      description: "Graduated with honors."
    }
  ],
  projects: [
    {
      title: "Portfolio Website",
      description: "A modern portfolio with admin panel",
      technologies: ["React", "Node.js", "MongoDB"],
      githubLink: "https://github.com/yourusername/portfolio",
      liveLink: "#"
    }
  ],
  achievements: [
    {
      title: "Best Developer Award",
      description: "Awarded for outstanding work",
      date: "2023",
      issuer: "Tech Community"
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API is running!',
    database: 'Using in-memory storage'
  });
});

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

// Update portfolio data
app.put('/api/portfolio', (req, res) => {
  portfolioData = { ...portfolioData, ...req.body };
  res.json(portfolioData);
});

// Upload profile picture
app.post('/api/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Construct the URL for the uploaded file
    const profilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    // Update portfolio data with new picture URL
    portfolioData.profilePicture = profilePictureUrl;
    
    res.json({
      message: 'File uploaded successfully',
      profilePicture: profilePictureUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({
      token: 'mock_jwt_token_here',
      user: {
        id: '1',
        username: 'admin',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});



// for resume 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`📁 Uploads directory: /uploads`);
  console.log(`💾 Storage: In-memory (data persists until server restart)`);
  console.log(`🔐 Admin login: username: UserNmae & Password`);
});