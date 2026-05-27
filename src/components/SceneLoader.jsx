import { useEffect, useMemo, useState } from 'react'

const RING_CIRC = 691.15 // 2 * pi * 110

const SceneLoader = ({ progress = 0, active = true, onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    if (!active && progress === 100) {
      setIsHiding(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onLoaded) onLoaded()
      }, 300)
      return () => clearTimeout(timer)
    } else if (active) {
      setIsVisible(true)
      setIsHiding(false)
    }
  }, [active, progress, onLoaded])

  const stars = useMemo(() => {
    return Array.from({ length: 120 }, () => ({
      size: Math.random() < 0.15 ? 2 : 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      minOp: 0.1 + Math.random() * 0.15,
      maxOp: 0.4 + Math.random() * 0.5,
    }))
  }, [])

  if (!isVisible) return null

  const clamped = Math.max(0, Math.min(100, progress))
  const dashOffset = RING_CIRC - (clamped / 100) * RING_CIRC

  return (
    <div className={`bsh-loader ${isHiding ? 'is-hiding' : ''}`}>
      <div className="bsh-stars">
        {stars.map((s, i) => (
          <span
            key={i}
            className="bsh-star"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              top: `${s.top}%`,
              left: `${s.left}%`,
              '--d': `${s.duration}s`,
              '--delay': `${s.delay}s`,
              '--min-op': s.minOp,
              '--max-op': s.maxOp,
            }}
          />
        ))}
      </div>

      <div className="bsh-inner">
        <div className="bsh-vinyl-scene">
          <div className="bsh-vinyl-glow" />

          <svg className="bsh-ring-svg" viewBox="0 0 248 248">
            <defs>
              <linearGradient id="bshBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <circle cx="124" cy="124" r="110" fill="none" stroke="#1a1a1e" strokeWidth="2" />
            <circle
              className="bsh-ring-progress"
              cx="124"
              cy="124"
              r="110"
              fill="none"
              stroke="url(#bshBlueGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={RING_CIRC}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="bsh-vinyl-disc">
            <div className="bsh-vinyl-label">
              <span className="bsh-vinyl-label-text">BSH</span>
            </div>
            <div className="bsh-vinyl-hole" />
          </div>
        </div>

        <div className="bsh-text-block">
          <div className="bsh-band-name">Blue Suburb Hour</div>
          <div className="bsh-band-sub">Pop · Alternative · Rock</div>
        </div>

        <div className="bsh-progress-block">
          <div className="bsh-progress-track">
            <div className="bsh-progress-fill" style={{ width: `${clamped}%` }} />
          </div>
          <div className="bsh-progress-meta">
            <span className="bsh-progress-label">Loading experience</span>
            <span className="bsh-progress-pct">{Math.floor(clamped)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SceneLoader
