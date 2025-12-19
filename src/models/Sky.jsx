import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import skyScene from '../assets/3d/night_sky_hd2.glb'

const Sky = ({ isRotating }) => {
    const sky = useGLTF(skyScene);
    const skyRef = useRef();

    useFrame((_, delta) => {
      if(isRotating){
        skyRef.current.rotation.y -= 0.15 * delta
      }
    })

    return (
    <mesh ref={skyRef} scale={[3, 3, 3]} rotation={[3.5,0,0]}>
        <primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky