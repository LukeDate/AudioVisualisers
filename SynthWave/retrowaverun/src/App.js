import './App.css';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { GroundAndRoad } from './Components_test/GroundAndRoad';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Sun } from './Components_test/Sun';
import { Palms } from './Components_test/Palms';
import { Floor } from './Components_test/Floor';
import { Road } from './Components_test/Road';
import { RoadLines } from './Components_test/RoadLines';
import { SideWalk } from './Components_test/SideWalk';
import { Grid } from './Components/Grid';
import * as THREE from 'three'

function App() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  
  return (
    <div className="App">
      <Canvas dpr={window.devicePixelRatio} color={['white']}>
        <color attach="background" />
        <fog attach="background" args={['#000000',1,1.25]}/>
        <Suspense fallback={null}>
          <ambientLight args={['#ffffff', 10]} />
          <OrbitControls
              enableDamping
            // enablePan={false}
            // minDistance={5}
            // maxDistance={7}
            // maxPolarAngle={Math.PI * 0.55}
            // minPolarAngle={Math.PI * 0.25}
            // target={[0, 1.8, 0]}
            />
           
          <perspectiveCamera 
            args={[75, sizes.width/sizes.height, 0.01, 20]}
            position={[0, -0.06, 3.8]}
          >
            <Grid />
            <Grid />
          </perspectiveCamera>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
