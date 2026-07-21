const cards = [
  {
    icon: '👗',
    title: 'Dress code',
    items: [
      'Oblečte sa pohodlne, aby ste si mohli užiť tanec a zábavu až do rána',
      'Žiadne farebné preferencie nie sú, oblečte si čo vám je príjemné a v čom sa budete cítiť skvelo',
      'Prosíme dbajte na to že budeme vo vinárstve/viniciach, preto prispôsobte svoju obuv (ideálne žiadne ihličkové podpatky)',
    ],
  },
  {
    icon: '🚗',
    title: 'Doprava & parkovanie',
    items: [
      'Obrad: parkovanie pri kostole v Vrábľoch/pri hoteli kde ste ubytovaní',
      'Hostina: bezplatné parkovisko priamo vo vinárstve Tajna/odporúčame nechať auto pri hoteli kde ste ubytovaní, transport bude zabezpečený',
      'Vzdialenosť kostol → vinárstvo: cca 10 min autom',
      'Odporúčame spoločnú dopravu (dajte nám prosím vedieť či bude záujem sa odviesť spoločne alebo pôjdete vlastným autom) — aby sme si spolu mohli všetci pripiť 🍷',
    ],
  },
]

export default function WeddingParty() {
  return (
    <section id="party" className="party">
      <div className="container">
        <div className="section-header">

          <h2>Organizačné info</h2>
          <p>Praktické detaily pre váš príjemný deň</p>
        </div>
        <div className="info__grid">
          {cards.map(card => (
            <div key={card.title} className="info__card">
              <div className="info__card-icon">{card.icon}</div>
              <h3 className="info__card-title">{card.title}</h3>
              <ul className="info__card-list">
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
