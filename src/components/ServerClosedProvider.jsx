import { useCallback, useMemo, useState } from 'react'

import { ServerClosedContext } from '../hooks/useServerClosed'
import ServerClosedModal from './ServerClosedModal'

// The external bluesuburbhour.com server is closed: every link that used to point to it
// opens this modal instead. A modal (rather than a route) keeps Home mounted, so the
// island's rotation and current stage survive.
const ServerClosedProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return (
    <ServerClosedContext.Provider value={value}>
      {children}
      {isOpen && <ServerClosedModal onClose={close} />}
    </ServerClosedContext.Provider>
  )
}

export default ServerClosedProvider
