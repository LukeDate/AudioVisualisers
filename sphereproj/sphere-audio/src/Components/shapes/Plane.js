import * as THREE from 'three';

const Plane = (test) => {
    const planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0x6904ce,
        side: THREE.DoubleSide,
        wireframe: true
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

    const render = () => {
        test.scene.add(planeMesh)
        requestAnimationFrame(render);
        planeMesh.rotation.z += -0.001 * Math.PI;
        planeMesh.position.set(0, 0, 0);
    }

    render();
}

export default Plane;


