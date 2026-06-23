import { HelpCircle } from 'lucide-react'
import './FooterLinks.css'

function FooterLinks() {
  return (
    <div className="footer-links">
      {/* Utility Row */}
      <div className="footer-links__utility-row">
        <a href="#help" className="footer-links__link" id="help-link">
          <HelpCircle size={16} strokeWidth={2} />
          <span>Help</span>
        </a>
        <a href="#forgot-password" className="footer-links__link" id="forgot-password-link">
          <HelpCircle size={16} strokeWidth={2} />
          <span>Forgot Password?</span>
        </a>
      </div>

      {/* Download Badges */}
      <div className="footer-links__badges">
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links__badge-link"
          id="google-play-badge"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="footer-links__badge-img"
          />
        </a>
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links__badge-link"
          id="app-store-badge"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="footer-links__badge-img"
          />
        </a>
      </div>
    </div>
  )
}

export default FooterLinks
