import { useRef } from 'react'
import { Printer, Download, ArrowLeft } from 'lucide-react'
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'
import './GradeCardResult.css'

function GradeCardResult({ data, academicYear, semester, onBack }) {
  const printRef = useRef(null)

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Grade Card - ${data.studentName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Poppins', 'Segoe UI', sans-serif; background: #fff; padding: 20px; }
          .gc-sheet { width: 100%; max-width: 1000px; margin: 0 auto; border: 2px solid #1a237e; padding: 24px; }
          .gc-sheet__header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 16px; border-bottom: 2px solid #1a237e; padding-bottom: 12px; }
          .gc-sheet__logo { width: 80px; height: 80px; object-fit: contain; border-radius: 50%; border: 2px solid #1a237e; background: #fff; flex-shrink: 0; }
          .gc-sheet__logo-fallback { width: 80px; height: 80px; border-radius: 50%; background: #e3ecfc; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #1a237e; border: 2px solid #1a237e; flex-shrink: 0; }
          .gc-sheet__header-text { flex: 1; text-align: center; }
          .gc-sheet__institute { font-size: 18px; font-weight: 700; color: #1a237e; text-transform: uppercase; letter-spacing: 1px; }
          .gc-sheet__address { font-size: 10px; color: #555; margin-top: 2px; }
          .gc-sheet__dept { font-size: 12px; font-weight: 600; color: #333; margin-top: 4px; }
          .gc-sheet__qr { width: 60px; height: 60px; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .gc-sheet__qr-placeholder { width: 100%; height: 100%; background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 4px, #e0e0e0 4px, #e0e0e0 8px); }
          .gc-sheet__info { display: flex; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 4px; }
          .gc-sheet__info-left, .gc-sheet__info-right { font-size: 11px; color: #333; }
          .gc-sheet__info-left p, .gc-sheet__info-right p { margin-bottom: 2px; }
          .gc-sheet__info-label { font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10.5px; }
          th, td { border: 1px solid #aaa; padding: 5px 8px; text-align: center; }
          th { background: #f5f7ff; font-weight: 600; color: #1a237e; font-size: 10px; }
          td { color: #333; }
          .gc-sheet__total-row td { font-weight: 700; background: #fafbff; }
          .gc-sheet__perf-section { margin-bottom: 8px; }
          .gc-sheet__perf-title { font-size: 10px; font-weight: 600; color: #333; text-align: center; background: #f5f7ff; border: 1px solid #aaa; padding: 3px; }
          .gc-sheet__result { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; margin-bottom: 12px; padding: 6px 0; border-top: 1px solid #ccc; }
          .gc-sheet__result-text { font-size: 12px; font-weight: 600; color: #333; }
          .gc-sheet__result-date { font-size: 11px; color: #555; }
          .gc-sheet__signatures { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 16px; }
          .gc-sheet__sig-block { text-align: center; min-width: 160px; }
          .gc-sheet__sig-line { width: 120px; border-bottom: 1px solid #333; margin: 0 auto 6px; height: 30px; display: flex; align-items: flex-end; justify-content: center; font-style: italic; color: #777; font-size: 14px; }
          .gc-sheet__sig-label { font-size: 10px; font-weight: 600; color: #333; text-transform: uppercase; }
          .gc-sheet__note { font-size: 9px; color: #666; margin-top: 12px; font-style: italic; }
          @media print { body { padding: 0; } .gc-sheet { border: 2px solid #1a237e; } }
        </style>
      </head>
      <body>${printContents}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => { printWindow.print() }, 500)
  }

  const handleDownload = () => {
    const element = printRef.current
    const opt = {
      margin:       10,
      filename:     `GradeCard_${data.studentName.replace(/\s+/g, '_')}_Sem${semester}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf().set(opt).from(element).save()
  }

  const totalCredits = data.courses.reduce((sum, c) => sum + c.courseCredit, 0)
  const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

  return (
    <div className="gradecard-result">
      {/* Action buttons */}
      <div className="gradecard-result__actions">
        <button className="gradecard-result__back-btn" onClick={onBack} title="Back to selection">
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="gradecard-result__action-group">
          <button className="gradecard-result__print-btn" onClick={handlePrint} id="gradecard-print-btn">
            <Printer size={14} />
            PRINT
          </button>
          <button className="gradecard-result__download-btn" onClick={handleDownload} id="gradecard-download-btn">
            <Download size={14} />
            DOWNLOAD
          </button>
        </div>
      </div>

      {/* Printable Grade Card Sheet */}
      <div className="gradecard-result__sheet-wrap">
        <div className="gc-sheet" ref={printRef}>
          {/* Header */}
          <div className="gc-sheet__header">
            <img src={`${window.location.origin}/logo.jpg`} className="gc-sheet__logo" alt="Logo" />
            <div className="gc-sheet__header-text">
              <h2 className="gc-sheet__institute">Sardar Patel Institute Of Technology</h2>
              <p className="gc-sheet__address">Bhavan's Campus, Munshi Nagar, Andheri (West), Mumbai-400058, India</p>
              <p className="gc-sheet__dept">B.Tech. Computer Science And Engineering</p>
            </div>
            <div className="gc-sheet__qr">
              <div className="gc-sheet__qr-placeholder" title="QR Code"></div>
            </div>
          </div>

          {/* Student Info */}
          <div className="gc-sheet__info">
            <div className="gc-sheet__info-left">
              <p><span className="gc-sheet__info-label">Name :</span> {data.studentName}</p>
              <p><span className="gc-sheet__info-label">Examination :</span> {data.examination}</p>
              <p><span className="gc-sheet__info-label">Seat Number (UID) :</span> {data.seatNumber}</p>
              <p><span className="gc-sheet__info-label">Programme :</span> {data.programme}</p>
            </div>
            <div className="gc-sheet__info-right">
              <p><span className="gc-sheet__info-label">Academic Year :</span> {academicYear}</p>
              <p><span className="gc-sheet__info-label">Semester :</span> {semester}</p>
            </div>
          </div>

          {/* Course Table */}
          <table className="gc-sheet__table">
            <thead>
              <tr>
                <th>Sr.<br/>No.</th>
                <th>Course<br/>Code</th>
                <th>Course Name</th>
                <th>Course<br/>Credit</th>
                <th>Grade</th>
                <th>Credit<br/>Earned</th>
                <th>Grade<br/>Point<br/>(G)</th>
                <th>CGEP</th>
              </tr>
            </thead>
            <tbody>
              {data.courses.map((course) => (
                <tr key={course.srNo}>
                  <td>{course.srNo}</td>
                  <td>{course.courseCode}</td>
                  <td style={{ textAlign: 'left' }}>{course.courseName}</td>
                  <td>{course.courseCredit}</td>
                  <td>{course.grade}</td>
                  <td>{course.creditEarned}</td>
                  <td>{course.gradePoint}</td>
                  <td>{course.cgp}</td>
                </tr>
              ))}
              <tr className="gc-sheet__total-row">
                <td colSpan="2"></td>
                <td style={{ textAlign: 'left', fontWeight: 700 }}>Total</td>
                <td>{totalCredits}</td>
                <td colSpan="4"></td>
              </tr>
            </tbody>
          </table>

          {/* Semester Performance (SGPA) */}
          <div className="gc-sheet__perf-section">
            <table>
              <thead>
                <tr>
                  <th colSpan="10" className="gc-sheet__perf-title">Semester Performance (SGPA)</th>
                </tr>
                <tr>
                  {semesters.map((sem) => (
                    <th key={sem}>{sem}</th>
                  ))}
                  <th>CGPA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {semesters.map((sem) => (
                    <td key={sem}>{data.semesterPerformance[sem] || ''}</td>
                  ))}
                  <td style={{ fontWeight: 700 }}>{data.semesterPerformance.CGPA}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* MTU Semester Performance (SGPA) */}
          <div className="gc-sheet__perf-section">
            <table>
              <thead>
                <tr>
                  <th colSpan="10" className="gc-sheet__perf-title">MTU Semester Performance (SGPA)</th>
                </tr>
                <tr>
                  {semesters.map((sem) => (
                    <th key={sem}>{sem}</th>
                  ))}
                  <th>CGPA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {semesters.map((sem) => (
                    <td key={sem}>{data.mtuSemesterPerformance[sem] || ''}</td>
                  ))}
                  <td>{data.mtuSemesterPerformance.CGPA || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Result */}
          <div className="gc-sheet__result">
            <p className="gc-sheet__result-text">Result : {data.result}</p>
            <p className="gc-sheet__result-date">Result Declared On : {data.resultDeclaredOn}</p>
          </div>

          {/* Signatures */}
          <div className="gc-sheet__signatures">
            <div className="gc-sheet__sig-block">
              <div className="gc-sheet__sig-line">~</div>
              <p className="gc-sheet__sig-label">Checked By</p>
            </div>
            <div className="gc-sheet__sig-block">
              <div className="gc-sheet__sig-line">~</div>
              <p className="gc-sheet__sig-label">Verified By</p>
            </div>
            <div className="gc-sheet__sig-block">
              <div className="gc-sheet__sig-line">~</div>
              <p className="gc-sheet__sig-label">Controller Of Examinations</p>
            </div>
          </div>

          {/* Note */}
          <p className="gc-sheet__note">{data.note}</p>
        </div>
      </div>
    </div>
  )
}

export default GradeCardResult
