import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";



export const POST = async (req)=>{
  try {
    const { link, ekstraId, desc } = await req.json();

    
    const newPost = await prisma.post.create({
      data: {
        link:link,
        ekstraId:ekstraId,
desc: desc
      },
    });

    return NextResponse.json({ status: 200, message: "Postingan berhasil ditambahkan", postingan: newPost });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ status: "error", message: error.message, });
  }
}


export const DELETE = async (req)=>{ try {
  const { link } = await req.json();

  const deletedPost = await prisma.post.deleteMany({
    where: {
      link: link,
    },
  });

  return NextResponse.json({ status: 200, message: "Postingan berhasil dihapus", deletedPost });
} catch (error) {
  console.error("Terjadi kesalahan:", error);
  return NextResponse.json({ status: "error", message: "Terjadi kesalahan saat menghapus postingan" });
}}


export const GET = async (req)=>{
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json({ status: 200, postingan: posts });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ status: "error", message: error.message, });
  }
}
