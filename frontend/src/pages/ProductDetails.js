import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Recommendations from "../components/Recommendations";
import EditForm from "../components/EditForm";

export default function ProductDetails({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);

  const refresh = () =>
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setData(res.data));

  useEffect(() => { refresh(); }, []);

  if (!data) return "Loading...";

  return (
    <div className="card shadow-lg p-4 border-0 rounded-4">
      <img src={`http://localhost:5000/${data.product.imageUrl}`} width="300" className="rounded mb-3" />

      <h2>{data.product.title}</h2>
      <p>{data.product.description}</p>
      <h4 className="text-success fw-bold">₹{data.product.price}</h4>

      <div className="d-flex gap-2 my-3">
        <button className="btn btn-warning" onClick={() => setEditing(!editing)}>✏️ Edit</button>

        <button className="btn btn-danger"
          onClick={async () => {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            showToast("Deleted!");
            setTimeout(() => navigate("/"), 1000);
          }}>
          🗑 Delete
        </button>
      </div>

      {editing && <EditForm product={data.product} onSave={refresh} showToast={showToast} />}

      <hr />

      <h5>Recommended</h5>
      <Recommendations items={data.recommendations} />
    </div>
  );
}
