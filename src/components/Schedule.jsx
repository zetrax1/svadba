const events = [
  { time: '',      event: 'Príchod hostí',        desc: 'Ubytovanie hostí', location: 'Podľa ubytovacieho zariadenia' },
  { time: '16:00', event: 'Svadobný obrad',        desc: 'Slávnostný sobášny obrad', location: 'Kostol Preblahoslavenej Panny Márie, Vráble' },
  { time: '17:00', event: 'Presun do vinárstva',   desc: 'Spoločný presun na svadobnú recepciu', location: 'Tajna Vineyards & Winery' },
  { time: '17:30', event: 'Slávnostná hostina',    desc: 'Večera a prvé prípitky', location: 'Tajna Vineyards & Winery' },
  { time: '',      event: 'Prvý tanec',             desc: 'Tanec novomanželov', location: '' },
  { time: '',      event: 'Zábava & tanec',         desc: 'Hudba, tanec a oslava do rána', location: '' },
  { time: '19:00', event: 'Západ slnka',             desc: 'Romantický západ slnka na lúke vo viniciach', location: '' },
  { time: 'od 20:00', event: 'Grilovačka',              desc: '', location: '' },
  { time: '22:30', event: 'Someliér',                desc: 'Ochutnávka vína', location: '' },
  { time: '',      event: 'Zábava až do rána',       desc: '', location: '' },
]

export default function Schedule() {
  return (
    <section id="program" className="schedule">
      <div className="container">
        <div className="section-header">

          <h2>Program dňa</h2>
          <p>19. septembra 2026</p>
        </div>
        <div className="schedule__timeline">
          {events.map((item, i) => (
            <div key={i} className="schedule__item">
              <div className="schedule__content">
                {item.time && <div className="schedule__time">{item.time}</div>}
                <div className="schedule__event">{item.event}</div>
                <div className="schedule__desc">{item.desc}</div>
                {item.location && <div className="schedule__location">📍 {item.location}</div>}
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
