import React, { useEffect } from 'react';
import SceneInit from '../lib/SceneInit';
import Plane from '../shapes/Plane';
import { Sphere } from '../shapes/Sphere';

const AudioPlayer = () => {
    let test, audioContext, audioElement, dataArray, analyser, source;
   
    
    const setupAudioContext = () => {
        audioContext = new window.AudioContext();
        audioElement = document.getElementById("myAudio");
        source = audioContext.createMediaElementSource(audioElement);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 1024;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      };

    const uniforms = {
        u_time: {
            type: "f",
            value: 1.0,
        },
        u_amplitude: {
            type: "f",
            value: 3.0,
        },
        u_data_arr: {
            type: "float[64]",
            value: dataArray,
        },
        u_modulate_min: {
            type: "f",
            value: 1.0,
        },
        u_modulate_max: {
            type: "f",
            value: 1.0,
        },
        u_noise: {
            type: "f",
            value: 1.0,
        }
    };

    const play = async () => {
        if (audioContext === undefined) {
          setupAudioContext();
        }

        //uniforms originally here

    };

    useEffect(() => {
        test = new SceneInit("myThreeJsCanvas");
        test.initScene();
        test.animate();
      });

    return (
        <div className="flex flex-col items-center justify-center">
      <div className="absolute bottom-2 right-2">
        <audio
          id="myAudio"
          src="8_Age_of_Phase.wav"
          className="w-80"
          controls
          onPlay={() => play()}
        />
        </div>
        <canvas id="myThreeJsCanvas">
        {console.log(test)}
        {test && Plane(test)}
        {test && Sphere(uniforms, analyser, dataArray, test)}   
        </canvas>
        
        </div>
    )
}
export default AudioPlayer;