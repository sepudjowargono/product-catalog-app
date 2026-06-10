# 🛍️ Ecommerce Web Product Catalog Shopping Cart App

## 📖 Overview

This project is a React-based E-Commerce application built using Firebase Authentication, Cloud Firestore, Redux Toolkit, React Query, and TypeScript.

Users can create accounts, log in securely, browse products, manage a shopping cart, place orders, and view previous order history.

Products, users, and orders are stored in Firestore, allowing full Create, Read, Update, and Delete (CRUD) functionality throughout the application.

The shopping cart is managed using Redux Toolkit and persisted using `sessionStorage` to maintain cart data during the browser session.

---

## ✨ Features

### 🛒 Product Catalog

- Displays a list of products from Firestore
- Shows each product's:
  - 🏷️ Title
  - 💲 Price
  - 📂 Category
  - 📝 Description
  - ⭐ Rating
  - 🖼️ Image
- Includes an **Add to Cart** button for each product

#

### 🔎 Dynamic Category Filter

- Uses React Query to retrieve product data from Firestore
- Categories are dynamically generated from the product collection
- The dropdown is dynamically generated and is not hard coded
- Users can filter products by category
- Selecting a category updates the displayed products

#

### 🧺 Shopping Cart

- Users can decrease product quantity from the cart, or remove products from the cart
- If a product quantity reaches zero, the item is automatically removed from the cart
- If the same product is added more than once, the quantity increases
- Cart displays:
  - 🏷️ Product title
  - 🖼️ Product image
  - 🔢 Quantity
  - 💲 Price
- Users can remove products from the cart

#

### 🔐 User Authentication

- Register new accounts using Firebase Authentication
- Login using email and password
- Logout functionality
- Authentication state persists across refreshes
- Protected application routes for authenticated users

#

### 👤 User Profile Management

Users can:

- View profile information
- Update username and address
- Store profile information in Firestore
- Delete their account and associated Firestore profile

#

### ⚙️ Product Management

Products are stored in Firestore instead of the FakeStore API.

Users can:

- ➕ Create products
- 👀 View products
- ✏️ Update products
- 🗑️ Delete products

All changes are immediately reflected in Firestore.

#

### 📦 Order Management

During checkout:

- Orders are stored in Firestore
- Order information includes:
  - User ID
  - Products purchased
  - Quantities
  - Total order price
  - Date created

#

### 📜 Order History

Users can:

- View previous orders
- View order IDs
- View order creation dates
- View total order prices
- Expand orders to view purchased products

### 📊 Cart Totals

The cart automatically calculates and displays:

- 🛍️ Total number of products
- 💰 Total cart price

#

### ✅ Checkout

- Checkout clears the cart from Redux state
- Checkout also clears the cart from `sessionStorage`
- A success message appears after checkout

#

### 🖼️ Image Fallback

If a product image fails to load, the application displays a placeholder image to maintain a consistent user experience. This app includes image fallback handling so a placeholder image appears if the original product image is unavailable.

#

### 🎨 Styling

- Modern beige and brown colour scheme
- Responsive product grid
- Sticky navigation bar
- Styled product cards and shopping cart section
- Hover effects for buttons and cards

---

## 🛠️ Technologies Used

- ⚛️ React
- 📘 TypeScript
- 🔥 Firebase Authentication
- 🔥 Cloud Firestore
- 🧰 Redux Toolkit
- 🔄 React Redux
- ⚡ TanStack React Query
- 🧭 React Router DOM
- 🎨 CSS
- 💾 sessionStorage

---

## 🔥 Firebase Services Used

### Firebase Authentication

Used for:

- User Registration
- User Login
- User Logout
- Authentication State Management

### Cloud Firestore

Used for storing:

- Users
- Products
- Orders

---

## 📡 Firestore Collections Used

### `users`

Stores registered user profile data, including username, email, and address.

### `products`

Stores product data used for the product catalog and product management CRUD operations.

### `orders`

Stores completed checkout orders, including user ID, purchased products, quantities, total price, and date created.

---

## 📁 Project Structure

```txt
src/
  cart/
    cartSlice.ts

  components/
    Logout.tsx
    Navbar.tsx
    ShoppingCart.tsx

  pages/
    Home.tsx
    Login.tsx
    OrderHistory.tsx
    ProductManager.tsx
    Profile.tsx
    Register.tsx

  redux/
    store.ts

  services/
    orderService.ts
    productService.ts
    userService.ts

  types/
    Order.ts
    Product.ts
    UserProfile.ts

  App.css
  App.tsx
  firebaseConfig.ts
  main.tsx
```

---

## 📄 File Descriptions

### ⚙️ `main.tsx`

Wraps the application with:

- Redux `Provider`
- React Query `QueryClientProvider`

This allows the entire app to access Redux state and React Query functionality.

#

### 🧠 `store.ts`

Configures the Redux store and connects the cart reducer.

It also exports:

```ts
RootState;
AppDispatch;
```

These are used for TypeScript support with `useSelector` and `useDispatch`.

#

### 🛍️ `cartSlice.ts`

Handles all cart-related Redux logic.

Includes reducers for:

- ➕ Adding products to the cart
- ➖ Removing products from the cart
- 🧹 Clearing the cart during checkout

It also includes `sessionStorage` logic to save, load, and clear cart data.

#

### 🏠 `Home.tsx`

Displays the main product catalog.

#### Responsibilities:

