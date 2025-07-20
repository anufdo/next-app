"use client"

import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import Link from "next/link"

export default function Navigation() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold">
              My App
            </Link>
            <div className="animate-pulse">
              <div className="h-9 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold">
            My App
          </Link>
          
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="space-x-2">
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
