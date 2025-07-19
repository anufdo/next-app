"use server"

import { createUser, getUserByEmail } from "@/lib/auth-utils"
import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validation
  if (!email || !password || !name) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long" }
  }

  // Check if user exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: "User with this email already exists" }
  }

  try {
    await createUser(email, password, name)
    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Failed to create user" }
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    
    if (result?.error) {
      return { error: "Invalid credentials" }
    }
    
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "Something went wrong" }
      }
    }
    throw error
  }
}
