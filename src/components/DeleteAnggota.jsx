"use client";

const DeleteAnggota = ({ anggotaId, ekstraId }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/anggota", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: anggotaId,
          ekstraId: ekstraId,
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
      className="bg-red-500 text-white px-2 py-1 rounded "
      onClick={() => handleDelete()}
    >
      Hapus
    </button>
  );
};

export default DeleteAnggota;
