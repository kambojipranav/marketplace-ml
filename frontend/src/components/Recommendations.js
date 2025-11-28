export default function Recommendations({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-muted">No recommendations available.</p>;
  }

  return (
    <div className="row g-3 mt-3">
      {items.map(p => (
        <div className="col-6 col-md-3" key={p._id}>
          <div className="card p-2 shadow-sm border-0 rounded-4">
            <img
              src={`http://localhost:5000/${p.imageUrl}`}
              className="rounded"
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
              alt="recommended item"
            />

            <p className="fw-semibold mt-2">{p.title}</p>
            <small className="text-secondary">
              🔍 Match Score: {p.similarity.toFixed(2)}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
