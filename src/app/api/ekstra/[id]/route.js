import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const PATCH = async (req, {params})=>{
    try {
      const {  newCategory,newImage,newDesc,newLocation,newDay,newPembimbing} = await req.json();
  
      const updatedEkstra = await prisma.ekstra.update({
        where: { id: parseInt(params.id) },
        data: {
          image:newImage,
          desc: newDesc,
          categoryId:newCategory ,
          location: newLocation,
          hari: newDay,
          pembimbing: newPembimbing,
        },
      });
  
      return NextResponse.json({ status: 200, message: "berhasil", update: updatedEkstra });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      return NextResponse.json({ status: "error", message: error.message, });
    }
  }
export const DELETE = async (req, {params}) =>{
    try {
       
      await prisma.anggota.deleteMany({
        where: { ekstraId: parseInt(params.id) },
      });
      await prisma.post.deleteMany({
        where: { ekstraId: parseInt(params.id) },
      });
        const DeletedEkstra = await prisma.ekstra.delete({
          where: { id: parseInt(params.id) },
        });


        return NextResponse.json({ status: 200, message: "berhasil", delete: DeletedEkstra });
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        return NextResponse.json({ status: "error", message: error.message, });
      }
}
