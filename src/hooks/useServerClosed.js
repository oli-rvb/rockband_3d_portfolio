import { createContext, useContext } from 'react'

// Kept in a .js file (no components) so eslint-plugin-react-refresh stays happy;
// the provider lives in components/ServerClosedProvider.jsx.
export const ServerClosedContext = createContext(null)

const useServerClosed = () => {
  const ctx = useContext(ServerClosedContext)
  if (!ctx) throw new Error('useServerClosed must be used inside <ServerClosedProvider>')
  return ctx
}

export default useServerClosed
