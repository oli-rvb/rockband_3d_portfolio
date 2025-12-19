import { useState, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'

import Island from '../models/Island';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import HomeInfo from '../components/HomeInfo';
import OttoVibing from '../models/OttoVibing';

import OneShotTest from '../assets/OneShotTest.mp3';
import { soundoff, soundon } from '../assets/icons';
import { preloadModels } from '../utils/preload';



const Home = () => {
  // Preload models as early as possible
  useEffect(() => {
    preloadModels();
  }, []);

  const audioRef = useRef(new Audio(OneShotTest));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const spotRef = useRef();





  useEffect(() => {
    if(isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    }

  }, [isPlayingMusic])

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, 0, 0];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1, 0]
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [-1, -3, 10]
    }

    return [screenScale, screenPosition];
  }

  const [islandScale, islandPostion, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  /* useGUI((gui) => {
    //control the position
    const positionFolder = gui.addFolder("Position Spotlight");
    positionFolder.add(spotRef.current.position, "x", -50, 50);
    positionFolder.add(spotRef.current.position, "y", -300, 300);
    positionFolder.add(spotRef.current.position, "z", -50, 50);

    //control the rotation
    const rotationFolder = gui.addFolder("Rotation");
    rotationFolder.add(spotRef.current.rotation, "x", -Math.PI, Math.PI);
    rotationFolder.add(spotRef.current.rotation, "y", -Math.PI, Math.PI);
    rotationFolder.add(spotRef.current.rotation, "z", -Math.PI, Math.PI);

    //control the scale
    const sclaeFolder = gui.addFolder("Scale");
    sclaeFolder.add(spotRef.current.scale, "x", -100, 100);
    sclaeFolder.add(spotRef.current.scale, "y", -100, 100);
    sclaeFolder.add(spotRef.current.scale, "z", -100, 100);

});  */


  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near: 1, far: 1000, rotation: [0.15, 0, 0], fov: 50, position:[0, 3, 25]}}
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Lights - no Suspense needed */}
        <spotLight 
          position={[4,7,2]} 
          intensity={0} 
          angle={Math.PI/2} 
          color="#0c8cbf" 
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-camera-left={-0.5} 
          shadow-camera-right={0.5} 
          shadow-camera-top={0.5} 
          shadow-camera-bottom={-0.5}
        />
        <directionalLight position={[3, 1, 1]} castShadow intensity={0} shadow-camera-left={-20} shadow-camera-right={20} shadow-camera-top={20} shadow-camera-bottom={-20} shadow-mapSize={1024}/>
        <pointLight
          position={[0, 8, 0]} 
          castShadow 
          intensity={900}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-camera-near={1}
          shadow-camera-far={100}
          shadow-camera-left={-1} 
          shadow-camera-right={1} 
          shadow-camera-top={1} 
          shadow-camera-bottom={-1}
        />
        <spotLight position={[0,9,-25]} intensity={0} rotation={[2, 0, 0]} castShadow shadow-mapSize={1024}/>
        <ambientLight intensity={0}/>
        <hemisphereLight skyColor="#b1e1ff" groundColor="84948" intensity={0}/>
        
        {/* Critical models - load first */}
        <Suspense fallback={<Loader />}>
          <Sky isRotating={isRotating}/>
          <Island 
            position={islandPostion}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
        
        {/* Secondary models - load progressively */}
        <Suspense fallback={null}>
          <Plane 
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, Math.PI/2, 0.1]}
          />
        </Suspense>
        
        <Suspense fallback={null}>
          <OttoVibing 
            isRotating={isRotating}
            scale={[0.5, 0.5, 0.5]}
            position={[0, -4, 10]}
            rotation={[0, 0.8, 0]}
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img 
          src={!isPlayingMusic ? soundoff : soundon}
          alt='sound'
          className='w-10 h-10 cursor-pointer object-contain'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
    )
}

export default Home