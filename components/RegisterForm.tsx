"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { registerUserWithAmplify, confirmUserSignUp } from "@/lib/actions/amplify-auth"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterForm({ email: initialEmail }: { email?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(!!initialEmail)
  const [userEmail, setUserEmail] = useState(initialEmail || "")
  const router = useRouter()

  useEffect(() => {
    if (initialEmail) {
      setShowConfirmation(true)
      setUserEmail(initialEmail)
    }
  }, [initialEmail])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")
    setSuccess(false)
    
    const result = await registerUserWithAmplify(formData)
    
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      if (result.requiresConfirmation) {
        setUserEmail(result.user?.email || "")
        setShowConfirmation(true)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    }
    
    setIsLoading(false)
  }

  async function handleConfirmation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    
    const formData = new FormData(event.currentTarget)
    const confirmationCode = formData.get("confirmationCode") as string
    
    if (!confirmationCode) {
      setError("Please enter the confirmation code")
      setIsLoading(false)
      return
    }
    
    const result = await confirmUserSignUp(userEmail, confirmationCode)
    
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
    
    setIsLoading(false)
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto p-6">
        <div className="text-center space-y-4">
          <div className="text-green-600 text-2xl">✓</div>
          <h1 className="text-2xl font-bold">Registration Successful!</h1>
          <p className="text-muted-foreground">
            Your account has been created and confirmed. Redirecting to login...
          </p>
        </div>
      </Card>
    )
  }

  if (showConfirmation) {
    return (
      <Card className="w-full max-w-md mx-auto p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Confirm Your Email</h1>
            <p className="text-muted-foreground">
              We&apos;ve sent a confirmation code to {userEmail}. Please enter it below.
            </p>
          </div>
          
          <form onSubmit={handleConfirmation} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="confirmationCode" className="text-sm font-medium">
                Confirmation Code
              </label>
              <input
                id="confirmationCode"
                name="confirmationCode"
                type="text"
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter confirmation code"
              />
            </div>
            
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Confirming..." : "Confirm Email"}
            </Button>
          </form>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Didn&apos;t receive the code? </span>
            <button 
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="text-primary hover:underline"
            >
              Go back to registration
            </button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Enter your details to create your account</p>
        </div>
        
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your password"
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Confirm your password"
            />
          </div>
          
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </Card>
  )
}