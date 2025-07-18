"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Navigation() {
  const { isLoading, isAuthenticated, user } = useAuth();
  // Fix type for user to allow attributes property
  type UserWithAttributes = { attributes?: { name?: string; email?: string } }
  const typedUser = user as UserWithAttributes
  const { signOut } = useAuthenticator();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  if (isLoading) {
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
    );
  }

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold">
            My App
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  Welcome, {typedUser?.attributes?.name || typedUser?.attributes?.email}
                </span>
                <Button variant="outline" onClick={handleLogout}>
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
  );
}
