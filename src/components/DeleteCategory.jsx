"use client";

import { useState } from "react";

const DeleteCategory = ({ id, ekstraLength }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    if (ekstraLength === 0) {
      try {
        const response = await fetch(`/api/category/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        window.location.reload();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Terjadi kesalahan:", error);
      }
    } else {
      setLoading(false);
      alert("Pastikan kategori tidak memiliki ekstra");
    }
  };

  return (
    <button
      disabled={loading}
      className="bg-red-500 text-white px-2 py-1 rounded"
      onClick={() => handleDelete()}
    >
      Hapus
    </button>
  );
};

export default DeleteCategory;
