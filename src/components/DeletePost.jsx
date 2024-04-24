"use client";

import { useState } from "react";

const DeletePost = ({ link }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: link,
        }),
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
      onClick={() => handleDelete(link)}
    >
      Hapus
    </button>
  );
};

export default DeletePost;
