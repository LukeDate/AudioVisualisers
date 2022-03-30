import * as THREE from "three"
import { fragmentShader, vertexShader } from "../lib/Shaders"
import SimplexNoise from 'simplex-noise';

export const Sphere = (uniforms, analyser, dataArray, test) => {
    const sphereGeometry = new THREE.SphereGeometry(35,16,16)
    
    const sphereCustomMaterial = new THREE.ShaderMaterial({ 
        uniforms: uniforms,
        vertexShader: vertexShader(),
        fragmentShader: fragmentShader(),
        wireframe: true
    })

    //helper functions
    function fractionate(val, minVal, maxVal) {
        return (val - minVal)/(maxVal - minVal);
    }

    function max(arr){
        return arr.reduce(function(a, b){ return Math.max(a, b); })
    }

    function modulate(val, minVal, maxVal, outMin, outMax) {
        var fr = fractionate(val, minVal, maxVal);
        var delta = outMax - outMin;
        return outMin + (fr * delta);
    }

    function avg(arr){
        var total = arr.reduce(function(sum, b) { return sum + b; });
        return (total / arr.length);
    }    

    //meshes
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereCustomMaterial);

    const simplex = new SimplexNoise()
    var time = window.performance.now();
    const noise = simplex.noise3D(
        sphereMesh.position.x + time * 0.00007,
        sphereMesh.position.y + time * 0.00008,
        sphereMesh.position.z + time * 0.00009
    )

    const render =  () => {
        //sphereMesh.rotateOnAxis(sphereMesh.position.x);
        let lowerHalfArray = dataArray && dataArray.slice(0, (dataArray.length/2) - 1);
        let upperHalfArray = dataArray && dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);
        
        let lowerMax = max(lowerHalfArray);
        let lowerMaxFr = lowerHalfArray && lowerMax / lowerHalfArray.length;

        let upperAvg = avg(upperHalfArray);
        let upperAvgFr = upperHalfArray && upperAvg / upperHalfArray.length;

        let modulateMin = modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8);
        let modulateMax = modulate(upperAvgFr, 0, 1, 0, 4);

        analyser.getByteFrequencyData(dataArray);
        uniforms.u_data_arr.value = dataArray;
        uniforms.u_modulate_min.value = modulateMin;
        uniforms.u_modulate_max.value = modulateMax;
        uniforms.u_noise = noise;
        test.scene.add(sphereMesh);
        
        //sphereMesh.rotation.y -= -0.001 * Math.PI
            //sphereMesh.rotation.x = sphereMesh.getWorldPosition.x + 0.005 * Math.PI
        //console.log("current rotation", sphereMesh.rotation.x)
        requestAnimationFrame(render);
        };

    render();
}
