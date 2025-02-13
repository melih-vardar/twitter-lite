# Twitter Lite Frontend

## 📝 Overview
A Twitter clone frontend application built with React and modern web technologies, implementing core Twitter functionalities with a clean and responsive UI.

### 🛠️ Tech Stack
- **React** 19.0.0
- **Vite** 6.1.0 - Next Generation Frontend Tooling
- **Tailwind CSS** 4.0.5 - Utility-first CSS framework
- **Axios** 1.7.9 - Promise based HTTP client
- **JWT-decode** 4.0.0 - JWT token parsing
- **React Router DOM** 5.2.0 - Routing library
- **Context API** - State management

## 🎯 Features
- **🔐 Authentication**
  - JWT-based authentication
  - Register & Login functionality
  - Protected routes

- **📱 Core Twitter Features**
  - ✏️ Tweet creation and management
  - 💬 Comments
  - ❤️ Likes
  - 🔄 Retweets with quotes
  - 🔍 User search
  - 👤 User profiles

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn

### Environment Variables
```env
VITE_API_URL=http://localhost:3000
```

## 🏗️ Project Structure
```
src/
├── components/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Tweet.jsx
│   ├── TweetList.jsx
│   ├── TweetComposer.jsx
│   └── SearchBar.jsx
├── context/
│   └── AuthContext.jsx
├── App.jsx
└── main.jsx
```

## 📚 Key Components
- **AuthContext**: Manages authentication state
- **Tweet**: Handles individual tweet display and interactions
- **TweetComposer**: Manages tweet creation
- **TweetList**: Displays tweet feed
- **SearchBar**: Implements user search functionality

## 🔗 Related Projects
- [Backend Repository](https://github.com/melih-vardar/twitter-api)

---