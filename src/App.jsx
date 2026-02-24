import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/user/Home";
import BookDetails from "./pages/user/BookDetails";
import Wishlist from "./pages/user/Wishlist";
import Checkout from "./pages/user/Checkout";
import Ai from "./pages/user/Ai";
import Catalogue from "./pages/user/Catalogue";
import BookChatbot from "./pages/user/BookChatbot";
import Orders from "./pages/user/Orders";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBooksPage from "./pages/admin/AdminBooksPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminCategories from "./pages/admin/AdminCategories";


export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement; // c'est la balise <html>
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <BrowserRouter>
      <div>
        <Navbar
          onCartClick={() => setShowCart(true)}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <CartSidebar
          show={showCart}
          onClose={() => setShowCart(false)}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/:id/chat" element={<BookChatbot />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/ai" element={<Ai />} />

          <Route path="/login" element={<AdminLoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/messages" element={<AdminMessagesPage />} />
            <Route path="/admin/categorie" element={<AdminCategories />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

