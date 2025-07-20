# Points Arena - Ranking System

A modern, real-time points claiming and ranking system built with React.js frontend and Node.js backend. Users can claim random points and compete on a dynamic leaderboard with beautiful trophy-themed UI.

## Live Link URL

https://pointsrankingsystem.netlify.app/

## 🏆 Features

### Core Functionality
- **User Management**: Add and manage users with unique profiles
- **Points Claiming**: Award random points (1-10) to selected users
- **Real-time Rankings**: Dynamic leaderboard that updates instantly
- **Claim History**: Complete tracking of all point claims with pagination
- **Responsive Design**: Beautiful UI that works on all devices

### Technical Features
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas
- **RESTful API**: Clean backend architecture with Express.js
- **Real-time Updates**: Instant UI updates after point claims
- **Error Handling**: Robust error handling and validation
- **Modern UI**: Trophy-themed design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd points-ranking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Update the `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/points-ranking
   PORT=5000
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
points-ranking-system/
├── server/                     # Backend (Node.js + Express)
│   ├── models/                 # MongoDB models
│   │   ├── User.js             # User schema
│   │   └── ClaimHistory.js     # Claim history schema
│   ├── routes/                 # API routes
│   │   ├── users.js            # User management endpoints
│   │   └── claims.js           # Points claiming endpoints
│   └── index.js                # Server entry point
├── src/                        # Frontend (React.js)
│   ├── components/             # React components
│   │   ├── Header.jsx          # App header with branding
│   │   ├── UserSelector.jsx    # User selection and management
│   │   ├── ClaimSection.jsx    # Points claiming interface
│   │   ├── Leaderboard.jsx     # Rankings display
│   │   └── ClaimHistory.jsx    # History tracking
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles (Tailwind)
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🎮 How to Use

### 1. User Management
- Navigate to the "Users" tab
- Click "Add User" to create new users
- Select users from the dropdown for point claiming

### 2. Claiming Points
- Select a user from the dropdown
- Click "Claim Points" to award random points (1-10)
- Watch the leaderboard update in real-time

### 3. View Rankings
- The "Leaderboard" tab shows current rankings
- Top 3 users are highlighted with special trophy cards
- Rankings update automatically after each claim

### 4. Track History
- The "History" tab shows all point claims
- Paginated view with user details and timestamps
- Filter by specific users if needed

## 🛠 API Endpoints

### Users
- `GET /api/users` - Get all users with rankings
- `POST /api/users` - Add a new user
- `GET /api/users/:id` - Get specific user

### Claims
- `POST /api/claims` - Claim points for a user
- `GET /api/claims/history` - Get claim history with pagination

## 🎨 UI Components

### Header
- Trophy-themed branding with gradient background
- Clear navigation and app title

### Leaderboard
- **Top 3 Podium**: Special cards for top performers with crown, medal, and award icons
- **Rankings List**: Clean list view for remaining users
- **Real-time Updates**: Instant ranking changes after point claims

### User Selector
- Dropdown interface for user selection
- User management with add/remove functionality
- Avatar display with user stats

### Claim History
- Paginated history view
- User avatars and claim details
- Timestamp formatting and navigation

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Default Users
The system automatically creates 10 default users on first startup:
- Rahul, Kamal, Sanak, Priya, Amit
- Neha, Ravi, Sneha, Arjun, Kavya

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend (Render/Heroku/Railway)
1. Set environment variables on your hosting platform
2. Deploy the server code
3. Update frontend API URLs to point to your deployed backend

## 🛡 Error Handling

- **Frontend**: Graceful error handling with user-friendly messages
- **Backend**: Comprehensive validation and error responses
- **Database**: Connection error handling and retry logic

## 🎯 Performance Features

- **Optimized Queries**: Efficient MongoDB queries with proper indexing
- **Pagination**: History pagination to handle large datasets
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Visual feedback during API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify MongoDB connection string
3. Ensure all dependencies are installed
4. Check that both frontend and backend servers are running

## 🔮 Future Enhancements

- User authentication and profiles
- Achievement badges and milestones
- Point multipliers and special events
- Social features and user interactions
- Advanced analytics and statistics
- Mobile app version

---

**Built by Indranil Saha using React.js, Node.js, and MongoDB**