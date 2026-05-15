// TODO: Replace placeholder names/roles and add real photos.
// Place photos in /public/photos/ and set photo: '/photos/name.jpg'
// Leave photo: null to show initials.

const groomsmen = [
  { name: 'Marek Sloboda',    role: 'Svedok',   initials: 'MS', photo: null },
  { name: 'Tomáš Krajči',     role: 'Kamarát',  initials: 'TK', photo: null },
  { name: 'Juraj Blaho',      role: 'Kamarát',  initials: 'JB', photo: null },
]

const bridesmaids = [
  { name: 'Jana Nováková',    role: 'Svedkyňa', initials: 'JN', photo: null },
  { name: 'Katarína Kováčová',role: 'Družička', initials: 'KK', photo: null },
  { name: 'Lucia Horváthová', role: 'Družička', initials: 'LH', photo: null },
]

function PartyCard({ person }) {
  return (
    <div className="party__card">
      <div className="party__avatar">
        {person.photo ? <img src={person.photo} alt={person.name} /> : person.initials}
      </div>
      <div className="party__name">{person.name}</div>
      <div className="party__role">{person.role}</div>
    </div>
  )
}

export default function WeddingParty() {
  return (
    <section id="party" className="party">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✦</span></div>
          <h2>Svadobná párty</h2>
          <p>Ľudia, bez ktorých to nie je možné</p>
        </div>
        <div className="party__groups">
          <div>
            <p className="party__group-title">Ženíchova strana</p>
            <div className="party__grid">
              {groomsmen.map(p => <PartyCard key={p.name} person={p} />)}
            </div>
          </div>
          <div>
            <p className="party__group-title">Nevestina strana</p>
            <div className="party__grid">
              {bridesmaids.map(p => <PartyCard key={p.name} person={p} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
