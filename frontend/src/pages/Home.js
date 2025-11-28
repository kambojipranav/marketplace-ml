import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // store original list
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  // Load all products once
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then(res => {
      setProducts(res.data);
      setAllProducts(res.data);
    });
  }, []);

  // Dynamic live search suggestions
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (search.trim()) {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${search}`);
        setSuggestions(res.data);
      } else {
        setSuggestions([]);
        setProducts(allProducts);
        setSearched(false);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [search, allProducts]);

  // When user clicks Search button
  const handleSearchClick = async () => {
    if (!search.trim()) {
      // Reset to full list if search empty
      setProducts(allProducts);
      setSearched(false);
      return;
    }

    const res = await axios.get(`http://localhost:5000/api/products/search?q=${search}`);
    setProducts(res.data);
    setSearched(true);
    setSuggestions([]);
  };

  return (
    <>
      {/* Search bar */}
      <div className="position-relative mb-4">
        <div className="input-group">
          <input
            className="form-control p-3 rounded-start-pill"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn btn-primary rounded-end-pill fw-bold" onClick={handleSearchClick}>
            🔍 Search
          </button>
        </div>

        {/* Live Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow mt-2" style={{ zIndex: 10 }}>
            {suggestions.map(s => (
              <li
                key={s._id}
                className="list-group-item list-group-item-action"
                onClick={() => navigate(`/product/${s._id}`)}
                style={{ cursor: "pointer" }}
              >
                {s.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2 className="text-center fw-bold mb-4">Products</h2>

      {/* If search performed and no matches */}
      {searched && products.length === 0 && (
        <p className="text-center text-danger fw-bold">❌ No products found</p>
      )}

      {/* Product Grid */}
      <div className="row g-4">
        {products.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </>
  );
}
