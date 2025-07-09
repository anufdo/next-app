"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Navigation() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
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
            {session ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <Button
                  variant="outline"
                  onClick={async () => {
                    await signOut({ callbackUrl: "/login", redirect: false })
                    router.refresh()
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="space-x-2">
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
