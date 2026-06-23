import './PromoBanner.css'

function PromoBanner() {
  return (
    <section className="promo-banner" aria-label="EduPlus promotional banner">
      <div className="promo-banner__image-wrapper">
        <img
          src="/eduplus_banner.jpg"
          alt="EduPlus Banner — Revolutionising Education, 100+ Happy Clients Onboarded"
          className="promo-banner__image"
        />
      </div>
    </section>
  )
}

export default PromoBanner
