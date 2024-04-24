"use client";

import { useState } from "react";

const DeleteUser = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${userId}`, {
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

export default DeleteUser;
