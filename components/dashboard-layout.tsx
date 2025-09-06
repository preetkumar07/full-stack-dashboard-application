"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { BarChart3, Home, Settings, Users, FileText, Menu, X, LogOut, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Overview", href: "/", icon: Home, current: true },
    { name: "Analytics", href: "/analytics", icon: BarChart3, current: false },
    { name: "Users", href: "/users", icon: Users, current: false },
    { name: "Reports", href: "/reports", icon: FileText, current: false },
    { name: "Settings", href: "/settings", icon: Settings, current: false },
  ]

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border/50 shadow-2xl transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 lg:bg-sidebar lg:backdrop-blur-none lg:shadow-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Dashboard</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent/20 hover:scale-105 transition-all duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-out relative overflow-hidden
                    ${
                      item.current
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 scale-105"
                        : "text-sidebar-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-sidebar-foreground hover:scale-105 hover:shadow-md"
                    }
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <item.icon
                    className={`mr-3 h-5 w-5 relative z-10 transition-transform duration-200 group-hover:scale-110 ${item.current ? "text-white" : "text-sidebar-foreground"}`}
                  />
                  <span className="relative z-10">{item.name}</span>
                  {item.current && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="glass-effect border-b border-border/50 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-primary/10 hover:text-primary hover:scale-105 transition-all duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-effect border-border/50 shadow-xl" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold text-foreground">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:bg-destructive/10 hover:text-destructive transition-colors duration-200 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20 relative">
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_theme(colors.primary)_1px,_transparent_0)] bg-[length:20px_20px] pointer-events-none" />
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
