"use client"

import { signUp, signIn, signOut, getCurrentUser, confirmSignUp } from "aws-amplify/auth"

export interface AuthResult {
  success?: boolean
  error?: string
  requiresConfirmation?: boolean
  user?: {
    email?: string
    userId?: string
    username?: string
  }
}

export async function registerUserWithAmplify(formData: FormData): Promise<AuthResult> {
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

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" }
  }

  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    })

    if (isSignUpComplete) {
      return { success: true }
    } else if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
      return { 
        success: true, 
        requiresConfirmation: true,
        user: { email, userId }
      }
    }

    return { error: "Sign up failed" }
  } catch (error: unknown) {
    console.error("Registration error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create user"
    return { error: errorMessage }
  }
}

export async function confirmUserSignUp(email: string, code: string): Promise<AuthResult> {
  try {
    const { isSignUpComplete } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    })

    if (isSignUpComplete) {
      return { success: true }
    } else {
      return { error: "Confirmation failed" }
    }
  } catch (error: unknown) {
    console.error("Confirmation error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to confirm sign up"
    return { error: errorMessage }
  }
}

export async function loginUserWithAmplify(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    })

    if (isSignedIn) {
      return { success: true }
    } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      return { 
        error: "Please confirm your account first. Check your email for the confirmation code.",
        requiresConfirmation: true,
        user: { email }
      }
    } else {
      return { error: "Sign in failed" }
    }
  } catch (error: unknown) {
    console.error("Login error:", error)
    const errorMessage = error instanceof Error ? error.message : "Invalid credentials"
    return { error: errorMessage }
  }
}

export async function logoutUserWithAmplify(): Promise<AuthResult> {
  try {
    await signOut()
    return { success: true }
  } catch (error: unknown) {
    console.error("Logout error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to sign out"
    return { error: errorMessage }
  }
}

export async function getCurrentUserWithAmplify(): Promise<AuthResult> {
  try {
    const user = await getCurrentUser()
    return { success: true, user: { username: user.username, userId: user.userId } }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "No user signed in"
    return { error: errorMessage }
  }
}
