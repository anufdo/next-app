"use client"

import { useAuthenticator } from "@aws-amplify/ui-react";

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: unknown;
}

export function useAuth(): AuthState {
  const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);

  return {
    user,
    isAuthenticated: authStatus === 'authenticated',
    isLoading: authStatus === 'configuring',
  };
}
