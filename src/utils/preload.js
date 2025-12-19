// Import all model paths for preloading
import skyScene from '../assets/3d/night_sky_hd2.glb';
import islandScene from '../assets/3d/ile_flottante_text.glb';
import planeScene from '../assets/3d/plane.glb';
import ottoVibingScene from '../assets/3d/otto_vibing.glb';

// Preload models by creating link elements to trigger browser caching
// This helps the browser start downloading models earlier
export const preloadModels = () => {
  const models = [skyScene, islandScene, planeScene, ottoVibingScene];
  
  models.forEach((modelPath) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'fetch';
    link.href = modelPath;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

