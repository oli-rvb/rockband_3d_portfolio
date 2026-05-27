import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="w-20 h-20 border-4 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin"/>
        </div>
        <p className="text-white text-lg font-semibold">{Math.round(progress)}% loaded</p>
      </div>
    </Html>
  )
}

export default Loader