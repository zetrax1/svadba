export default function Hudba() {
  return (
    <section id="hudba" className="hudba">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
          <h2>Hudba</h2>
          <p>Doplň párty playlist</p>
        </div>

        <div className="hudba__qr">
          <p className="hudba__qr-text">
            Je pieseň ktorá dnes nezaznela a chceš si na ňu zatancovať?
            Naskenuj QR kód a pridaj ju do playlistu "Svadobný jukebox".
          </p>
          <img
            src="/spotify_playlist_qr.png"
            alt="QR kód na Spotify playlist"
            className="hudba__qr-img"
          />
          <p className="hudba__qr-hint">🎵 Naskenuj a pridaj pesničku</p>
        </div>
      </div>
    </section>
  )
}
