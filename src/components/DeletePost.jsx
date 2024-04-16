"use client";
import prisma from "../../lib/prisma";

const DeletePost = ({ link }) => {
  const handleDelete = async () => {
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
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
      onClick={() => handleDelete(link)}
    >
      Delete
    </button>
  );
};

export default DeletePost;
