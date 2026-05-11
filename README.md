# 🛍️ Ecommerce Web Product Catalog Shopping Cart App

## 📖 Overview

This project is a React-based product catalog and shopping cart application. The app uses the FakeStore API to display products, filter products by category, and allow users to add items to a shopping cart.

The shopping cart is managed using Redux Toolkit and is saved in `sessionStorage` so the cart data stays available while the browser session is active.

---

## ✨ Features

### 🛒 Product Catalog

- Displays a list of products from the FakeStore API
- Shows each product's:
  - 🏷️ Title
  - 💲 Price
  - 📂 Category
  - 📝 Description
  - ⭐ Rating
  - 🖼️ Image
- Includes an **Add to Cart** button for each product

---

### 🔎 Dynamic Category Filter

- Uses React Query to fetch product categories from the API
- The dropdown is dynamically generated and is not hard coded
- Users can filter products by category
- Selecting a category updates the displayed products

---

### 🧺 Shopping Cart

- Users can add products to the shopping cart
- If the same product is added more than once, the quantity increases
- Cart displays:
  - 🏷️ Product title
  - 🖼️ Product image
  - 🔢 Quantity
  - 💲 Price
- Users can remove products from the cart

---

### 📊 Cart Totals

The cart automatically calculates and displays:

- 🛍️ Total number of products
- 💰 Total cart price

---

### ✅ Checkout

- Checkout clears the cart from Redux state
- Checkout also clears the cart from `sessionStorage`
- A success message appears after checkout

---

### 🖼️ Image Fallback

Some FakeStore API images may fail to load. This app includes image fallback handling so a placeholder image appears if the original product image is unavailable.

---

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
- 🧰 Redux Toolkit
- 🔄 React Redux
- ⚡ TanStack React Query
- 🛒 FakeStore API
- 🎨 CSS
- 💾 sessionStorage

---

## 🌐 API Used

This project uses the FakeStore API:

```txt
https://fakestoreapi.com
```

## 📡 Endpoints Used

### Fetch all products

```txt
GET https://fakestoreapi.com/products
```

### Fetch all categories

```txt
GET https://fakestoreapi.com/products/categories
```

### Fetch products by category

```txt
GET https://fakestoreapi.com/products/category/{category}
```

---

# 📁 Project Structure

```txt
src/
  cart/
    cartSlice.ts

  components/
    Home.tsx
    Navbar.tsx
    ShoppingCart.tsx

  redux/
    store.ts

  components/
    Home.tsx
    Navbar.tsx
    ShoppingCart.tsx

  App.css
  App.tsx
  main.tsx
```

---

## 📄 File Descriptions

### ⚙️ `main.tsx`

Wraps the application with:

- Redux `Provider`
- React Query `QueryClientProvider`

This allows the entire app to access Redux state and React Query functionality.

---

### 🧠 `store.ts`

Configures the Redux store and connects the cart reducer.

It also exports:

```ts
RootState
AppDispatch
```

These are used for TypeScript support with `useSelector` and `useDispatch`.

---

### 🛍️ `cartSlice.ts`

Handles all cart-related Redux logic.

Includes reducers for:

- ➕ Adding products to the cart
- ➖ Removing products from the cart
- 🧹 Clearing the cart during checkout

It also includes `sessionStorage` logic to save, load, and clear cart data.

---

### 🏠 `Home.tsx`

Displays the main product catalog.

#### Responsibilities:

- Fetch all products
- Fetch categories
- Filter products by selected category
- Display product information
- Add products to the cart

---

### 🛒 `ShoppingCart.tsx`

Displays the shopping cart.

#### Responsibilities:

- Read cart data from Redux
- Display cart items
- Remove products from the cart
- Calculate total products
- Calculate total price
- Handle checkout

---

### 🧭 `Navbar.tsx`

Displays the navigation bar.

#### Responsibilities:

- Show app title/logo
- Provide navigation links
- Display current cart item count

---

### 🎨 `App.css`

Contains the styling for the full application.

#### Includes:

- Navbar styling
- Product grid layout
- Product cards
- Shopping cart styling
- Responsive design
- Button hover effects

---

## 🚀 Installation and Setup

### 1️⃣ Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

### 2️⃣ Navigate Into the Project Folder

```bash
cd ecommerce-web-app
```

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Start the Development Server

```bash
npm run dev
```

---

### 5️⃣ Open the App in the Browser

After running the development server, open the local host URL shown in your terminal.

Example:

```txt
http://localhost:5173
```

---

## 📦 Required Dependencies

If dependencies need to be installed manually, use:

```bash
npm install @reduxjs/toolkit react-redux @tanstack/react-query
```

---

## 📱 How to Use the App

### 👀 View Products

When the app loads, all products are displayed on the home page.

---

### 🔎 Filter by Category

Use the dropdown menu to select a category.

The product list will update based on the selected category.

---

### ➕ Add to Cart

Click the **Add to Cart** button on any product card.

The item will be added to the shopping cart.

If the item already exists in the cart, the quantity will increase.

---

### ➖ Remove from Cart

Click the **Remove** button beside a cart item to remove it from the cart.

---

### ✅ Checkout

Click the **Checkout** button to complete the simulated purchase.

This clears:

- Redux cart state
- `sessionStorage`

A success message will display after checkout.

---

# 🔮 Future Improvements

Possible future updates could include:

- 🔢 Add quantity increase/decrease buttons
- 📄 Add a product details page
- 🔍 Add search functionality
- 🔐 Add login/authentication
- 🧾 Add order confirmation page
- 💾 Add localStorage option for longer cart persistence
- 📱 Improve mobile layout further
- ✨ Add animations or toast notifications

---

# 👨‍💻 Author

Stephana Pudjowargono
