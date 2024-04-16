import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";



export const POST = async (req)=>{
  try {
    const { userId, ekstraId } = await req.json();

    const existingAnggota = await prisma.anggota.findMany({
      where: {
        userId: userId,
        ekstraId: ekstraId,
      },
    });

    if (existingAnggota.length > 0) {
      return NextResponse.json({ status: 409, message: "Anggota sudah ada" });
    }

    const newAnggota = await prisma.anggota.create({
      data: {
        userId:userId,
        ekstraId:ekstraId,
      },
    });

    return NextResponse.json({ status: 200, message: "Anggota berhasil ditambahkan", anggota: newAnggota });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ status: "erro", message: error.message, });
  }
}


export const DELETE = async (req)=>{ try {
  const { ekstraId, userId } = await req.json();

  const deletedAnggota = await prisma.anggota.deleteMany({
    where: {
      ekstraId: ekstraId,
      userId: userId,
    },
  });

  return NextResponse.json({ status: 200, message: "Anggota berhasil dihapus", deletedAnggota });
} catch (error) {
  console.error("Terjadi kesalahan:", error);
  return NextResponse.json({ status: "error", message: "Terjadi kesalahan saat menghapus anggota" });
}}

export const config = {
  api: {
    bodyParser: false,
  },
};