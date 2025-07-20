import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProfilePage() {
  const user = await currentUser()
  
  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <p className="mt-1 text-lg">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.username || "Not provided"}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <p className="mt-1 text-lg">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Account Status
                </label>
                <p className="mt-1 text-lg">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <p className="mt-1 text-lg">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm text-muted-foreground">
                  Your profile picture is managed through Clerk
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
