import { createGridMaterial } from "../Shaders/createGridMaterial"
import * as THREE from 'three';
import { groundVertexShader, testVertShader } from "../Shaders/vertexShader";
import { groundFragmentShader, testFragShader } from "../Shaders/fragmentShader";
import { useFrame } from '@react-three/fiber'

export const Floor = () => {
    let floorMaterial = new THREE.MeshBasicMaterial({
		color: 0xff1e99,
	});

    let clock = new THREE.Clock();
    let uniforms = {
        u_time: {
            type: "f",
            value: 0.0,
        },
        // u_resolution: {
        //     type: 'v2',
        //     value: (1000.0, 1000.0)
        // }
    }
    
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        uniforms.u_time.value = a;
    })
    //createGridMaterial(floorMaterial)
    console.log(uniforms.u_time);
    return(
        <mesh rotation={[-Math.PI/2, 0, 0]}>
            <planeBufferGeometry
                attach="geometry" 
                args={[300,300,100,100]} 
                translate={[0,110,0]}/>
            <shaderMaterial
                attach="material" 
                //color={0xffffff}
                //wireframe
                uniforms={uniforms}
                //vertexColors={0xffffff}
                fragmentShader={testFragShader()}
                //vertexShader={testVertShader()}
            />
            {/* {createGridMaterial(floorMaterial)} */}
        </mesh>
    )
}