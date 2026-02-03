
# 🔍 Lost & Found Management System
A full-stack web application for reporting and tracking lost/found items in real-time. Built with React frontend and Node.js backend.

## Screenshots
(screenshots/ss1.png) (screenshots/ss2.png) 
(screenshots/ss3.png) (screenshots/ss4.png) 
(screenshots/ss5.png) (screenshots/ss6.png)
(screenshots/ss7.png) 

## Features
- **Report Items**: Report lost or found items with details (name, category, location, contact)
- **Return Tracking**: Mark items as returned when claimed by owner
- **Smart Filters**: Filter by type (lost/found), category, and status
- **Responsive Design**: Fully responsive design for desktop, tablet, and mobile
- **User System**: Secure login and registration system
- **Dashboard**: View all reported items with sorting and search
- **Delete Items**: Remove items from the system
- **History View**: Toggle between active items and returned history

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/snehalpatil88/lost-found-system.git
cd lost-found-system
```

2. **Start Backend Server**
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```

3. **Start Frontend App**
```bash
cd client
npm install
npm start
# App opens on http://localhost:3000
```

## Tech Stack
- **Frontend**: React, CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **API**: REST API
- **Authentication**: Session-based authentication
- **CORS**: Cross-origin resource sharing enabled

## Project Structure
```
lost-found-system/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   │   ├── AddItem.js    # Item reporting form
│   │   │   ├── ItemList.js   # Items display with filters
│   │   │   └── Navbar.js     # Navigation bar
│   │   ├── pages/           # Page Components
│   │   │   ├── Home.js      # Main dashboard page
│   │   │   └── Login.js     # Login/Registration page
│   │   ├── services/        # API Services
│   │   │   └── api.js       # All API calls
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Application entry point
│   └── package.json         # Frontend dependencies
├── server/                  # Node.js Backend
│   ├── server.js           # Main server file (API endpoints)
│   └── package.json        # Backend dependencies
├── screenshots/            # Project Screenshots
│   ├── ss1.png             
│   ├── ss2.png             
│   ├── ss3.png             
│   ├── ss4.png             
│   ├── ss5.png             
│   ├── ss6.png            
│   └── ss7.png             
└── README.md               
```

## API Endpoints

### Items Management
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/items` | Get all items | - |
| GET | `/api/items?status=active` | Get active items only | - |
| GET | `/api/items?status=returned` | Get returned items only | - |
| POST | `/api/items` | Add new item | `{itemName, category, type, location, contact, description}` |
| PUT | `/api/items/:id/return` | Mark item as returned | - |
| DELETE | `/api/items/:id` | Delete item | - |

### User Authentication
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/users/register` | Register new user | `{name, email, password}` |
| POST | `/api/users/login` | Login user | `{email, password}` |

### Sample API Request
```json
POST /api/items
{
  "itemName": "iPhone 14 Pro",
  "category": "Electronics",
  "description": "Black color, case with flowers",
  "type": "lost",
  "location": "Library 2nd floor",
  "contact": "john@example.com"
}
```

## How to Use
1. **Open** `http://localhost:3000` in your browser
2. **Report Item**: Fill the form with item details and submit
3. **View Items**: All reported items appear in the list below
4. **Filter**: Use the filter dropdown to view only lost or found items
5. **Mark Returned**: Click "Mark as Returned" when item is claimed
6. **View History**: Toggle "Show History" to see returned items
7. **Login/Register**: Click "Login" in navbar to access user features

##  Troubleshooting

### Common Issues
1. **Backend not starting**: Check if port 5000 is free or change port in `server.js`
2. **Database errors**: Delete `server/database.db` and restart server
3. **CORS errors**: Ensure frontend runs on port 3000 and backend on port 5000
4. **Form not submitting**: Check browser console for errors

### Development Commands
```bash
# Check server status
curl http://localhost:5000/api/items

# Test backend API
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{"itemName":"Test","type":"lost","location":"Test"}'

# View SQLite database (optional)
sqlite3 server/database.db "SELECT * FROM items;"
```

## Contributing
Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## Author
**Snehal Patil**  
GitHub: [@snehalpatil88](https://github.com/snehalpatil88)  
Project: [https://github.com/snehalpatil88/lost-found-system](https://github.com/snehalpatil88/lost-found-system)

## Acknowledgments
- [Create React App](https://create-react-app.dev/) for React boilerplate
- [Express.js](https://expressjs.com/) for backend framework
- [SQLite](https://www.sqlite.org/) for lightweight database
- [React Router](https://reactrouter.com/) for navigation

## Project Status
- ✅ **Complete**: All core features implemented
- ✅ **Tested**: Manual testing completed
- ✅ **Documented**: README and code comments added
- ✅ **Deployed**: GitHub repository ready
- 🔄 **Future**: Live deployment and additional features

---

⭐ **If you find this project helpful, please give it a star on GitHub!** ⭐

🔗 **GitHub Repository**: [https://github.com/snehalpatil88/lost-found-system](https://github.com/snehalpatil88/lost-found-system)
