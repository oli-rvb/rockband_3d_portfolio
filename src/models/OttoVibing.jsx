import { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useGUI } from '../hooks/useGUI';


import otto_vibingScene from '../assets/3d/otto_vibing.glb';

const OttoVibing = ({isRotating,...props}) => {
    const groupRef = useRef();
    const {scene, animations} = useGLTF(otto_vibingScene);
    const { actions } = useAnimations(animations, scene);

/*     groupRef.current = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      }; */
    
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
        console.log({isRotating});
        if(isRotating){
            actions['mixamo.com'].play();
        } else {
            actions['mixamo.com'].stop();
        }
    }, [actions, isRotating])

/*     useEffect(() => {
        console.log(actions);
        actions['mixamo.com'].play();

    }, []); */

    return (
        <mesh {...props} castShadow receiveShadow>
            <primitive object={scene} />
        </mesh>
    )
}

export default OttoVibing