import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadForm({ showToast }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) =>
      data.append(key, key === "tags" ? JSON.stringify(value.split(",")) : value)
    );

    data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", data);

      showToast("🎉 Product Added Successfully!");

      // redirect after small delay for better UX
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      showToast("❌ Error adding product.");
    }

    setLoading(false);
  };

  return (
    <div className="card shadow-lg p-4 border-0 rounded-4 mx-auto" style={{ maxWidth: "550px" }}>
      <h3 className="fw-bold mb-4 text-center">Upload Product</h3>

      <form className="d-flex flex-column gap-3" onSubmit={submit}>
        <input
          className="form-control"
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="form-control"
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>

        <input
          className="form-control"
          type="number"
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          className="form-control"
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          className="form-control"
          placeholder="Tags (comma separated)"
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          required
        />

        <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} required />

        <button
          type="submit"
          className="btn btn-primary fw-bold rounded-pill"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
