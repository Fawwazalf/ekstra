import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

  export const PATCH = async (req, {params}) =>{
    try {
        const { name} = await req.json();

        const updatedCategory = await prisma.category.update({
          where: { id: parseInt(params.id) },
          data: {
            name:name
          },
        });
    
        return NextResponse.json({ status: 200, message: "berhasil", update: updatedCategory });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ status: "error", message: error.message, });
      }
}

export const DELETE = async ( req,{params}) =>{
    try {
       
        const DeletedCategory = await prisma.category.delete({
          where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ status: 200, message: "berhasil", deleted: DeletedCategory });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ status: "error", message: error.message, });
      }
}