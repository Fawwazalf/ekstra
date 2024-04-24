import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const POST = async (req) =>{
    try {
        const {name} = await req.json();
        const existingCategory = await prisma.category.findUnique({
          where: { name},
        })
    
        if(existingCategory) return NextResponse.json({status: 404, message: "Kategori sudah ada"})

        const createdCategory = await prisma.category.create({
          data: {
           name:name,}
        });
    
        return NextResponse.json({ status: 200, message: "berhasil", category: createdCategory });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ status: "error", message: error.message, });
      }
}