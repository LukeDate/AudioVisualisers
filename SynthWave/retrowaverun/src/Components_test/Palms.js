import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
// const Logs = () => {
//     return (
//         <mesh>
//             <cylinderBufferGeometry 
//                 args={([0.25, 0.125, 10, 5, 4, true])}
//                 translate={[0, 5, 0]}
//                 />
//         </mesh>
//     );
// }

// const Leaves = () => {
//     return (
//         <mesh>
//             <circleBufferGeometry 
//                 translate={[0, 1.25, 0]}
//                 rotateX={THREE.Math.randFloatSpread(Math.PI * 0.5)}
//                 rotateY={THREE.Math.randFloat(0, Math.PI * 2)}
//                 scale={[0.25, 1, THREE.Math.randFloat(1,1.25)]}
//                 attributes={{
//                     position: {
//                         setY: [0, 0.25]
//                     }}
//                 }
//             />
//         </mesh>
//     )
// }


const logs = new THREE.CylinderBufferGeometry(0.25, 0.125, 10, 5, 4, true)
const leaves = new THREE.CircleBufferGeometry(1.25, 4)
export const Palms = () => {
    const palmGeometries = [];

    logs.translate(0,5,0);
    palmGeometries.push(logs)

    for(let i = 0; i < 20; i++) {
        leaves.translate(0, 1.25, 0);
        leaves.rotateX(-Math.PI * 0.5);
        leaves.scale(0.25, 1, THREE.Math.randFloat(1, 1.5));
        leaves.attributes.position.setY(0, 0.25);
        leaves.rotateX(THREE.Math.randFloatSpread(Math.PI * 0.5));
        leaves.rotateY(THREE.Math.randFloat(0, Math.PI * 2));
        leaves.translate(0, 10, 0);
        palmGeometries.push(leaves);
    }

    const palmFinalGeometry = BufferGeometryUtils.mergeBufferGeometries(palmGeometries, false)
    palmFinalGeometry.rotateZ(THREE.Math.degToRad(-1.5));
    const palmPos = [];
    
    for (let i = 0; i < 5; i++){
        palmPos.push(-5, 0, i * 20 - 10 - 50);
        palmPos.push(5, 0, i * 20 - 50);
    }
    return (
        <mesh>
            <instancedBufferGeometry 
                attributes={
                    {
                        position: palmFinalGeometry.attributes.position,
                        uv: palmFinalGeometry.attributes.uv
                    }
                }
                index={palmFinalGeometry.index}
                addAttribute={["instPosition", new THREE.InstancedBufferAttribute(new Float32Array(palmPos), 3)]}
            />
            <meshBasicMaterial 
                color={0x00ff88}
                side={THREE.DoubleSide}
                //ADD THE PALMS SHADERS HERE
            />
        </mesh>
    )
}