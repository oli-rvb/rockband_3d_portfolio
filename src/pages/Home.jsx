import { useState, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import SceneLoader from '../components/SceneLoader'

import Island from '../models/Island';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import HomeInfo from '../components/HomeInfo';
import RotateHint from '../components/RotateHint';
import OttoVibing from '../models/OttoVibing';

import OneShotTest from '../assets/OneShotTest.mp3';
import { soundoff, soundon } from '../assets/icons';



const Home = () => {
  const audioRef = useRef(null);
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [displayStage, setDisplayStage] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const islandRef = useRef();

  useEffect(() => {
    const audio = new Audio(OneShotTest);
    audio.preload = 'none';
    audio.volume = 0.4;
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    }
  }, []);



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if(isPlayingMusic) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
    }

  }, [isPlayingMusic])

  useEffect(() => {
    if (currentStage !== displayStage) {
      setIsFading(true);
      const fadeOutTimer = setTimeout(() => {
        setDisplayStage(currentStage);
        setIsFading(false);
      }, 500); // Half of animation duration for fade out

      return () => clearTimeout(fadeOutTimer);
    }
  }, [currentStage, displayStage])

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

  return (
    <section className="w-full h-screen relative">
      <SceneLoader />
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {displayStage && (
          <div className={`fade-card ${isFading ? 'fade-out' : 'fade-in'}`}>
            <HomeInfo currentStage={displayStage} />
          </div>
        )}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near: 1, far: 1000, rotation: [0.15, 0, 0], fov: 50, position:[0, 3, 25]}}
        shadows
        dpr={[1, 2]}
        frameloop="demand"
      >
        <pointLight
          position={[0, 8, 0]}
          intensity={900}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={100}
        />

        {/* Critical models - load first */}
        <Suspense fallback={null}>
          <Sky islandRef={islandRef} baseRotationY={islandRotation[1]} />
          <Island
            ref={islandRef}
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

      <RotateHint isRotating={isRotating} />

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