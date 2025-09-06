"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "@/lib/api"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password)

      if (response.success && response.data) {
        apiClient.setToken(response.data.token)
        setUser(response.data.user)
        return { success: true }
      } else {
        return { success: false, error: response.error || "Login failed" }
      }
    } catch (error) {
      return { success: false, error: "Network error occurred" }
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      apiClient.clearToken()
    }
  }

  const refreshUser = async () => {
    try {
      const response = await apiClient.getCurrentUser()
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        setUser(null)
        apiClient.clearToken()
      }
    } catch (error) {
      setUser(null)
      apiClient.clearToken()
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

      if (token) {
        apiClient.setToken(token)
        await refreshUser()
      }

      setIsLoading(false)
    }

    initAuth()
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
