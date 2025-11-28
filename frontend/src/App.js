import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import UploadForm from "./components/UploadForm";
import ToastMessage from "./components/ToastMessage";

export default function App() {
  const [toast, setToast] = useState(null);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">🛍 Marketplace</Link>

          <Link to="/upload" className="btn btn-light fw-bold">+ Add Product</Link>
        </div>
      </nav>

      <div className="container pb-5">
        <Routes>
          <Route path="/" element={<Home showToast={setToast} />} />
          <Route path="/product/:id" element={<ProductDetails showToast={setToast} />} />
          <Route path="/upload" element={<UploadForm showToast={setToast} />} />
        </Routes>
      </div>

      {toast && <ToastMessage message={toast} onClose={() => setToast(null)} />}
    </BrowserRouter>
  );
}
