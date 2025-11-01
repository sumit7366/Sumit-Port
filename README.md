# Portfolio Website

A modern, responsive portfolio website with an admin panel, day/night modes, real-time content management, file uploads and a Node.js + MongoDB backend.

Features
- Professional, responsive portfolio frontend built with React
- Admin panel for real-time content updates
- Day / Night mode with automatic time detection
- File uploads for profile pictures and resumes (stored in `server/uploads`)
- Interactive background with animated stars
- MongoDB integration for persistent data
- RESTful API with Node.js/Express backend

Prerequisites
Before you begin, make sure you have the following installed:

- Node.js v16 or higher
- MongoDB Community Server (or MongoDB Atlas)
- Git

Quick links
- Node.js: https://nodejs.org/
- MongoDB Community Server: https://www.mongodb.com/try/community
- Git: https://git-scm.com/

MongoDB Installation (short)

macOS (Homebrew recommended)
```zsh
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add MongoDB tap and install
brew tap mongodb/brew
brew update
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

Windows (Community Server installer)
1. Download the MongoDB Community Server MSI from the MongoDB website.
2. Run the installer and choose "Complete".
3. Optionally install MongoDB Compass.
4. MongoDB can be run as a Windows service or manually with mongod.exe.

Verify MongoDB
```zsh
# Open the shell
mongosh
# or
mongo
```

Project layout
```
portfolio/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       └── components/
├── server/                 # Node.js backend
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── uploads/            # profile-pictures/ resumes/
└── README.md
```

Getting started (local)

1) Clone the repo
```zsh
git clone <https://github.com/sumit7366/Sumit-Port.git>
cd portfolio
```

2) Backend setup
```zsh
cd server
npm install

# Create .env (example values)
cat > .env <<'ENV'
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_12345
MONGODB_URI=mongodb://localhost:27017/portfolio
ENV

# Run in development (if script exists)
npm run dev
# Or production
npm start
```

3) Frontend setup
```zsh
cd ../client
npm install
npm start
```

By default the frontend runs at `http://localhost:3000` and the backend at `http://localhost:5000` (adjust `PORT` in `.env`).

Environment variables (server/.env)
- `PORT` — HTTP port for server (default `5000`)
- `JWT_SECRET` — secret for JSON Web Tokens
- `MONGODB_URI` — MongoDB connection string (local or Atlas)

Default admin credentials (development)
- Username: `******`
- Password: `********`

Admin panel features
- Edit basic information: name, title, department, about
- Upload profile picture (jpg/png/webp, max 5MB)
- Upload resume (PDF, max 5MB)
- Manage skills, experiences, education, projects, achievements
- Update contact details and social links

File uploads
- Profile pictures: jpg, png, gif, webp (max 5MB)
- Resume: PDF only (max 5MB)
- Uploaded files are stored in `server/uploads/` by default.

MongoDB schema (document shape)
```json
{
  "name": "String",
  "title": "String",
  "department": "String",
  "about": "String",
  "profilePicture": "String",
  "resumeFile": "String",
  "skills": ["String"],
  "experiences": [Object],
  "education": [Object],
  "projects": [Object],
  "achievements": [Object],
  "socialLinks": Object
}
```

Common Issues & Solutions

- MongoDB connection error
  - Ensure MongoDB is running (`mongosh` should connect).
  - Check `MONGODB_URI` in `.env` and that port `27017` is available.
  - On macOS, if permissions fail, fix ownership of data dir:
    ```zsh
    sudo chown -R $(whoami) /usr/local/var/mongodb
    ```

- Port already in use
  ```zsh
  lsof -i :3000  # or :5000
  kill -9 <PID>
  ```

- Module not found
  ```zsh
  rm -rf node_modules
  rm package-lock.json
  npm install
  ```

- React "Invalid Host header"
  Create a `.env` in `client/` with:
  ```env
  HOST=localhost
  DANGEROUSLY_DISABLE_HOST_CHECK=true
  ```

- File upload/multer issues
  - Ensure `server/uploads` exists and has correct permissions:
    ```zsh
    chmod 755 server/uploads
    ```
  - Check file size limits in backend multer config (5MB recommended).

CORS
The server should expose CORS for the frontend. Example in `server.js`:
```js
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
```

Development notes
- Add backend routes in `server/routes/` and wire them in `server/server.js`.
- Add React components under `client/src/components/`.
- Styling is in `client/src/App.css` and component-level CSS modules if used.

Running tests
- If the project contains tests, run from the root of each package:
```zsh
# Backend tests
cd server
npm test

# Frontend tests
cd ../client
npm test
```

Deployment

Frontend (Netlify / Vercel)
```zsh
cd client
npm run build
# Upload the generated build/ folder to your hosting provider.
```

Backend (Heroku / Railway / Render)
- Push the `server/` contents or the full repo depending on the host.
- Set environment variables on the host (e.g., `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`).
- Use MongoDB Atlas for a production-ready DB and update `MONGODB_URI`.

Support & troubleshooting
- Frontend: open browser console (DevTools) for errors
- Backend: check server terminal logs
- Verify `node --version`, `npm --version`, `mongosh --version`

License
This project is licensed under the MIT License.

Success checklist
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB connected successfully
- Admin panel accessible with the provided credentials

If you want, I can also:
- Add a short CONTRIBUTING.md
- Add scripts that check `server/uploads` exists and create it if missing
- Add a `.env.example` and a short startup script

Enjoy building and customizing your portfolio! 🚀
