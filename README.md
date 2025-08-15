🛍️ ShopEasy - MERN E-Commerce PlatformAn end-to-end full-stack E-Commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It features a seamless user shopping experience, including product browsing, cart management, and payments, along with a comprehensive admin dashboard for managing products, orders, and users.
🌐 Live DemoYou can view the live application here: https://shoppingwebsite-17.onrender.com/✨ 
Features
👤 User SideAuthentication: Secure user SignUp & Login with JSON Web Tokens (JWT).Product Browsing: View and search for products with details.Shopping Cart: Add, remove, and update products in the cart.Secure Checkout: Integrated payment processing to place orders.Order History: View personal order history and status.🛠️ Admin PanelAdmin Dashboard: A central hub for managing the e-commerce store.Product Management: Add, update, and delete products from the inventory.Order Management: View and manage all customer orders.User Management: View a list of all registered users.🔑 Admin AccessYou can use the following credentials to log in as an administrator and test the admin panel features.Email: a.yadav7088@gmail.comPassword: 1234567890🛠️ Tech Stack & Libraries🚧 FrontendReact.js – A JavaScript library for building user interfaces.Vite – Next-generation frontend tooling for a faster development experience.React Router DOM – For client-side routing and navigation.Axios – For making asynchronous HTTP requests to the backend API.TailwindCSS – For styling components.🧩 BackendNode.js – JavaScript runtime environment.Express.js – Web application framework for Node.js.Mongoose – Elegant MongoDB object modeling for Node.js.jsonwebtoken (JWT) – For implementing token-based authentication.bcrypt.js – For hashing user passwords securely.dotenv – To manage and load environment variables.☁️ Deployment & DatabaseRender – Hosting for both frontend and backend services.MongoDB Atlas – Cloud-hosted MongoDB service.🚀 Getting Started LocallyFollow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.📦 Backend Setup# 1. Navigate to the backend directory
cd backend

# 2. Install NPM packages
npm install

# 3. Create a .env file in the backend root
#    and add your variables (e.g., MONGO_URI, JWT_SECRET)
touch .env

# 4. Start the development server
npm run dev
💻 Frontend Setup# 1. Navigate to the frontend directory
cd Frontend1

# 2. Install NPM packages
npm install

# 3. Create a .env file in the frontend root
#    and set the backend URL
#    Example: VITE_BACKEND_URL=http://localhost:4000
touch .env

# 4. Start the development server
npm run dev
📂 Folder StructureHere is the high-level structure of the ShopEasy project:/
├── backend/
│   ├── config/
│   ├── controller/
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   ├── modals/
│   ├── route/
│   ├── utils/
│   ├── .env
│   └── index.js
│
└── Frontend1/
    ├── public/
    └── src/
        ├── Admin/
        ├── assets/
        ├── cart/
        ├── components/
        ├── features/
        ├── Orders/
        ├── pages/
        ├── User/
        ├── App.jsx
        └── main.jsx


