import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "../../../../../lib/prisma"


export async function POST(req) {
  try {
    const { nis, password } = await req.json()

  
    const existingUser = await prisma.user.findUnique({
      where: { nis },
    })

    if(!existingUser) return NextResponse.json({status: 404, message: "NIS tidak tersedia"})
    
    if (!existingUser.password) {
      const hash = await bcrypt.hash(password, 12)
      const updatedUser = await prisma.user.update({
        where: { nis },
        data: { password: hash },
      })

      return NextResponse.json({status: 200, message: "Akun berhasil dibuat", user: updatedUser})
    } else {
      return NextResponse.json(
        { status: 202, message: "Akun sudah pernah dibuat" }
      )
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 500 },
      )
    }
  }
}
