import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

  export const PATCH = async (req, {params}) =>{
    try {
        const {  nis ,nisn,fullname,gender,kelas,jurusan} = await req.json();
    
        const updatedUser = await prisma.user.update({
          where: { id: parseInt(params.id) },
          data: {
            nis:nis,
            nisn: nisn,
            fullname: fullname,
            gender: gender,
            kelas: kelas,
            jurusan:jurusan
          },
        });
    
        return NextResponse.json({ status: 200, message: "berhasil", update: updatedUser });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ status: "error", message: error.message, });
      }
}

export const DELETE = async (req, {params}) =>{
    try {
       
    
        const DeletedUser = await prisma.user.delete({
          where: { id: parseInt(params.id) },
          
        });
    
        return NextResponse.json({ status: 200, message: "berhasil", deleted: DeletedUser });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ status: "error", message: error.message, });
      }
}