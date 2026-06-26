import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import Breadcrumb from '../../components/dashboard/Breadcrumb'
import GradeCardResult from './GradeCardResult'
import { ACADEMIC_YEARS, SEMESTERS } from '../../constants/gradeCardData'
import { gradeCardService } from '../../services/gradeCardService'
import './GradeCard.css'

function GradeCard() {
  const [academicYear, setAcademicYear] = useState('2025-26')
  const [semester, setSemester] = useState('2')
  const [showResult, setShowResult] = useState(false)
  const [gradeCardData, setGradeCardData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleProceed = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await gradeCardService.getGradeCard(academicYear, semester)
      setGradeCardData(data)
      setShowResult(true)
    } catch (err) {
      setError(err.message || 'Failed to retrieve grade card. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setShowResult(false)
    setGradeCardData(null)
  }

  return (
    <DashboardLayout>
      <Breadcrumb
        items={[
          { label: 'Examination', href: '/dashboard/examination' },
          { label: 'Grade card / Marksheet' }
        ]}
      />

      {!showResult ? (
        <div className="gradecard-form">
          <div className="gradecard-form__row">
            {/* Academic Year Dropdown */}
            <div className="gradecard-form__field">
              <label className="gradecard-form__label" htmlFor="academic-year">
                Select Academic Year
              </label>
              <div className="gradecard-form__select-wrap">
                <select
                  id="academic-year"
                  className="gradecard-form__select"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  disabled={loading}
                >
                  {ACADEMIC_YEARS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Semester Dropdown */}
            <div className="gradecard-form__field">
              <label className="gradecard-form__label" htmlFor="semester">
                Select Semester
              </label>
              <div className="gradecard-form__select-wrap">
                <select
                  id="semester"
                  className="gradecard-form__select"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  disabled={loading}
                >
                  {SEMESTERS.map((sem) => (
                    <option key={sem.value} value={sem.value}>{sem.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              className="gradecard-form__proceed"
              onClick={handleProceed}
              id="gradecard-proceed-btn"
              disabled={loading}
            >
              {loading ? 'LOADING...' : 'PROCEED'}
            </button>
          </div>
          {error && (
            <p className="gradecard-form__error" style={{ color: '#d32f2f', marginTop: '15px', fontWeight: '500' }}>
              {error}
            </p>
          )}
        </div>
      ) : (
        <GradeCardResult
          data={gradeCardData}
          academicYear={academicYear}
          semester={semester}
          onBack={handleBack}
        />
      )}
    </DashboardLayout>
  )
}

export default GradeCard
