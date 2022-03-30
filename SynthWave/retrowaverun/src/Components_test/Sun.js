import React from 'react';
import { sunFragmentShader } from "../Shaders/fragmentShader"
import { sunVertexShader } from "../Shaders/vertexShader"
import { useFrame } from '@react-three/fiber'

export const Sun = () => {
   
    let uniforms = {
        time: {
            type: 'f',
            value: 0
        },
        // diffuse:{
        //     type: 'v3',
        //     value: 0
        // },
        // opacity: {
        //     type: 'f',
        //     value: 0
        // }
    }
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        uniforms.time.value = a;
      })

    const myMesh = React.useRef() 
    return (
        <mesh position={[0, 0, -500]} ref={myMesh}>
            <circleBufferGeometry attach="geometry" args={[200, 64]} />
            {/* <shaderMaterial
                attach="material" 
                color={0xff8800}
                fog={false}
                uniforms={uniforms}
                transparent
                vertexShader={sunVertexShader()}
                fragmentShader={sunFragmentShader()}
                wireframe
            /> */}
            <meshBasicMaterial color={0xff8800}/>
        </mesh>
    )
}