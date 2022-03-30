import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
export const SideWalk = () => {
    let sidewalkTopLeftGeometry = new THREE.PlaneBufferGeometry(8, 300, 0, 0);
	sidewalkTopLeftGeometry.translate(-10, 110, 0.5);
	sidewalkTopLeftGeometry.rotateX(-Math.PI * 0.5);
    
	let sidewalkSideLeftGeometry = new THREE.PlaneBufferGeometry(0.5, 300, 0, 0);
	sidewalkSideLeftGeometry.translate(0.06, 110, 6);
	sidewalkSideLeftGeometry.rotateX(-Math.PI * 0.5);
	sidewalkSideLeftGeometry.rotateZ(Math.PI * 0.49);
    
	let sidewalkTopRightGeometry = new THREE.PlaneBufferGeometry(8, 300, 0, 0);
	sidewalkTopRightGeometry.translate(10, 110, 0.5);
	sidewalkTopRightGeometry.rotateX(-Math.PI * 0.5);
    
	let sidewalkSideRightGeometry = new THREE.PlaneBufferGeometry(0.5, 300, 0, 0);
	sidewalkSideRightGeometry.translate(0.44, 110, -6);
	sidewalkSideRightGeometry.rotateX(-Math.PI * 0.5);
	sidewalkSideRightGeometry.rotateZ(Math.PI * 0.49);
    
	// Merge all sidewalk geometries
	let sidewalkConception = [];
	sidewalkConception.push(sidewalkTopLeftGeometry);
	sidewalkConception.push(sidewalkSideLeftGeometry);
	sidewalkConception.push(sidewalkTopRightGeometry);
	sidewalkConception.push(sidewalkSideRightGeometry); // Push all geometries into sidewalkConception array
    
	let sidewalkGeometry = BufferGeometryUtils.mergeBufferGeometries(
        sidewalkConception,
		false
        ); // Merge all geometries within sidewalkConception array
        
    return (
        <mesh>
            <instancedBufferGeometry 
                attributes={
                    {
                        position: sidewalkGeometry.attributes.position,
                        uv: sidewalkGeometry.attributes.uv
                    }
                }
                index={sidewalkGeometry.index}
            />
            <meshBasicMaterial 
                color={0xffffff}
                transparent
                opacity={0.3}
            />
        </mesh>
    )
}