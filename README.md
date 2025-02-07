# **E-Commerce Website - Full Stack MERN App**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://trendify-e-commerce.web.app/)

This is a **Full Stack E-Commerce Website** built using **MongoDB, Express.js, React, and Node.js (MERN Stack)**. It includes a **user-friendly shopping experience, product management, authentication, and cart functionality**.

## 🚀 **Features**
- 🛒 **Product Listings** – View categories like Men, Women, and Kids
- 🔍 **Product Search & Filtering** – Easily find items
- 🛍 **Add to Cart & Checkout** – Manage cart and view totals
- 🔐 **User Authentication** – Signup/Login with JWT-based authentication
- 🛠 **Admin Panel** – Add, update, and delete products
- 🌍 **Fully Responsive UI** – Works on all devices

## 🛠️ **Tech Stack**
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** React Context API
- **Authentication:** JWT (JSON Web Tokens)
- **Storage:** Multer (for image uploads)
- **Deployment:** Vercel (Frontend), Render (Backend)

## 📂 **Project Structure**
```
ecommerce-mern-app
├── client (Frontend - React)
│   ├── src
│   │   ├── components (Navbar, ProductCard, Cart, Footer)
│   │   ├── pages (Home, ProductPage, Cart, Login, Admin)
│   │   ├── context (Global state management)
│   │   ├── assets (Icons, Images)
│   │   ├── App.jsx (Main App Component)
│   │   ├── index.js (Entry Point)
│   ├── public (Static Files)
│   ├── package.json
│
├── server (Backend - Node.js, Express, MongoDB)
│   ├── models (Database Models)
│   ├── routes (API Routes)
│   ├── controllers (Business Logic)
│   ├── config (Database & Auth Config)
│   ├── server.js (Main Server File)
│   ├── package.json
│
├── README.md
├── LICENSE
```

## 🏗️ **Installation & Setup**
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/jijojacob988/ecommerce-mern-app.git
cd ecommerce-mern-app
```
### 2️⃣ **Install Dependencies**
For **Frontend:**
```sh
cd client
npm install
```
For **Backend:**
```sh
cd server
npm install
```
### 3️⃣ **Configure Environment Variables**
Create a `.env` file inside the `server` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ **Run the Application**
To start the **frontend**:
```sh
cd client
npm run dev
```
To start the **backend**:
```sh
cd server
npm start
```
Now open **http://localhost:5173** to use the app.

## 🌐 **Live Demo**
🔗 **[Live Demo](https://trendify-e-commerce.web.app/)**

## 🌐 **Deployment**
1. Push your project to GitHub.
2. Deploy the **frontend** using [Vercel](https://vercel.com/).
3. Deploy the **backend** using [Render](https://render.com/).

## 🤝 **Contributing**
Pull requests are welcome! Feel free to open issues for improvements or bug fixes.

## 📜 **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by **Jijo Jacob**
