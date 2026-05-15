const cards = [
  {
    icon: '👗',
    title: 'Dress code',
    items: [
      'Formálne oblečenie — spoločenské šaty, oblek',
      'Preferujeme svetlé a pastelové odtiene',
      'Prosíme vyhnúť sa bielej a krémovej farbe',
    ],
  },
  {
    icon: '🚗',
    title: 'Doprava & parkovanie',
    items: [
      'Obrad: parkovanie pri kostole v Vrábľoch',
      'Hostina: bezplatné parkovisko priamo vo vinárni Tajna',
      'Vzdialenosť kostol → vinárňa: cca 10 min autom',
      'Odporúčame spoločnú dopravu — alkohol sa podávať bude 🍷',
    ],
  },
  {
    icon: '📞',
    title: 'Kontakt',
    items: [
      'V prípade akýchkoľvek otázok nás kontaktujte:',
      'Majka: +421 900 000 001',
      'Vladko: +421 900 000 002',
    ],
  },
]

export default function WeddingParty() {
  return (
    <section id="party" className="party">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
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
