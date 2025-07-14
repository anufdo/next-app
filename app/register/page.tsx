import RegisterForm from "@/components/RegisterForm"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const session = await auth()

  if (session) {
    redirect("/")
  }

  // Await the searchParams promise and extract the email
  const params = await searchParams
  const email = typeof params.email === "string" ? params.email : undefined

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <RegisterForm email={email} />
    </div>
  )
}
