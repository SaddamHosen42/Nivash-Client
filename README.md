# 🏢 Nivash - Building Management System

<div align="center">
  <img src="https://i.ibb.co/bRWPc4s7/Nivash.png" alt="Nivash Preview image" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<div align="center">
  <h3>🌟 A Modern Building Management Platform for Seamless Community Living</h3>
  <p>Streamline your building operations with advanced features for residents, management, and owners</p>
</div>


---

## 🚀 Live Demo

🔗 **[Visit Nivash Live](https://nivash-e352f.web.app/)**

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)

---

## 🎯 About the Project

**Nivash** is a comprehensive building management system designed to revolutionize how residential and commercial buildings operate. It provides a unified platform for residents, building management, and property owners to interact, manage services, and maintain community standards efficiently.

### 🏗️ Purpose

- **Streamline Communication** between residents and management
- **Digitize Building Operations** for better efficiency
- **Enhance Resident Experience** through modern interfaces
- **Centralize Management Tasks** in one comprehensive platform
- **Provide Transparency** in building operations and finances

---

## ✨ Key Features

### 👥 **User Management**
- 🔐 Secure authentication with Firebase
- 👤 Role-based access (Admin, Member, User)
- 📝 Profile management with photo uploads

### 🏠 **Building Operations**
- 🏢 Apartment management and assignments
- 💰 Monthly rent collection and tracking
- 📊 Financial dashboard and analytics
- 📋 Maintenance request system

### 📢 **Communication Hub**
- 📰 Announcements and notifications
- 💬 Community bulletin board
- 📅 Event management and scheduling
- 🔔 Real-time updates and alerts

### 💳 **Payment & Finance**
- 💸 Integrated payment processing
- 🎟️ Coupon and discount management
- 📈 Revenue tracking and reporting
- 💹 Financial analytics dashboard

### 🎨 **Modern UI/UX**
- 📱 Fully responsive design
- ⚡ Fast loading with optimized performance
- 🎭 Smooth animations with Framer Motion
- 🗺️ Interactive location mapping

---

## 🛠️ Tech Stack

### **Frontend Framework**
- ⚛️ **React 19.1.0** - Modern UI library
- 🏃‍♂️ **Vite** - Lightning-fast build tool
- 🎨 **Tailwind CSS** - Utility-first CSS framework

### **Backend & Database**
- 🔥 **Firebase** - Authentication & Cloud Services
- 🌐 **Firebase Hosting** - Deployment platform

### **Key Libraries & Packages**

#### **UI & Animation**
```json
{
  "framer-motion": "^11.15.0",
  "react-helmet": "^6.1.0",
  "sweetalert2": "^11.14.5",
  "react-hot-toast": "^2.4.1"
}
```

#### **Routing & Navigation**
```json
{
  "react-router-dom": "^7.1.3"
}
```

#### **Data Management**
```json
{
  "@tanstack/react-query": "^5.62.7",
  "axios": "^1.7.9"
}
```

#### **Development Tools**
```json
{
  "eslint": "^9.17.0",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.5.1"
}
```

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-SaddamHosen42.git
   cd Building-Management-System-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file in root directory
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_image_upload_key=your_imgbb_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🎮 Usage

### **For Residents**
1. 📝 Register/Login to access the platform
2. 🏠 View apartment details and rent information
3. 💳 Make monthly rent payments
4. 📢 Stay updated with announcements
5. 🛠️ Submit maintenance requests

### **For Admins**
1. 👥 Manage user roles and permissions
2. 🏢 Add/remove apartments and assignments
3. 💰 Track payments and generate reports
4. 📰 Create announcements and notices
5. 🎟️ Manage coupons and discounts

---

## 📁 Project Structure

```
Building-Management-System-Client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   │   ├── home/       # Home page components
│   │   └── shared/     # Shared components
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   │   ├── home/       # Home page
│   │   ├── dashboard/  # Dashboard pages
│   │   └── auth/       # Authentication pages
│   ├── router/         # Routing configuration
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React context providers
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── .env.local          # Environment variables
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── README.md          # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Developer:** Saddam Hosen  
**Email:** saddamhosen1433@gmail.com  
**LinkedIn:** [https://www.linkedin.com/in/saddam-hosen](https://www.linkedin.com/in/saddam-hosen)

---

<div align="center">
  <p>Made with ❤️ for better building management</p>
  <p>🏢 <strong>Nivash</strong> - Where Community Meets Technology</p>
</div>

---

<div align="center">
  <img src="https://img.shields.io/github/stars/Programming-Hero-Web-Course4/b11a12-client-side-SaddamHosen42?style=social" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/Programming-Hero-Web-Course4/b11a12-client-side-SaddamHosen42?style=social" alt="GitHub forks" />
  <img src="https://img.shields.io/github/issues/Programming-Hero-Web-Course4/b11a12-client-side-SaddamHosen42" alt="GitHub issues" />
</div>
