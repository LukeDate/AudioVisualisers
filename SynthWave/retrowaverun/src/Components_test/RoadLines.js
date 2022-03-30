import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three'
export const RoadLines = () => {
    let roadLineLeftGeometry = new THREE.PlaneBufferGeometry(0.35, 300, 1, 1);
	roadLineLeftGeometry.translate(-5.2, 110, 0.2);
	roadLineLeftGeometry.rotateX(-Math.PI * 0.5);

	let roadLineRightGeometry = new THREE.PlaneBufferGeometry(0.35, 300, 1, 1);
	roadLineRightGeometry.translate(5.2, 110, 0.2);
	roadLineRightGeometry.rotateX(-Math.PI * 0.5);

	let roadLineCenterLeftGeometry = new THREE.PlaneBufferGeometry(
		0.15,
		300,
		1,
		1
	);
	roadLineCenterLeftGeometry.translate(-1.8, 110, 0.2);
	roadLineCenterLeftGeometry.rotateX(-Math.PI * 0.5);

	let roadLineCenterRightGeometry = new THREE.PlaneBufferGeometry(
		0.15,
		300,
		1,
		1
	);
	roadLineCenterRightGeometry.translate(1.8, 110, 0.2);
	roadLineCenterRightGeometry.rotateX(-Math.PI * 0.5);

    let roadLinesConception = [];
	roadLinesConception.push(roadLineLeftGeometry);
	roadLinesConception.push(roadLineRightGeometry);
	roadLinesConception.push(roadLineCenterLeftGeometry);
	roadLinesConception.push(roadLineCenterRightGeometry);

    const roadLinesGeometry = BufferGeometryUtils.mergeBufferGeometries(roadLinesConception, false)
    return(
        <mesh rotateX={[-Math.PI/2]}>
            <instancedBufferGeometry 
                attributes={
                    {
                        position: roadLinesGeometry.attributes.position,
                        uv: roadLinesGeometry.attributes.uv
                    }
                }
                index={roadLinesGeometry.index}
            />
            <meshBasicMaterial 
                color={0xffffff}
                transparent
                opacity={0.3}
            />
        </mesh>
    )
}