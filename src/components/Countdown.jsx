import { useState, useEffect } from 'react'

const WEDDING_DATE = new Date('2026-09-19T15:00:00')

function getTimeLeft() {
  const diff = WEDDING_DATE - new Date()
  if (diff <= 0) return null
  return {
    days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  }
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000 * 60 * 60)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: timeLeft?.days,  label: 'Dní' },
    { value: timeLeft?.hours, label: 'Hodín' },
  ]

  return (
    <section id="countdown" className="countdown">
      <div className="container">
        <div className="section-header">
          <div className="ornament"><span className="ornament-icon">✿</span></div>
          <h2>Odpočítavame</h2>
          <p>Do svadby zostáva</p>
        </div>
        {timeLeft ? (
          <>
            <div className="countdown__grid">
              {units.map(u => (
                <div key={u.label} className="countdown__item">
                  <div className="countdown__number">{String(u.value).padStart(2, '0')}</div>
                  <div className="countdown__label">{u.label}</div>
                </div>
              ))}
            </div>
            <p className="countdown__quote">
              „A láska nikdy nezanikne." — 1 Kor 13:8
            </p>
          </>
        ) : (
          <p className="countdown__quote">Dnes je ten deň! 🎊</p>
        )}
      </div>
    </section>
  )
}
