import { useEffect, useRef } from 'react'

const ServerClosedModal = ({ onClose }) => {
  const buttonRef = useRef(null)

  // Move focus into the dialog, restore it to the trigger on close.
  useEffect(() => {
    const trigger = document.activeElement
    buttonRef.current?.focus()
    return () => {
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    // z-[100]: above the header (z-10) and the SceneLoader (z-50). Covering the whole
    // viewport also stops pointer events from reaching the canvas (no island drag).
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5 pb-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="server-closed-title"
        className="neo-brutalism-blue relative flex w-full max-w-md flex-col gap-3 pt-6 pb-12 px-8 text-center text-white"
      >
        <h2 id="server-closed-title" className="text-xl font-semibold sm:text-2xl">Serveur fermé</h2>
        <p className="font-medium sm:text-lg">
          Le serveur de Blue Suburb Hour est actuellement fermé. Revenez nous voir bientôt !
        </p>
        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          // Single focusable element: keep Tab from escaping the modal.
          onKeyDown={(e) => { if (e.key === 'Tab') e.preventDefault() }}
          className="neo-brutalism-white neo-btn cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Revenir en arrière
        </button>
      </div>
    </div>
  )
}

export default ServerClosedModal
