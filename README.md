Game Store E-commerce Platform

A modern gaming e-commerce platform built with vanilla JavaScript, featuring a responsive design and simulated payment system.

📁 Folder / 📄 File	📌 Description
game-store/	Root directory of the project
├── frontend/	Contains all frontend-related files
│ ├── index.html	🏠 Home page with game listings
│ ├── cart.html	🛒 Shopping cart page
│ ├── login.html	🔑 Login/Signup page
│ ├── css/	🎨 Contains stylesheets
│ │ └── style.css	Main CSS file (using Tailwind CSS)
│ ├── js/	⚙️ Contains JavaScript files
│ │ └── utils.js	Utility functions
│ ├── images/	🖼️ Stores game images
│ │ ├── game1.jpg	Game image 1
│ │ ├── game2.jpg	Game image 2
└── README.md	📖 Project documentation

Features

- 🎮 Browse gaming catalog with detailed descriptions
- 🛒 Interactive shopping cart functionality
- 💳 Simulated payment processing
- 👤 User authentication system
- 📱 Responsive design for all devices
- ₹ INR currency support with GST calculation

Tech Stack

Frontend:
  - HTML5
  - CSS3 (Tailwind CSS)
  - Vanilla JavaScript
  - Font Awesome Icons
  - Local Storage for data persistence

Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/game-store.git
```

2. Open the project folder:
```bash
cd game-store
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve
```

Usage Guide


1. Shopping:
   - Add games to cart
   - Adjust quantities in cart
   - View total with 18% GST

2. Checkout Process:
   - Create an account/Login
   - Review cart
   - Fill payment details
   - Complete purchase

Features Explained

User Authentication
- Local storage based authentication
- User session management
- Secure checkout process

Shopping Cart
- Real-time cart updates
- Quantity adjustment
- Price calculation with GST
- Persistent cart data

Payment System
- Simulated payment processing
- Card detail validation
- Success/failure handling
- Order confirmation


 Future Enhancements

- [ ] Backend integration
- [ ] Real payment gateway
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Order history
- [ ] Search functionality

Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




Created by Dhiraj Monthri.
