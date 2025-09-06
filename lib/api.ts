// API utility functions for frontend to backend communication

const API_BASE_URL = process.env.NODE_ENV === "production" ? "https://your-domain.com/api" : "/api"

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL

    // Get token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: "Network error occurred",
      }
    }
  }

  // Dashboard API methods
  async getDashboardStats() {
    return this.request("/dashboard/stats")
  }

  // Analytics API methods
  async getAnalyticsData(type?: string) {
    const params = type ? `?type=${type}` : ""
    return this.request(`/analytics/traffic${params}`)
  }

  // Users API methods
  async getUsers(params?: { search?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.append("search", params.search)
    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())

    const queryString = searchParams.toString()
    return this.request(`/users${queryString ? `?${queryString}` : ""}`)
  }

  async getUserStats() {
    return this.request("/users?type=stats")
  }

  async createUser(userData: { name: string; email: string; role: string }) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id: number, userData: Partial<{ name: string; email: string; role: string; status: string }>) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: number) {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    })
  }

  // Reports API methods
  async getReports(params?: { type?: string; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.append("type", params.type)
    if (params?.status) searchParams.append("status", params.status)

    const queryString = searchParams.toString()
    return this.request(`/reports${queryString ? `?${queryString}` : ""}`)
  }

  async generateReport(reportData: { title: string; description: string; type: string }) {
    return this.request("/reports", {
      method: "POST",
      body: JSON.stringify(reportData),
    })
  }

  // Auth API methods
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    const result = await this.request("/auth/logout", {
      method: "POST",
    })
    this.clearToken()
    return result
  }

  async getCurrentUser() {
    return this.request("/auth/me")
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
export type { ApiResponse }
