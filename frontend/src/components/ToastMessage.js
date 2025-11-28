import { useEffect } from "react";

export default function ToastMessage({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="toast show position-fixed bottom-0 end-0 m-4 shadow-lg bg-dark text-white">
      <div className="toast-body fw-semibold">{message}</div>
    </div>
  );
}
