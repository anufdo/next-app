"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils"

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  user: {
    username?: string
    email?: string
    name?: string
  } | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  })

  const checkUser = async () => {
    try {
      const user = await getCurrentUser()
      const userAttributes = await fetchUserAttributes()
      
      setAuthState({
        isLoading: false,
        isAuthenticated: true,
        user: {
          username: user.username,
          email: userAttributes.email,
          name: userAttributes.name,
        },
      })
    } catch {
      setAuthState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
      })
    }
  }

  useEffect(() => {
    checkUser()

    // Listen for authentication events
    const unsubscribe = Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signedIn':
          checkUser()
          break
        case 'signedOut':
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          })
          break
        case 'tokenRefresh':
          checkUser()
          break
        case 'tokenRefresh_failure':
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          })
          break
      }
    })

    return () => unsubscribe()
  }, [])

  return authState
}
