# 🛒 SKstore

A modern, full-featured e-commerce web application built with a focus on scalability, performance, and user experience.

[![Deploy](https://img.shields.io/badge/Deployed-Live-green?style=flat-square&logo=render)](https://skstore.onrender.com/)
[![License](https://img.shields.io/github/license/madashivakarthikgoud/SKstore?style=flat-square)](LICENSE)
[![Issues](https://img.shields.io/github/issues/madashivakarthikgoud/SKstore?style=flat-square)](https://github.com/madashivakarthikgoud/SKstore/issues)

---

## 🚀 Live Demo

👉 **Explore SKstore:** [https://skstore.onrender.com/](https://skstore.onrender.com/)

---

## ✨ Features

- **User Authentication**: Secure signup, login, JWT sessions, password reset.
- **Product Catalog**: Browse, search, and filter products with rich details.
- **Shopping Cart & Checkout**: Seamless add/remove, quantity management, and order placement.
- **Admin Dashboard**: Product management, user roles, order tracking, analytics.
- **Order Management**: View order history, payment status, and real-time updates.
- **Responsive Design**: Mobile-first, works great on all devices.
- **Scalable API**: RESTful endpoints for all business logic.
- **Modern UI/UX**: Clean, fast, and accessible interface.

---

## 🏗️ Tech Stack

| Frontend      | Backend       | Database   | DevOps/Hosting        |
| ------------- | -------------| ---------- | --------------------- |
| React.js      | Node.js      | MongoDB    | Render.com (Cloud)    |
| Redux Toolkit | Express.js   |            | GitHub Actions (CI/CD)|
| Tailwind CSS  | JWT Auth     |            |                       |

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/madashivakarthikgoud/SKstore.git
cd SKstore
```

### 2. Install Dependencies

- **Server:**
  ```bash
  cd backend
  npm install
  ```

- **Client:**
  ```bash
  cd ../frontend
  npm install
  ```

### 3. Configure Environment

Create `.env` files in both `backend` and `frontend` directories. Example for backend:

```ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run Development Servers

- **Backend:**
  ```bash
  npm run dev
  ```

- **Frontend:**
  ```bash
  npm start
  ```

By default:
- Backend: [http://localhost:5000](http://localhost:5000)
- Frontend: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Project Structure

```
SKstore/
│
├── backend/          # Express API, MongoDB models, routes, controllers
├── frontend/         # React client, Redux, UI components
├── .github/          # Workflows, issue templates
├── README.md
└── ... 
```

---

## 🔒 Security

- Passwords hashed with bcrypt.
- JWT-based authentication.
- Input validation and sanitization.
- Environment variables for sensitive config.

---

## 🚧 Roadmap

- [ ] Payment gateway integration (e.g., Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist/favorites
- [ ] Advanced admin analytics

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions, feedback, or support, open an [issue](https://github.com/madashivakarthikgoud/SKstore/issues) or reach out at [your-email@example.com].

---

> _Crafted with ❤️ by [madashivakarthikgoud](https://github.com/madashivakarthikgoud)_
