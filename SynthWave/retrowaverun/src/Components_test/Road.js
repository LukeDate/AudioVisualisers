import { createGridMaterial } from "../Shaders/createGridMaterial"

export const Road = () => {
   return (
        <mesh rotation={[-Math.PI/2, 0, 0]} >
            <planeBufferGeometry
                attach="geometry" 
                args={[12,300,1,1]} 
                translate={[0,110,0.1]}
                
                />
            <meshBasicMaterial
                attach="material" 
                color={0xffffff}
                transparent
                opacity={0.7}
                //wireframe
            />
        </mesh>
    )
}