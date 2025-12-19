import { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

import planeScene from '../assets/3d/plane.glb';

const Plane = ({ isRotating, ...props}) => {
    const ref = useRef();
    const {scene, animations} = useGLTF(planeScene);
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        console.log({isRotating});
        if(isRotating){
            actions['Take 001'].play();
        } else {
            actions['Take 001'].stop();
        }
    }, [actions, isRotating])

    return (
        <mesh {...props} castShadow receiveShadow>
            <primitive object={scene} />
        </mesh>
    )
}

export default Plane