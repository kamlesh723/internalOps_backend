# Medium Clone - Backend API

A RESTful API for a Medium-like blogging platform with role-based access control, built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-based access (User, Moderator, Admin)
- 📝 CRUD operations for blog posts
- 🗑️ Soft delete for users and posts
- 🔍 Search functionality
- 📄 Pagination support
- 📊 User profile management
- 🛡️ Protected routes with middleware

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Documentation:** Swagger UI

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Steps

1. Clone the repository:
```bash
git clone <your-repo-url>
cd medium-clone-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

4. Create an admin user (optional):
```bash
node scripts/seedAdmin.js
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all published posts (paginated) | No |
| GET | `/api/posts/search?q=query` | Search posts | No |
| GET | `/api/posts/:id` | Get single post | No |
| GET | `/api/posts/my-posts` | Get current user's posts | Yes (User) |
| GET | `/api/posts/my-drafts` | Get current user's drafts | Yes (User) |
| POST | `/api/posts` | Create new post | Yes (User) |
| PUT | `/api/posts/:id` | Update post | Yes (Owner/Mod/Admin) |
| DELETE | `/api/posts/:id` | Delete post | Yes (Owner/Mod/Admin) |

### Users (Admin Only)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | Yes (Admin) |
| PATCH | `/api/users/:id/role` | Update user role | Yes (Admin) |
| DELETE | `/api/users/:id` | Soft delete user | Yes (Admin) |

## Request Examples

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Create Post
```bash
POST /api/posts
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "status": "published"
}
```

### Get Posts with Pagination
```bash
GET /api/posts?page=1&limit=10
```

### Search Posts
```bash
GET /api/posts/search?q=javascript
```

## User Roles & Permissions

### User (Default)
- Create, edit, and delete their own posts
- View all published posts
- Comment on posts (future feature)

### Moderator
- All User permissions
- Delete any post
- Delete any comment (future feature)

### Admin
- All Moderator permissions
- Manage users (change roles, soft delete)
- View deleted content

## Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ["user", "moderator", "admin"],
  isActive: Boolean,
  deletedAt: Date,
  timestamps: true
}
```

### Post Schema
```javascript
{
  title: String,
  content: String,
  author: ObjectId (ref: User),
  status: Enum ["draft", "published"],
  isActive: Boolean,
  deletedAt: Date,
  deletedBy: ObjectId (ref: User),
  timestamps: true
}
```

## Project Structure
```
├── config/
│   ├── db.js
│   └── swagger.js
├── controllers/
│   ├── auth.controller.js
│   ├── post.controller.js
│   └── user.controller.js
├── middleware/
│   ├── auth.js
│   └── checkOwnership.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── auth.routes.js
│   ├── post.routes.js
│   └── user.routes.js
├── scripts/
│   └── seedAdmin.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/medium-clone |
| JWT_SECRET | Secret key for JWT | your_secret_key_here |

## API Documentation

Interactive API documentation is available via Swagger UI:
```
http://localhost:5000/api/docs
```

## Future Enhancements

- [ ] Comments system
- [ ] Like/Clap functionality
- [ ] User follow system
- [ ] Notifications
- [ ] Tags/Categories
- [ ] Image upload for posts
- [ ] Email verification
- [ ] Password reset
- [ ] Rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Your Name - [Your GitHub](https://github.com/yourusername)

## Acknowledgments

- Inspired by Medium
- Built as a learning project for backend development

---

⭐ Star this repo if you found it helpful!