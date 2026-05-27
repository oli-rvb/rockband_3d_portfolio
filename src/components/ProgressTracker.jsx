import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'

const ProgressTracker = ({ onProgressChange }) => {
  const { progress, active } = useProgress()

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange({ progress, active })
    }
  }, [progress, active, onProgressChange])

  return null
}

export default ProgressTracker


