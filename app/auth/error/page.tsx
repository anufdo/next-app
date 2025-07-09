import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "CredentialsSignin":
        return "Invalid email or password. Please try again."
      case "AccessDenied":
        return "Access denied. You don't have permission to access this resource."
      case "Verification":
        return "Verification failed. Please check your email and try again."
      default:
        return "An error occurred during authentication. Please try again."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-destructive">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            {error ? getErrorMessage(error) : "An unexpected error occurred."}
          </p>
          
          <div className="flex flex-col space-y-2">
            <Button asChild>
              <Link href="/login">Try Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
