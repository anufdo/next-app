
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Hello, {session.user?.name || session.user?.email}!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {session.user?.name || "Not provided"}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Status:</strong> <span className="text-green-600">Active</span></p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile">View Profile</Link>
                </Button>
                <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
                  Settings
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
                  Help & Support
                </button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Logged in successfully</p>
                <p>• Account created</p>
                <p>• Welcome to the platform!</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose">
              <p>
                Congratulations on successfully setting up authentication! This dashboard is protected 
                and only accessible to authenticated users.
              </p>
              <ul className="mt-4 space-y-2">
                <li>✅ User registration working</li>
                <li>✅ User login working</li>
                <li>✅ Route protection active</li>
                <li>✅ Session management enabled</li>
                <li>✅ Secure password hashing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
