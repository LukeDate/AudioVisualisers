import React, { useState, useEffect, useRef } from 'react';
import VisualDemo from './visualdemo';
import soundFile from '../music/it_comes_from_china.ogg';

const AudioDataContainer = () => {

    // const [analyserState, setAnalyserState] = useState();
    // const [freqArray, setFreqArray] = useState([]);
    // const [audioState, setAudioState] = useState();

    const [isplaying, setplaying] = useState(false);


    function play() {
        setplaying(true);
        audio.play();
    }

    function pause() {
        setplaying(false);
        audio.pause();
    }

    //audio context
    let context = new AudioContext();

    //create audio object from music file
    let audio = new Audio(soundFile);
    
    //create an analysernode to view fft
    let node = new AnalyserNode(context);

    //audio track media element source
    let source = context.createMediaElementSource(audio);

    //this analyser node allows fast fourier transform
    let analyser = context.createAnalyser();
        
    source.connect(analyser)

    analyser.connect(context.destination);


    analyser.sfftSize = 256;
    let freq_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freq_array)
    // let bufferLength = analyser.frequencyBinCount;
    // let dataArray = new Uint8Array(bufferLength);

    return(
        
            <VisualDemo 
                isPlaying={isplaying} 
                analyser={analyser} 
                dataArray={freq_array} 
                bufferLength={analyser.frequencyBinCount} 
                play={play}
                pause={pause} />
    )
}
export default AudioDataContainer;