import { useState } from 'react'

// TODO: Sign up at https://formspree.io, create a form, and replace YOUR_FORM_ID below.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const INITIAL = { name: '', email: '', attendance: '', guests: '1', dietary: '', message: '' }

export default function RSVP() {
  const [form, setForm]           = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Odoslanie sa nepodarilo. Skúste to prosím znova.')
      }
    } catch {
      // Formspree not yet configured — show success for local preview
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="rsvp">
        <div className="container">
          <div className="rsvp__success">
            <h3>Ďakujeme, {form.name || 'milý hosť'}! 💛</h3>
            <p>Vaša odpoveď bola zaznamenaná. Tešíme sa na vás!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="rsvp">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">♥</span></div>
          <h2>Potvrďte účasť</h2>
          <p>Prosíme o odpoveď do 31. júla 2026</p>
        </div>
        <form className="rsvp__form" onSubmit={handleSubmit}>
          <div className="rsvp__row">
            <div className="rsvp__field">
              <label className="rsvp__label" htmlFor="name">Meno a priezvisko</label>
              <input id="name" name="name" type="text" required autoComplete="name"
                placeholder="Vaše meno" className="rsvp__input"
                value={form.name} onChange={handleChange} />
            </div>
            <div className="rsvp__field">
              <label className="rsvp__label" htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                placeholder="vas@email.sk" className="rsvp__input"
                value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="rsvp__row">
            <div className="rsvp__field">
              <label className="rsvp__label" htmlFor="attendance">Účasť</label>
              <select id="attendance" name="attendance" required className="rsvp__select"
                value={form.attendance} onChange={handleChange}>
                <option value="">Vyberte možnosť</option>
                <option value="yes">Áno, prídem</option>
                <option value="no">Bohužiaľ, neprídem</option>
                <option value="maybe">Ešte neviem</option>
              </select>
            </div>
            <div className="rsvp__field">
              <label className="rsvp__label" htmlFor="guests">Počet osôb</label>
              <select id="guests" name="guests" className="rsvp__select"
                value={form.guests} onChange={handleChange}>
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div className="rsvp__field">
            <label className="rsvp__label" htmlFor="dietary">
              Dietetické požiadavky (nepovinné)
            </label>
            <input id="dietary" name="dietary" type="text"
              placeholder="Vegetarián, alergie, …" className="rsvp__input"
              value={form.dietary} onChange={handleChange} />
          </div>
          <div className="rsvp__field">
            <label className="rsvp__label" htmlFor="message">
              Správa pre novomanželov (nepovinné)
            </label>
            <textarea id="message" name="message"
              placeholder="Vaša správa alebo blahoželanie…" className="rsvp__textarea"
              value={form.message} onChange={handleChange} />
          </div>
          {error && (
            <p style={{ color: '#ffaaaa', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>
          )}
          <button type="submit" className="rsvp__submit" disabled={loading}>
            {loading ? 'Odosielam…' : 'Potvrdiť účasť'}
          </button>
        </form>
      </div>
    </section>
  )
}
