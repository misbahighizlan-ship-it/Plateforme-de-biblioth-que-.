import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

import Home from "./pages/user/Home";
import BookDetails from "./pages/user/BookDetails";
import Wishlist from "./pages/user/Wishlist";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBooksPage from "./pages/admin/AdminBooksPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminCategories from "./pages/admin/AdminCategories";

export default function App() {
  // ✅ HERE is the missing part
  const [showCart, setShowCart] = useState(false);

  return (
    <BrowserRouter>
      
      {/* Navbar */}
      <Navbar onCartClick={() => setShowCart(true)} />

      {/* Cart Sidebar */}
      <CartSidebar
        show={showCart}
        onClose={() => setShowCart(false)}
      />

      <Routes>
        {/* User */}
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />


        {/* Admin */}
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/books" element={<AdminBooksPage />} />
        <Route path="/admin/messages" element={<AdminMessagesPage />} />
        <Route path="/admin/categorie" element={<AdminCategories />} />
      </Routes>
    </BrowserRouter>
  );
}
