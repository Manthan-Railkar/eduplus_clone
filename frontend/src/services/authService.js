const TOKEN_KEY = 'eduplus_auth_token'
const USER_KEY = 'eduplus_auth_user'

export const authService = {
  login: async (username, password) => {
    if (!username || !password) {
      throw new Error('Username and password are required')
    }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ seatNumber: username, password })
    })

    const data = await response.json()

    if (data.status === 'error' || !response.ok) {
      throw new Error(data.message || 'Invalid credentials')
    }

    const token = data.token
    const user = data.data.user

    // Transform backend user properties to the format expected by the frontend
    const initials = user.studentName
      ? user.studentName
          .split(' ')
          .filter(Boolean)
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'ST'

    const transformedUser = {
      id: user.id || user._id,
      name: user.studentName,
      initials,
      registrationNo: user.seatNumber,
      course: user.programme,
      status: 'Active',
      avatar: '/student-profile.png'
    }

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(transformedUser))

    return {
      token,
      user: transformedUser
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

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY)
  }
}

