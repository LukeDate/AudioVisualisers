import React from "react";
import AudioPlayer from "./audio/AudioPlayer";
import * as THREE from 'three';

const Dashboard = () => {
    const listener = new THREE.AudioListener();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/(window.innerHeight) , 0.1, 1000 )
    camera.add( listener );
    return (
        <>
            <AudioPlayer />
        </>
    )
}

export default Dashboard