import { useState, useEffect } from 'react'

const SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwZlblyKZ7R-LCJ5C45BKSCoXBv15nRk2f4BjAId04zlXhKRNpaqeJUXQekFeBOtcI1/exec'
const RSVP_TOKEN = import.meta.env.VITE_RSVP_TOKEN || ''
const SUBMIT_COOLDOWN_MS = 60 * 1000
const SUBMIT_COOLDOWN_KEY = 'rsvpSubmitBlockedUntil'

const DIETARY_OPTIONS = [
  { id: 'none',        label: 'Bez obmedzení' },
  { id: 'vegetarian',  label: 'Vegetarián' },
  { id: 'vegan',       label: 'Vegan' },
  { id: 'glutenfree',  label: 'Bezlepkové' },
  { id: 'lactosefree', label: 'Bez laktózy' },
  { id: 'allergy',     label: 'Iná alergia' },
]

const SPIRIT_OPTIONS = [
  'Pivo',
  'Gin',
  'Whisky',
  'Rum',
  'Sekt / Prosecco',
  'Iné',
  'Nepijem alkohol',
]


const SEAT_TABLES = [  { id: 'inside',  icon: '🏛️', label: 'Vnútri' },
  { id: 'outside', icon: '🌙', label: 'Vonku / Terasa' },
]

const INITIAL = { name: '', attendance: '', guests: 1, dietary: [], allergyNote: '', drink: '', spirits: [], spiritNote: '', seat: '', message: '' }

