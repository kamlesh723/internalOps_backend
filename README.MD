# Medium Clone – Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**A production-grade REST API for a Medium-like blogging platform built with Node.js, Express, and MongoDB.**

[Installation](#-installation--setup) • [API Documentation](#-api-documentation) • [Features](#-features) • [Tech Stack](#-tech-stack)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Database Models](#-database-models)
- [API Documentation](#-api-documentation)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Security Features](#-security-features)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🎯 Overview

This repository represents the **completed backend** of a full-stack Medium clone project. Built with modern best practices, this API provides a robust foundation for a blogging platform with features like authentication, post management, social interactions, and administrative controls.

**Current Status:** Backend feature-complete  
**Next Phase:** Frontend (React) development and deployment

---

## 🚀 Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token handling
- **Role-based access control** (User / Moderator / Admin)
- **Protected routes** using middleware
- **Password hashing** with bcrypt
- **Token refresh** capabilities

### 📝 Posts
- **CRUD operations** (Create, Read, Update, Delete)
- **Draft & published workflow** for content management
- **Pagination** for efficient feed loading
- **Full-text search** functionality
- **Soft delete** with comprehensive audit fields
- **Author-based filtering**
- **Tag-based categorization**

### 💬 Comments
- **Comment on posts** with nested support
- **Ownership-based deletion** (Owner / Moderator / Admin)
- **Soft delete support** for data integrity
- **Real-time comment counts**

### 👏 Claps (Medium-style Appreciation)
- **Per-user clap tracking** (prevents duplicate clapping)
- **Aggregated clap count** per post
- **Scalable data model** using separate Clap collection
- **Optimistic UI support** ready

### 🏷️ Tags
- **Separate Tag model** with many-to-many relationship
- **Auto-create tags** on first usage
- **Accurate usage count** tracking
- **Trending tags** endpoint
- **Proper increment/decrement** on post operations

### 👤 Follow System
- **Follow/unfollow users** functionality
- **Followers & following lists**
- **Self-follow prevention**
- **Duplicate follow prevention**
- **Follow count tracking**

### 🧑‍⚖️ Admin & User Management
- **View all users** (Admin only)
- **Update user roles** with permission checks
- **Soft delete users** for compliance
- **User activity monitoring**

### 🧰 Developer Experience
- **Swagger (OpenAPI)** documentation
- **Clean MVC architecture**
- **RESTful API design**
- **Error handling middleware**
- **Request validation**
- **Ready for frontend integration**

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | v14+ |
| **Express.js** | Web Framework | 4.x |
| **MongoDB** | NoSQL Database | 4.x+ |
| **Mongoose** | ODM (Object Data Modeling) | 6.x+ |
| **JWT** | Authentication | - |
| **bcrypt** | Password Hashing | - |
| **Swagger UI** | API Documentation | - |
| **dotenv** | Environment Management | - |

---

## 📦 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v14 or higher
- **MongoDB** (Local installation or Atlas account)
- **npm** or **yarn** package manager
- **Git** for version control

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kamlesh723/medium-clone-backend.git
   cd medium-clone-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGO_URI=mongodb://localhost:27017/medium-clone
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/medium-clone

   # Authentication
   JWT_SECRET=your_super_secret_key_here_min_32_characters
   JWT_EXPIRE=7d

   # Optional: For production
   # FRONTEND_URL=http://localhost:3000
   # RATE_LIMIT_WINDOW_MS=900000
   # RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **(Optional) Seed admin user**
   ```bash
   node scripts/seedAdmin.js
   ```

5. **Run the server**
   
   **Development mode** (with auto-restart):
   ```bash
   npm run dev
   ```

   **Production mode**:
   ```bash
   npm start
   ```

6. **Verify installation**
   
   Visit `http://localhost:5000/api/docs` to see the Swagger documentation.

---

## 🔑 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `JWT_EXPIRE` | JWT token expiration time | No | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |

---

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'moderator', 'admin'], default: 'user'),
  bio: String,
  avatar: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String,
  author: ObjectId (ref: 'User', required),
  status: String (enum: ['draft', 'published'], default: 'draft'),
  tags: [ObjectId] (ref: 'Tag'),
  coverImage: String,
  readTime: Number,
  isActive: Boolean (default: true),
  deletedAt: Date,
  deletedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  content: String (required),
  post: ObjectId (ref: 'Post', required),
  author: ObjectId (ref: 'User', required),
  isActive: Boolean (default: true),
  deletedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Tag Model
