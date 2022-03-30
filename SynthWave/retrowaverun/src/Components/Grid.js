import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { testVertShader } from '../Shaders/vertexShader';
import { ImprovedNoise } from 'https://unpkg.com/three/examples/jsm/math/ImprovedNoise.js';

export const Grid = () => {
    const [vertices, setVertices] = useState([0.0,0.0,0.15]);
    const [textureMap, displacementMap] = useLoader(
        TextureLoader, ['grid.png', 'displacement.png'
    ]);
    let ref1 = useRef();
    let ref2 = useRef();
    let planeRef = useRef();
    let clock = new THREE.Clock();
    let uniforms = {}
    
    useFrame(() => {
        //ref1.current.position.z = (clock.getElapsedTime() * 0.15) % 2
        //ref2.current.position.z = ((clock.getElapsedTime() * 0.15)%2)-2
    })

    const generateHeight = (width, height) => {
        const size = width * height;
        const data = new Uint8Array( size );
        const perlin = new ImprovedNoise();
        const z = Math.random() * 100;

        let quality = 1;
        for(let j =0; j < 4; j++) {
            for(let i=0; i<size; i++){
                const x = i % width;
                const y = ~~(i / width );
                data[i] += Math.abs(perlin.noise(x/quality, y/quality, z) * quality *1.75);
            }

            quality *= 5;
        }

        return data;
    }

  

    const position1 = [0.0,0.0,0.15];
    const position2 = [0.0,0.0,-1.85];
    const data = generateHeight(24, 5);
    
    const calcNewVerts = (vertices) => {
        console.log('verts', vertices);
        let vertArray = vertices.current.attributes.position.array
        for ( let i = 0, j = 0, l = vertArray.length; i < l; i ++, j += 3 ) {

            vertArray[ j + 1 ] = data[ i ] * 10;

        }
        return setVertices(vertArray)
    }

    return (
        <>
        <mesh ref={ref1} rotation={[-Math.PI*0.5,0,0]} position={vertices}>
            <planeGeometry  
                ref={planeRef}  
                args={[1,2,24,24]} 
                position={planeRef.current && calcNewVerts(planeRef)} 
            />
            <meshBasicMaterial
               
                color={0xffffff}
                
                //map={textureMap}
                //displacementMap={displacementMap}
                //displacementScale={0.4}
                />
        </mesh>
        <mesh ref={ref2} rotation={[-Math.PI*0.5,0,0]} position={position2}>
            <planeGeometry args={[1,2,24,24]} />
            <meshStandardMaterial 
                color={0xffffff} 
                map={textureMap}
                displacementMap={displacementMap}
                displacementScale={0.4}
                />
        </mesh>
        </>
    )
}