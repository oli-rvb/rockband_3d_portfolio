import { useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

import { DRACO_DECODER_PATH } from '../utils/draco'
import planeScene from '../assets/3d/plane.glb';

useGLTF.preload(planeScene, DRACO_DECODER_PATH)

const Plane = ({ isRotating, ...props}) => {
    const { invalidate } = useThree();
    const {scene, animations} = useGLTF(planeScene, DRACO_DECODER_PATH);
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        if(isRotating){
            actions['Take 001']?.play();
        } else {
            actions['Take 001']?.stop();
        }
        invalidate();
    }, [actions, isRotating, invalidate])

    return (
        <group {...props}>
            <primitive object={scene} />
        </group>
    )
}

export default Plane
