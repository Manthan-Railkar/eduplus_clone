import { authService } from './authService'

export const gradeCardService = {
  getGradeCard: async (academicYear, semester) => {
    const token = authService.getToken()
    if (!token) {
      throw new Error('No authentication token found. Please log in again.')
    }

    const response = await fetch(
      `/api/grade-cards/my-card?academicYear=${encodeURIComponent(
        academicYear
      )}&semester=${encodeURIComponent(semester)}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    if (data.status === 'error' || !response.ok) {
      throw new Error(data.message || 'Failed to fetch grade card')
    }

    return data.data.gradeCard
  }
}