```javascript
{
  name: String (required, unique, lowercase),
  usageCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Clap Model
```javascript
{
  post: ObjectId (ref: 'Post', required),
  user: ObjectId (ref: 'User', required),
  count: Number (default: 1),
  createdAt: Date,
  updatedAt: Date
}
// Unique compound index on (post, user)
```

### Follow Model
```javascript
{
  follower: ObjectId (ref: 'User', required),
  following: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
// Unique compound index on (follower, following)
```

---

## 📚 API Documentation

### Swagger UI
Interactive API documentation is available at:
```
http://localhost:5000/api/docs
```

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/update-profile` | Update user profile | Yes |
| PUT | `/api/auth/update-password` | Change password | Yes |

**Example: Register**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

### Post Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/posts` | Get published posts (paginated) | No | - |
| GET | `/api/posts/:id` | Get single post | No | - |
| GET | `/api/posts/search?q=` | Search posts | No | - |
| GET | `/api/posts/my-posts` | Get logged-in user posts | Yes | User |
| GET | `/api/posts/my-drafts` | Get logged-in user drafts | Yes | User |
| POST | `/api/posts` | Create new post | Yes | User |
| PUT | `/api/posts/:id` | Update post | Yes | Owner |
| DELETE | `/api/posts/:id` | Soft delete post | Yes | Owner/Admin |
| PATCH | `/api/posts/:id/publish` | Publish draft post | Yes | Owner |

**Query Parameters for GET /api/posts:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (e.g., -createdAt)
- `tags`: Filter by tag names (comma-separated)

**Example: Create Post**
```json
POST /api/posts
{
  "title": "My First Blog Post",
  "content": "This is the content...",
  "excerpt": "A brief summary",
  "tags": ["javascript", "nodejs"],
  "status": "published"
}
```

---

### Comment Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/comments/:postId` | Add comment to post | Yes | User |
| GET | `/api/comments/:postId` | Get all comments for post | No | - |
| DELETE | `/api/comments/:commentId` | Delete comment | Yes | Owner/Moderator/Admin |

**Example: Add Comment**
```json
POST /api/comments/60d5ec49f1b2c72b8c8e4a1b
{
  "content": "Great article! Very insightful."
}
```

---

### Clap Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/claps/:postId` | Clap a post (max 1 per user) | Yes |
| GET | `/api/claps/:postId` | Get total claps for post | No |
| GET | `/api/claps/:postId/user` | Check if user clapped | Yes |

**Example: Clap Post**
```json
POST /api/claps/60d5ec49f1b2c72b8c8e4a1b
// No body required, automatically adds 1 clap from authenticated user
```

---

### Tag Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tags/trending` | Get trending tags | No |
| GET | `/api/tags/:tagName` | Get posts by tag | No |
| GET | `/api/tags` | Get all tags | No |

**Example: Get Trending Tags**
```json
GET /api/tags/trending?limit=10
```

---

### Follow Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/follow/:userId` | Follow a user | Yes |
| DELETE | `/api/follow/:userId` | Unfollow a user | Yes |
| GET | `/api/follow/:userId/followers` | Get user's followers | No |
| GET | `/api/follow/:userId/following` | Get users being followed | No |
| GET | `/api/follow/check/:userId` | Check if following user | Yes |

---

### User Management Endpoints (Admin Only)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/users` | Get all users | Yes | Admin |
| GET | `/api/users/:id` | Get user by ID | Yes | Admin |
| PATCH | `/api/users/:id/role` | Update user role | Yes | Admin |
| DELETE | `/api/users/:id` | Soft delete user | Yes | Admin |

**Example: Update User Role**
```json
PATCH /api/users/60d5ec49f1b2c72b8c8e4a1b/role
{
  "role": "moderator"
}
```

---

## 📁 Project Structure

```
medium-clone-backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # Database connection
│   │   └── swagger.js            # Swagger configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── postController.js     # Post operations
│   │   ├── commentController.js  # Comment operations
│   │   ├── clapController.js     # Clap operations
│   │   ├── tagController.js      # Tag operations
│   │   ├── followController.js   # Follow system
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── roleCheck.js          # Role-based access
│   │   ├── errorHandler.js       # Error handling
│   │   └── validate.js           # Request validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Post.js               # Post schema
│   │   ├── Comment.js            # Comment schema
│   │   ├── Tag.js                # Tag schema
│   │   ├── Clap.js               # Clap schema
│   │   └── Follow.js             # Follow schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── postRoutes.js         # Post endpoints
│   │   ├── commentRoutes.js      # Comment endpoints
│   │   ├── clapRoutes.js         # Clap endpoints
│   │   ├── tagRoutes.js          # Tag endpoints
│   │   ├── followRoutes.js       # Follow endpoints
│   │   └── userRoutes.js         # User management endpoints
│   ├── utils/
│   │   ├── apiResponse.js        # Standardized responses
│   │   └── validators.js         # Input validators
│   └── app.js                    # Express app setup
├── scripts/
│   └── seedAdmin.js              # Admin user seeding
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
├── README.md                     # This file
└── server.js                     # Entry point
```

---

## 🔒 Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Role-Based Access Control (RBAC):** Fine-grained permissions
- **Input Validation:** Request body validation
- **SQL Injection Protection:** Mongoose parameterized queries
- **XSS Protection:** Input sanitization
- **Rate Limiting:** Prevent brute force attacks (configurable)
- **CORS Configuration:** Controlled cross-origin requests
- **Helmet.js:** Security headers
- **Environment Variables:** Sensitive data protection

---

## 🧪 Testing

### Manual Testing with Swagger
1. Start the server
2. Navigate to `http://localhost:5000/api/docs`
3. Test endpoints interactively

### Using Postman/Thunder Client
Import the Swagger JSON schema or manually test endpoints.

### Future: Automated Testing
```bash
# Unit tests (coming soon)
npm run test

# Integration tests (coming soon)
npm run test:integration
```

---

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Set strong `JWT_SECRET`
4. Configure CORS for production frontend URL

### Recommended Platforms
- **Backend:** Railway, Render, Heroku, AWS EC2
- **Database:** MongoDB Atlas
- **Environment Variables:** Platform-specific settings

### Example: Deploying to Render
```bash
# Build command
npm install

# Start command
npm start
```

---

## 🗺️ Roadmap

### ✅ Completed
- [x] Authentication system (JWT)
- [x] User management
- [x] Post CRUD operations
- [x] Comment system
- [x] Clap functionality
- [x] Tag system
- [x] Follow system
- [x] Admin controls
- [x] API documentation (Swagger)

### 🔜 Upcoming Features
- [ ] Frontend (React)
  - [ ] User interface
  - [ ] Rich text editor
  - [ ] Responsive design
- [ ] Deployment
  - [ ] Backend deployment
  - [ ] Frontend deployment
  - [ ] CI/CD pipeline
- [ ] Additional Features
  - [ ] Email notifications
  - [ ] Image upload (Cloudinary)
  - [ ] Reading lists/bookmarks
  - [ ] Post recommendations
  - [ ] Analytics dashboard
  - [ ] SEO optimization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow existing code patterns
- Add comments for complex logic
- Update documentation for new features
- Write meaningful commit messages

---

## 👤 Author

**Kamlesh Yadav**

- GitHub: [@kamlesh723](https://github.com/kamlesh723)
- Email: [your-email@example.com]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Medium.com for design inspiration
- Express.js community
- MongoDB documentation
- JWT.io for authentication guidance

---

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the Swagger documentation
- Review existing issues and discussions

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Kamlesh Yadav

</div>