- Fetch all products
- Generate categories dynamically from Firestore product data
- Filter products by selected category
- Display product information
- Add products to the cart

#

### 🛒 `ShoppingCart.tsx`

Displays the shopping cart.

#### Responsibilities:

- Read cart data from Redux
- Display cart items
- Remove products from the cart
- Calculate total products
- Calculate total price
- Handle checkout

#

### 🧭 `Navbar.tsx`

Displays the navigation bar.

#### Responsibilities:

- Show app title/logo
- Provide navigation links
- Display current cart item count

#

### 🔐 `Login.tsx`

Handles user authentication using Firebase Authentication.

#### Responsibilities:

- User login
- Authentication validation
- Redirect authenticated users

#

### 📝 `Register.tsx`

Allows new users to create accounts.

#### Responsibilities:

- User registration
- Firebase Authentication account creation
- Firestore user profile creation

#

### 👤 `Profile.tsx`

Allows users to manage profile information.

#### Responsibilities:

- View user profile
- Update profile information
- Delete account

#

### ⚙️ `ProductManager.tsx`

Handles Firestore product CRUD operations.

#### Responsibilities:

- Create products
- Read products
- Update products
- Delete products

#

### 📦 `OrderHistory.tsx`

Displays previous user orders.

#### Responsibilities:

- Retrieve user orders from Firestore
- Display order IDs
- Display order dates
- Display order totals
- Display purchased products

#

### 🔥 `firebaseConfig.ts`

Configures Firebase Authentication and Firestore connections.

#

### 🎨 `App.css`

Contains the styling for the full application.

#### Includes:

- Navbar styling
- Login and Register page styling
- Profile page styling
- Product catalog layout
- Product Manager page styling
- Product cards
- Shopping cart styling
- Order History page styling
- Responsive design
- Button hover effects
- Beige and brown colour theme

---

## 🚀 Installation and Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sepudjowargono/product-catalog-app.git
```

#

### 2️⃣ Navigate Into the Project Folder

```bash
cd ecommerce-web-app
```

#

### 3️⃣ Install Dependencies

```bash
npm install
```

#

### 4️⃣ Firebase Configuration

Create a Firebase project and enable:

- Authentication
- Cloud Firestore

Create the following Firestore collections:

```bash
users
products
orders
```

Add your Firebase credentials to:

```bash
firebaseConfig.ts
```

Example:

```bash
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
};
```

#

### 5️⃣ Start the Development Server

```bash
npm run dev
```

#

### 6️⃣ Open the App in the Browser

After running the development server, open the local host URL shown in your terminal.

Example:

```txt
http://localhost:5173
```

---

## 📦 Required Dependencies

If dependencies need to be installed manually, use:

```bash
npm install firebase react-router-dom @reduxjs/toolkit react-redux @tanstack/react-query
```

---

## 📱 How to Use the App

### 👀 View Products

When the app loads, all products are displayed on the home page.

#

### 🔎 Filter by Category

Use the dropdown menu to select a category.

The product list will update based on the selected category.

#

### ➕ Add to Cart

Click the **Add to Cart** button on any product card.

The item will be added to the shopping cart.

If the item already exists in the cart, the quantity will increase.

#

### ➖ Remove from Cart

Click the **Remove** button beside a cart item to decrease its quantity.

If the quantity reaches zero, the item is automatically removed from the cart.

#

### ✅ Checkout

Click the **Checkout** button to complete the simulated purchase.

This clears:

- Redux cart state
- `sessionStorage`

A success message will display after checkout.

### 🔐 Register and Login

Create a new account using the Register page.

After successful registration, a user profile is automatically created in Firestore.

#

### 👤 Manage Profile

Navigate to the Profile page to:

- View profile information
- Update username
- Update address
- Delete your account

#

### ⚙️ Manage Products

Navigate to the Product Manager page to:

- Create products
- Edit products
- Delete products

All changes are stored in Firestore.

#

### 📦 View Order History

Navigate to the Order History page to:

- View previous orders
- View order totals
- View order dates
- View purchased products

---

## 🧠 State Management

### ⚡ React Query

React Query is used for API/server data, including:

- Products
- Product Management
- Firestore Data Refreshing

React Query handles:

- Fetching
- Loading states
- Error states
- Caching
- Refetching

#

### 🧰 Redux Toolkit

Redux Toolkit is used for shopping cart state.

The cart state includes:

- Product information
- Quantity of each item
- Add/remove/clear cart actions

#

### 💾 sessionStorage

The cart is saved in `sessionStorage`.

This allows the cart to remain available during the browser session, even if the page is refreshed.

---

## ⚠️ Error Handling

The app includes error handling for:

- Firebase Authentication errors
- Firestore product operations
- Firestore user operations
- Firestore order operations
- Failed image loading
- `sessionStorage` loading and saving issues

---

## 🖼️ Image Fallback Handling

If a product image fails to load, the app replaces it with a placeholder image.

Example:

```tsx
onError={(e) => {
  e.currentTarget.src = PLACEHOLDER_IMAGE;
}}
```

This prevents broken images from appearing in the UI.

---

## 🔮 Future Improvements

Possible future updates could include:

- 👥 User Roles (Admin vs Customer)
- 🔍 Product Search
- ❤️ Wishlist Functionality
- 🖼️ Product Details Pages
- 📧 Email Order Confirmations
- 📱 Additional Mobile Optimization
- 🔔 Toast Notifications
- 💳 Payment Gateway Integration

---

## 👨‍💻 Author

Stephana Pudjowargono
