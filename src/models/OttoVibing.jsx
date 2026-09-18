import { useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

import { DRACO_DECODER_PATH } from '../utils/draco'
import otto_vibingScene from '../assets/3d/otto_vibing.glb';

useGLTF.preload(otto_vibingScene, DRACO_DECODER_PATH)

const OttoVibing = ({isRotating,...props}) => {
    const { invalidate } = useThree();
    const {scene, animations} = useGLTF(otto_vibingScene, DRACO_DECODER_PATH);
    const { actions } = useAnimations(animations, scene);

    /* useGUI((gui) => {
        //control the position
        const positionFolder = gui.addFolder("Position Otto");
        positionFolder.add(groupRef.current.position, "x", -50, 50);
        positionFolder.add(groupRef.current.position, "y", -30, 30);
        positionFolder.add(groupRef.current.position, "z", -50, 50);

        //control the rotation
        const rotationFolder = gui.addFolder("Rotation");
        rotationFolder.add(groupRef.current.rotation, "x", -Math.PI, Math.PI);
        rotationFolder.add(groupRef.current.rotation, "y", -Math.PI, Math.PI);
        rotationFolder.add(groupRef.current.rotation, "z", -Math.PI, Math.PI);

        //control the scale
        const sclaeFolder = gui.addFolder("Scale");
        sclaeFolder.add(groupRef.current.scale, "x", -100, 100);
        sclaeFolder.add(groupRef.current.scale, "y", -100, 100);
        sclaeFolder.add(groupRef.current.scale, "z", -100, 100);

    }); */

    useEffect(() => {
        if(isRotating){
            actions['mixamo.com']?.play();
        } else {
            actions['mixamo.com']?.stop();
        }
        invalidate();
    }, [actions, isRotating, invalidate])

    return (
        <group {...props}>
            <primitive object={scene} />
        </group>
    )
}

export default OttoVibing
