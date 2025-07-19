"use client"

import { Amplify } from "aws-amplify"
import "@aws-amplify/ui-react/styles.css"
import { useEffect } from "react"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  // Attempt to fetch Amplify config at runtime; skip if not present
  useEffect(() => {
    fetch('/amplify_outputs.json')
      .then(res => {
        if (!res.ok) throw new Error('Config file not found')
        return res.json()
      })
      .then(cfg => Amplify.configure(cfg))
      .catch(() => console.warn('Amplify config missing, skipping setup'))
  }, [])

  return (
    <>
      {children}
    </>
  )
}
