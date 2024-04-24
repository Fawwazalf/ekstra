"use client";

import { useRouter } from "next/navigation";
import prisma from "../../lib/prisma";
import { useState } from "react";

const ButtonMasuk = ({ ekstraId, userId, sudahMasuk, nis, ekstras }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleMasuk = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <button
      disabled={loading}
      className={`  font-bold text-[14px] rounded-[5px] px-[40px] py-[15px] ${
        sudahMasuk.length > 0
          ? "text-[#FF0000] border border-[#FF0000] bg-transparent "
          : "text-[#FFFFFF] bg-[#96BB7C]"
      }`}
      onClick={() => {
        if (parseInt(nis) <= ekstras.length || nis === "admin") {
          router.push("/beranda/" + ekstraId + "/dashboard");
        } else {
          sudahMasuk.length > 0 ? handleDelete() : handleMasuk();
        }
      }}
    >
      {(() => {
        if (parseInt(nis) <= ekstras.length || nis === "admin") {
          return "Dashboard";
        } else {
          return sudahMasuk.length > 0 ? "Keluar" : "Masuk";
        }
      })()}
    </button>
  );
};

export default ButtonMasuk;
