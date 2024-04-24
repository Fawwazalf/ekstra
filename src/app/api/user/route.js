import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const POST = async (req) =>{
    try {
        const {  nis ,nisn,fullname,gender,kelas,jurusan} = await req.json();
        const existingNIS = await prisma.user.findUnique({
          where: { nis:nis},
        })
        const existingNISN = await prisma.user.findUnique({
          where: { nisn:nisn},
        })
        if(existingNIS || existingNISN) return NextResponse.json({status: 404, message: "NIS/NISN sudah ada"})

        if (!nis || !nisn || !fullname || !gender || !kelas || !jurusan) {
  return NextResponse.json({ status: 404, message: "Semua data harus diisi" });
}
        const CreatedUser = await prisma.user.create({
          data: {
            nis:nis,
            nisn: nisn,
            fullname: fullname,
            gender: gender,
            kelas: kelas,
            jurusan:jurusan
          },
        });
    
        return NextResponse.json({ status: 200, message: "berhasil", user: CreatedUser });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ status: "error", message: error.message, });
      }
}