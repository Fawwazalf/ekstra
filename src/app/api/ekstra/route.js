import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


export const POST = async (req)=>{
    try {
      const {  name,image,desc,location,category,day,pembimbing} = await req.json();
  
      const createdEkstra = await prisma.ekstra.create({
        data: {
          name:name,
          desc: desc,
          image:image,
          categoryId:category ,
          location: location,
          hari: day,
          pembimbing: pembimbing,
        },
      });
  
      return NextResponse.json({ status: 200, message: "berhasil", ekstra: createdEkstra });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      return NextResponse.json({ status: "error", message: error.message, });
    }
  }