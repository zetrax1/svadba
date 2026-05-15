const events = [
  { time: '14:00', event: 'Príchod hostí',        desc: 'Vítanie svadobných hostí', location: 'Kostol Preblahoslavenej Panny Márie, Vráble' },
  { time: '15:00', event: 'Svadobný obrad',        desc: 'Slávnostný sobášny obrad', location: 'Kostol Preblahoslavenej Panny Márie, Vráble' },
  { time: '16:30', event: 'Gratulačný sprievod',   desc: 'Blahoželania & spoločné fotografie', location: 'Tajna Vineyards & Winery' },
  { time: '18:00', event: 'Slávnostná hostina',    desc: 'Večera a prvé prípitky', location: 'Tajna Vineyards & Winery' },
  { time: '20:00', event: 'Prvý tanec',             desc: 'Tanec novomanželov', location: 'Tajna Vineyards & Winery' },
  { time: '20:30', event: 'Zábava & tanec',         desc: 'Hudba, tanec a oslava do rána', location: 'Tajna Vineyards & Winery' },
]

export default function Schedule() {
  return (
    <section id="program" className="schedule">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
          <h2>Program dňa</h2>
          <p>19. septembra 2026</p>
        </div>
        <div className="schedule__timeline">
          {events.map((item, i) => (
            <div key={i} className="schedule__item">
              <div className="schedule__content">
                <div className="schedule__time">{item.time}</div>
                <div className="schedule__event">{item.event}</div>
                <div className="schedule__desc">{item.desc}</div>
                <div className="schedule__location">📍 {item.location}</div>
              </div>
              <div className="schedule__dot" />
              <div className="schedule__spacer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
