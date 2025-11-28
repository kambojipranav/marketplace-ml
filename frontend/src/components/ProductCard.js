import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card shadow border-0 rounded-4">
      <img
        src={`http://localhost:5000/${product.imageUrl}`}
        className="card-img-top rounded-top"
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body text-center">
        <h5 className="fw-bold">{product.title}</h5>
        <p className="text-primary fw-semibold">₹{product.price}</p>

        <Link to={`/product/${product._id}`} className="btn btn-outline-primary rounded-pill">
          View Details
        </Link>
      </div>
    </div>
  );
}
