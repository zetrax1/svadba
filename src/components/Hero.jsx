export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg-pattern" />
      <div className="hero__content">
        <p className="hero__pretitle">Svadobné oznámenie</p>
        <h1 className="hero__names">
          Majka
          <span className="hero__ampersand">&amp;</span>
          Vladko
        </h1>
        <div className="hero__divider" />
        <p className="hero__date">19. septembra 2026</p>
        <p className="hero__venue-hint">Kostol Preblahoslavenej Panny Márie, Vráble · Tajna Vineyards &amp; Winery</p>
      </div>
    </section>
  )
}
