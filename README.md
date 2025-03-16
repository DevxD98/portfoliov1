# Portfolio 

A modern, interactive portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS. This project showcases professional experience, projects, and integrates with LastFM for real-time music activity display.

## Features

- 🎨 Modern and responsive UI with Tailwind CSS
- 🌊 Interactive About section with ripple effects
- 🎵 LastFM integration for real-time music activity
- 📱 Mobile-first design approach
- 🔄 Dynamic content management
- 🎯 Smooth animations and transitions

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Custom animations
- Responsive design components

### Backend
- Node.js
- Express.js
- MongoDB
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-demo
```

2. Install dependencies for both client and server
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables

Create `.env` files in both client and server directories:

Client (.env):
```
REACT_APP_API_URL=http://localhost:5000
```

Server (.env):
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
LASTFM_API_KEY=your_lastfm_api_key
```

### Running the Application

1. Start the server
```bash
cd server
npm start
```

2. Start the client
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── assets/         # Static assets
│   │   └── lib/            # Utility functions
│   └── public/             # Public assets
└── server/                 # Backend Node.js application
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── models/             # Database models
    ├── routes/             # API routes
    └── middleware/         # Custom middleware
```

## Development

- Follow the established code style and organization
- Create feature branches from `main`
- Use meaningful commit messages
- Write tests for new features

## Deployment

The application can be deployed to various platforms:

### Frontend
- Vercel
- Netlify
- GitHub Pages

### Backend
- Heroku
- DigitalOcean
- AWS

Make sure to set up the appropriate environment variables on your deployment platform.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.