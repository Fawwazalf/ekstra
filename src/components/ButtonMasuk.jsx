"use client";

import { useRouter } from "next/navigation";
import prisma from "../../lib/prisma";

const ButtonMasuk = ({ ekstraId, userId, sudahMasuk, nis }) => {
  const router = useRouter();
  const handleMasuk = async () => {
    try {
      const res = await fetch(`/api/anggota`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          ekstraId: ekstraId,
        }),
      });
      window.location.reload();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/anggota", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          ekstraId: ekstraId,
        }),
      });
      window.location.reload();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <button
      className={`  font-bold text-[14px] rounded-[5px] px-[40px] py-[15px] ${
        sudahMasuk.length > 0
          ? "text-[#FF0000] border border-[#FF0000] bg-transparent "
          : "text-[#FFFFFF] bg-[#96BB7C]"
      }`}
      onClick={
        nis < 22
          ? () => router.push("/beranda/" + ekstraId + "/dashboard")
          : sudahMasuk.length > 0
          ? () => handleDelete()
          : () => handleMasuk()
      }
    >
      {nis < 22 ? "Dashboard" : sudahMasuk.length > 0 ? "Keluar" : "Masuk"}
    </button>
  );
};

export default ButtonMasuk;
