import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'

const SHOW_DELAY = 1300 // 300 ms (SceneLoader fade-out) + 1 s of breathing room
const SMALL_DELAY = 5000 // idle time after release before the small reminder shows up
const FADE_OUT_MS = 500 // keep in sync with .rotate-hint.is-out in index.css

// The big centered intro plays once per page load, even across client-side navigation.
let introSeen = false

const RotateHint = ({ isRotating }) => {
  // Same signal as SceneLoader, so the hint never shows while its overlay is up.
  const { progress, active } = useProgress()
  const [variant, setVariant] = useState(null) // null | 'intro' | 'small'
  const [leaving, setLeaving] = useState(false)
  const wasRotating = useRef(false)

  const ready = !active && progress === 100

  useEffect(() => {
    if (introSeen || !ready) return
    const timer = setTimeout(() => {
      if (introSeen) return
      introSeen = true
      setLeaving(false)
      setVariant('intro')
    }, SHOW_DELAY)
    return () => clearTimeout(timer)
  }, [ready])

  useEffect(() => {
    if (isRotating) {
      wasRotating.current = true
      introSeen = true
      setLeaving(true)
      const timer = setTimeout(() => setVariant(null), FADE_OUT_MS)
      return () => clearTimeout(timer)
    }
    if (!wasRotating.current) return
    const timer = setTimeout(() => {
      setLeaving(false)
      setVariant('small')
    }, SMALL_DELAY)
    return () => clearTimeout(timer)
  }, [isRotating])

  if (!variant) return null

  return (
    <div className={`rotate-hint-wrap is-${variant}${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className={`rotate-hint ${leaving ? 'is-out' : 'is-in'}`}>
        <div className="swipe">
          <span className="swipe-lane" />
          <svg className="swipe-arrow swipe-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          <svg className="swipe-arrow swipe-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
          <div className="swipe-mover">
            <span className="swipe-trail" />
            <svg
              className="swipe-hand"
              viewBox="0 0 24 24"
              fill="rgba(255, 255, 255, 0.2)"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 14a8 8 0 0 1-8 8" />
              <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
              <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
              <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
              <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </div>
        </div>
        <p className="rotate-hint-text">Glisse pour tourner autour de l&apos;île</p>
      </div>
    </div>
  )
}

export default RotateHint