export default function RSVP() {
  const [form, setForm]       = useState(INITIAL)
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]     = useState(null)
  const [submitBlockedUntil, setSubmitBlockedUntil] = useState(0)

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const toggleDietary = (id) => {
    setForm(prev => {
      if (id === 'none') {
        // "Bez obmedzení" clears everything else and toggles itself
        return { ...prev, dietary: prev.dietary.includes(id) ? [] : [id], allergyNote: '' }
      }
      // any real restriction removes "Bez obmedzení" if present
      const without = prev.dietary.filter(d => d !== 'none')
      return {
        ...prev,
        dietary: without.includes(id)
          ? without.filter(d => d !== id)
          : [...without, id],
      }
    })
  }

  const toggleSpirit = (s) => {
    setForm(prev => {
      if (s === 'Nepijem alkohol') {
        // selecting "no alcohol" clears everything else and toggles itself
        return { ...prev, spirits: prev.spirits.includes(s) ? [] : [s] }
      }
      // selecting any real drink removes "Nepijem alkohol" if present
      const without = prev.spirits.filter(x => x !== 'Nepijem alkohol')
      return {
        ...prev,
        spirits: without.includes(s)
          ? without.filter(x => x !== s)
          : [...without, s],
      }
    })
  }

  // Steps: 1 → 2 → 3 → 4 → 5 (if yes)  |  1 → 2 → 5 (if no)
  const goNext = () => setStep(s => (s === 2 && form.attendance === 'no') ? 5 : s + 1)
  const goBack = () => setStep(s => (s === 5 && form.attendance === 'no') ? 2 : s - 1)

  const [takenSeats, setTakenSeats]     = useState([])
  const [seatNameMap, setSeatNameMap]   = useState({})
  const [seatsLoading, setSeatsLoading] = useState(false)
  const [seatsFetchError, setSeatsFetchError] = useState(false)

  useEffect(() => {
    const stored = Number(localStorage.getItem(SUBMIT_COOLDOWN_KEY) || '0')
    if (!Number.isNaN(stored) && stored > Date.now()) {
      setSubmitBlockedUntil(stored)
    }
  }, [])

  useEffect(() => {
    if (step !== 3 && step !== 4) return
    setSeatsLoading(true)
    setSeatsFetchError(false)
    fetch(SCRIPT_ENDPOINT, { redirect: 'follow' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        if (!Array.isArray(data.taken)) throw new Error('unexpected shape')
        // support both old string[] format and new {seat,name}[] format
        if (data.taken.length === 0 || typeof data.taken[0] === 'string') {
          setTakenSeats(data.taken)
          setSeatNameMap({})
        } else {
          setTakenSeats(data.taken.map(t => t.seat))
          const map = {}
          data.taken.forEach(t => { if (t.name) map[t.seat] = t.name })
          setSeatNameMap(map)
        }
      })
      .catch(err => {
        console.warn('[RSVP] seat fetch failed:', err)
        setSeatsFetchError(true)
      })
      .finally(() => setSeatsLoading(false))
  }, [step])

  const handleSubmit = async () => {
    const now = Date.now()
    if (submitBlockedUntil > now) {
      setError('Formulár bol nedávno odoslaný. Skúste to prosím znovu neskôr.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      await fetch(SCRIPT_ENDPOINT, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          token:       RSVP_TOKEN,
          name:        form.name,
          attendance:  form.attendance,
          guests:      form.attendance === 'yes' ? form.guests : 0,
          dietary:     form.dietary.join(', '),
          drink:       form.drink,
          spirits:     form.spirits.join(', '),
          allergyNote: form.allergyNote,
          spiritNote:  form.spiritNote,
          seat:        form.seat,
          message:     form.message,
        }),
      })

      const blockedUntil = Date.now() + SUBMIT_COOLDOWN_MS
      setSubmitBlockedUntil(blockedUntil)
      localStorage.setItem(SUBMIT_COOLDOWN_KEY, String(blockedUntil))
      setSubmitted(true)
    } catch {
      setError('Nepodarilo sa pripojiť. Skontrolujte internetové pripojenie.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="rsvp">
        <div className="container">
          <div className="rsvp__success">
            <div className="rsvp__success-icon">{form.attendance === 'yes' ? '🥂' : '💌'}</div>
            <h3>
              {form.attendance === 'yes'
                ? `Tešíme sa na teba, ${form.name.split(' ')[0]}!`
                : `Ďakujeme, ${form.name.split(' ')[0]}, že si nás informoval/a`}
            </h3>
            <p>
              {form.attendance === 'yes'
                ? 'Tvoja účasť bola zaznamenaná. Uvidíme sa 19. septembra 2026!'
                : 'Bude nám chýbať tvoja prítomnosť. Budeme na teba myslieť!'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const dotSteps = form.attendance === 'no' ? [1, 2, 5] : [1, 2, 3, 4, 5]

  return (
    <section id="rsvp" className="rsvp">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
          <h2>Potvrďte účasť</h2>
          <p>Prosíme o odpoveď do 1. septembra 2026</p>
        </div>
        <div className="rsvp__wizard">
          <div className="rsvp__dots">
            {dotSteps.map(s => (
              <span key={s} className={`rsvp__dot${step === s ? ' rsvp__dot--active' : ''}`} />
            ))}
          </div>

          <div className="rsvp__card">

            {/* ── Step 1: Name + Email ── */}
            {step === 1 && (
              <div className="rsvp__step">
                <p className="rsvp__step-q">Krok 1 z 5</p>
                <h3 className="rsvp__step-title">Ako sa voláš?</h3>
                <div className="rsvp__fields">
                  <div className="rsvp__field">
                    <label className="rsvp__label" htmlFor="name">Meno hosťa</label>
                    <input id="name" type="text" required autoComplete="name"
                      placeholder="Vaše meno" className="rsvp__input"
                      value={form.name} onChange={e => set('name', e.target.value)} />
                  </div>
                </div>
                <div className="rsvp__nav">
                  <span />
                  <button className="rsvp__next" disabled={!form.name.trim()} onClick={goNext}>
                    Ďalej →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Attendance ── */}
            {step === 2 && (
              <div className="rsvp__step">
                <p className="rsvp__step-q">Krok 2 z 5</p>
                <h3 className="rsvp__step-title">Uvidíme sa, {form.name.split(' ')[0]}?</h3>
                <div className="rsvp__choice-grid">
                  <button
                    className={`rsvp__choice${form.attendance === 'yes' ? ' rsvp__choice--yes' : ''}`}
                    onClick={() => { set('attendance', 'yes'); setStep(3) }}
                  >
                    <span className="rsvp__choice-emoji">🥂</span>
                    <span className="rsvp__choice-text">Áno, prídem!</span>
                  </button>
                  <button
                    className={`rsvp__choice${form.attendance === 'no' ? ' rsvp__choice--no' : ''}`}
                    onClick={() => { set('attendance', 'no'); setStep(5) }}
                  >
                    <span className="rsvp__choice-emoji">💌</span>
                    <span className="rsvp__choice-text">Bohužiaľ, neprídem</span>
                  </button>
                </div>
                <div className="rsvp__nav">
                  <button className="rsvp__back" onClick={goBack}>← Späť</button>
                  <span />
                </div>
              </div>
            )}

            {/* ── Step 3: Dietary + Drinks (only if attending) ── */}
            {step === 3 && (
              <div className="rsvp__step">
                <p className="rsvp__step-q">Krok 3 z 5</p>
                <h3 className="rsvp__step-title">Jedlo & pitie</h3>

                <div className="rsvp__field">
                  <p className="rsvp__label" id="label-stravovanie">Stravovanie</p>
                  <div className="rsvp__chip-grid">
                    {DIETARY_OPTIONS.map(opt => (
                      <button key={opt.id}
                        className={`rsvp__chip${form.dietary.includes(opt.id) ? ' rsvp__chip--selected' : ''}`}
                        onClick={() => toggleDietary(opt.id)}
                      >{opt.label}</button>
                    ))}
                  </div>
                  {form.dietary.includes('allergy') && (
                    <>
                      <input type="text" className="rsvp__input" style={{ marginTop: '0.75rem' }}
                        placeholder="Aká alergia? *"
                        value={form.allergyNote}
                        onChange={e => set('allergyNote', e.target.value)} />
                      {!form.allergyNote.trim() && (
                        <p className="rsvp__field-hint">Prosím, uveď svoju alergiu.</p>
                      )}
                    </>
                  )}
                </div>

                <div className="rsvp__field">
                  <p className="rsvp__label" id="label-pitie">Pitie</p>
                  <p className="rsvp__drink-hint">Oslavujeme vo vinárstve, takže dúfame, že si dáte víno 🍷 Ak nie, radi pre vás zabezpečíme niečo iné.</p>
                  <div className="rsvp__drink-choice">
                    <label className={`rsvp__drink-option${form.drink === 'wine' ? ' rsvp__drink-option--selected' : ''}`}>
                      <input type="radio" name="drink" value="wine"
                        checked={form.drink === 'wine'}
                        onChange={() => { set('drink', 'wine'); set('spirits', []) }} />
                      🍷 Budem piť víno
                    </label>
                    <label className={`rsvp__drink-option${form.drink === 'other' ? ' rsvp__drink-option--selected' : ''}`}>
                      <input type="radio" name="drink" value="other"
                        checked={form.drink === 'other'}
                        onChange={() => set('drink', 'other')} />
                      🥃 Radšej si vyberiem iný alkohol
                    </label>
                  </div>
                  {form.drink === 'other' && (
                    <>
                      <div className="rsvp__chip-grid" style={{ marginTop: '0.75rem' }}>
                        {SPIRIT_OPTIONS.map(s => (
                          <button key={s}
                            className={`rsvp__chip${form.spirits.includes(s) ? ' rsvp__chip--selected' : ''}`}
                            onClick={() => toggleSpirit(s)}
                          >{s}</button>
                        ))}
                      </div>
                      {form.spirits.includes('Iné') && (
                        <>
                          <input type="text" className="rsvp__input" style={{ marginTop: '0.75rem' }}
                            placeholder="Čo by si si dal/a? *"
                            value={form.spiritNote}
                            onChange={e => set('spiritNote', e.target.value)} />
                          {!form.spiritNote.trim() && (
                            <p className="rsvp__field-hint">Prosím, uveď svoj nápoj.</p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="rsvp__nav">
                  <button className="rsvp__back" onClick={goBack}>← Späť</button>
                  <button className="rsvp__next" onClick={goNext}
                    disabled={
                      form.dietary.length === 0 ||
                      !form.drink ||
                      (form.drink === 'other' && form.spirits.length === 0) ||
                      (form.dietary.includes('allergy') && !form.allergyNote.trim()) ||
                      (form.spirits.includes('Iné') && !form.spiritNote.trim())
                    }
                  >Ďalej →</button>
                </div>
              </div>
            )}

            {/* ── Step 4: Seating preference (only if attending) ── */}
            {step === 4 && (
              <div className="rsvp__step">
                <p className="rsvp__step-q">Krok 4 z 5</p>
                <h3 className="rsvp__step-title">Kde si sadneš? 🪑</h3>
                <p className="rsvp__drink-hint">Vyber si miesto pri jednom zo stolov. Klikni na stoličku — klikni znova pre zrušenie výberu.</p>
                <p className="rsvp__drink-hint" style={{ marginTop: '-0.25rem' }}>
                  🙏 Prosíme, nenechávajte vedľa seba jedno voľné miesto — nech si každý nájde suseda!
                </p>
                {seatsLoading && <p className="rsvp__seats-loading">Načítavam obsadenosť…</p>}
                {seatsFetchError && (
                  <p className="rsvp__seats-loading" style={{ color: '#b94040' }}>
                    ⚠️ Nepodarilo sa načítať obsadenosť — miesta môžu byť nepresné.
                  </p>
                )}
                {SEAT_TABLES.map(({ id, icon, label }) => (
                  <div key={id} className="rsvp__table-section">
                    <p className="rsvp__table-label">{icon} {label}</p>
                    {id === 'outside' && (
                      <p className="rsvp__drink-hint" style={{ marginBottom: '0.5rem' }}>
                        ☂️ Terasa je krytá strechou a vykurovaná — aj v septembri bude pohodlne teplo.
                      </p>
                    )}
                    <div className="rsvp__table-layout">
                      <div className="rsvp__seat-row">
                        {Array.from({ length: 10 }, (_, i) => {
                          const sid = `${id}-${i + 1}`
                          const taken = takenSeats.includes(sid) && form.seat !== sid
                          const tip = taken
                            ? `Miesto ${i + 1} — ${seatNameMap[sid] || 'obsadené'}`
                            : `Miesto ${i + 1}`
                          return (
                            <button key={sid} title={tip}
                              className={`rsvp__seat-btn${form.seat === sid ? ' rsvp__seat-btn--selected' : taken ? ' rsvp__seat-btn--taken' : ''}`}
                              onClick={() => !taken && set('seat', form.seat === sid ? '' : sid)}
                              disabled={taken}
                            >{i + 1}</button>
                          )
                        })}
                      </div>
                      <div className="rsvp__table-surface">{label}</div>
                      <div className="rsvp__seat-row">
                        {Array.from({ length: 10 }, (_, i) => {
                          const sid = `${id}-${i + 11}`
                          const taken = takenSeats.includes(sid) && form.seat !== sid
                          const tip = taken
                            ? `Miesto ${i + 11} — ${seatNameMap[sid] || 'obsadené'}`
                            : `Miesto ${i + 11}`
                          return (
                            <button key={sid} title={tip}
                              className={`rsvp__seat-btn${form.seat === sid ? ' rsvp__seat-btn--selected' : taken ? ' rsvp__seat-btn--taken' : ''}`}
                              onClick={() => !taken && set('seat', form.seat === sid ? '' : sid)}
                              disabled={taken}
                            >{i + 11}</button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {!seatsLoading && (
                  <div className="rsvp__seat-legend">
                    <span><span className="rsvp__seat-sample" /> voľné</span>
                    <span><span className="rsvp__seat-sample rsvp__seat-sample--taken" /> obsadené</span>
                    <span><span className="rsvp__seat-sample rsvp__seat-sample--selected" /> tvoje</span>
                  </div>
                )}
                {form.seat && (
                  <p className="rsvp__seat-chosen">
                    ✨ Vybrané: {form.seat.startsWith('inside') ? '🏛️ Vnútri' : '🌙 Vonku'}, miesto č. {form.seat.split('-')[1]}
                  </p>
                )}
                <div className="rsvp__nav">
                  <button className="rsvp__back" onClick={goBack}>← Späť</button>
                  <button className="rsvp__next" onClick={goNext}>Ďalej →</button>
                </div>
              </div>
            )}

            {/* ── Step 5: Message + Submit ── */}
            {step === 5 && (
              <div className="rsvp__step">
                <p className="rsvp__step-q">{form.attendance === 'yes' ? 'Krok 5 z 5' : 'Krok 3 z 3'}</p>
                <h3 className="rsvp__step-title">
                  {form.attendance === 'yes' ? 'Niečo na záver?' : 'Chceš nám niečo odkázať?'}
                </h3>
                <div className="rsvp__field">
                  <label className="rsvp__label" htmlFor="rsvp-message">Správa pre novomanželov (nepovinné)</label>
                  <textarea id="rsvp-message" className="rsvp__textarea"
                    placeholder={form.attendance === 'yes' ? 'Blahoželanie, pieseň, vtip… 💛' : 'Odkaz, prianie… 💌'}
                    value={form.message}
                    onChange={e => set('message', e.target.value)} />
                </div>
                {error && <p className="rsvp__error">{error}</p>}
                <div className="rsvp__nav">
                  <button className="rsvp__back" onClick={goBack}>← Späť</button>
                  <button className="rsvp__submit" onClick={handleSubmit} disabled={loading || submitBlockedUntil > Date.now()}>
                    {loading ? 'Odosielam…' : 'Odoslať ✓'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
