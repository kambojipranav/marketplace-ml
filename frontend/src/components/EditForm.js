import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditForm({ product, onSave, showToast }) {
  const [form, setForm] = useState(product);
  const navigate = useNavigate();

  const saveChanges = async () => {
    await axios.put(`http://localhost:5000/api/products/${product._id}`, {
      ...form,
      tags: JSON.stringify(form.tags)
    });

    onSave();
    showToast("Updated!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="card p-3 shadow mt-3">
      <h5>Edit Product</h5>

      <input className="form-control mb-2" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />

      <textarea className="form-control mb-2" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

      <input type="number" className="form-control mb-2" value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <input className="form-control mb-2" value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })} />

      <input className="form-control mb-2"
        value={form.tags.join(",")}
        onChange={(e) => setForm({ ...form, tags: e.target.value.split(",") })} />

      <button className="btn btn-success" onClick={saveChanges}>Save</button>
    </div>
  );
}
