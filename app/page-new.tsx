import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const user = await currentUser()
  
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Hello, {user.firstName || user.username || user.emailAddresses[0]?.emailAddress}!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View and manage your profile information
              </p>
              <Button asChild>
                <Link href="/profile">View Profile</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage your account settings and preferences
              </p>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View your recent activity and history
              </p>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Account</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">Member Since</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Active</div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {user.emailAddresses.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Email{user.emailAddresses.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
