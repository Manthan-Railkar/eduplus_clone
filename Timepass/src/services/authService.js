const TOKEN_KEY = 'eduplus_auth_token'
const USER_KEY = 'eduplus_auth_user'

const MOCK_USER = {
  name: 'MANTHAN RAILKAR',
  initials: 'MR',
  registrationNo: '2025800102',
  course: 'B.Tech. Computer Science And Engineering',
  status: 'Active',
  avatar: '/student-profile.png'
}

export const authService = {
  login: async (username, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!username || !password) {
      throw new Error('Username and password are required')
    }

    // Accepting any non-empty credentials for demo purposes
    const token = 'mock-jwt-token-xyz-12345'
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER))

    return {
      token,
      user: MOCK_USER
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem(USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY)
  }
}
