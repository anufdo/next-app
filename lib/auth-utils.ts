import { PrismaClient } from "@prisma/client"
import { hashPassword as cryptoHashPassword, verifyPassword as cryptoVerifyPassword } from "./crypto"

const prisma = new PrismaClient()

export async function hashPassword(password: string): Promise<string> {
  return cryptoHashPassword(password)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return cryptoVerifyPassword(password, hashedPassword)
}

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hashPassword(password)
  
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}
