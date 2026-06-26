import PromoBanner from '../../components/auth/PromoBanner'
import LoginForm from '../../components/auth/LoginForm'
import FooterLinks from '../../components/auth/FooterLinks'
import './Login.css'

function Login() {
  return (
    <main className="login-page">
      {/* Left Column — Promo Banner */}
      <PromoBanner />

      {/* Right Column — Login Form & Footer Links */}
      <section className="login-page__right" aria-label="Sign-in form container">
        <div className="login-page__right-inner">
          <LoginForm />
          <FooterLinks />
        </div>
      </section>
    </main>
  )
}

export default Login
