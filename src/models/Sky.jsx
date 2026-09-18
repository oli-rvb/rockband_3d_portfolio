import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import skyScene from '../assets/3d/night_sky_hd2.glb'

// 1 = the stars turn exactly with the island (as if the camera orbited it).
// Lower it (e.g. 0.5) for a slower, parallax-style starfield.
const SKY_ROTATION_FACTOR = 1

const Sky = ({ islandRef, baseRotationY = 0 }) => {
  const sky = useGLTF(skyScene)
  const pivotRef = useRef()

  // Follow the island every frame (drag, inertia and keyboard all end up in island.rotation.y).
  useFrame(() => {
    const island = islandRef?.current
    if (!island || !pivotRef.current) return
    pivotRef.current.rotation.y = (island.rotation.y - baseRotationY) * SKY_ROTATION_FACTOR
  })

  return (
    // The pivot rotates around world Y like the island; the inner mesh keeps the artistic tilt.
    <group ref={pivotRef}>
      <mesh scale={[3, 3, 3]} rotation={[3.5, 0, 0]}>
        <primitive object={sky.scene} />
      </mesh>
    </group>
  )
}

export default Sky
