import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import prisma from './prisma'

export const authOptions ={
session:{
  strategy: "jwt"
},
pages:{
  signIn: '/masuk',
},
providers:[
Credentials({
  credentials:{
    nis:{
      label: "NIS",
      type:"text",
      placeholder:"224118603"
    },
    password:{
      label: "Password",
      type:"password",
    }
  },
  async authorize(credentials) {
    if (!credentials.nis || !credentials.password) return null

    const user = await prisma.user.findUnique({where: {nis: credentials.nis}})
    if (!user) return null

    const decode = await bcrypt.compare(credentials.password, user.password)
    if(!decode) return null

    return {nis: user.nis, id: user.id}
  },
}),
],
callbacks:{
  jwt({token, user}){
    if (!user) return token
    return {
      ...token,
      id: user.id
    }
  },
  session({session, token}){
    return {
      ...session,
      id: token.id,
    
    }
  }
}
}