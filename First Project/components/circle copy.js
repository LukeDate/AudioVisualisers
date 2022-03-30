import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const CircleCanvas = styled('canvas')`
    margin: 0 auto;
    // height: 100%;
`;



const CircleContainer = () => {
    let ref = useRef();

    const [ctx, setCtx] = useState('')
    useEffect(() => {
        let getCtx = ref.current;
        setCtx(getCtx.getContext("2d"));
        initPage();
    }, [])


    console.log(ctx)

    const animationLooper = (analyser, freqArr) => {
            let bars = 200;
            // ctx.imageSmoothingEnabled = false;
            console.log('HELLO', ctx && ctx);
            ctx && ctx.beginPath();
            ctx && ctx.arc(center_x,center_y,radius,0,2*Math.PI);
            ctx && ctx.stroke();
    
            analyser.getByteFrequencyData(freqArr);
    
            for(let i=0; i < bars; i++) {
                let rads = Math.PI * 2 / bars;
                let bar_height = 100;
                let bar_width = 2;
                let x = center_x + Math.cos(rads * i) * (radius);
                let y = center_y + Math.sin(rads * i) * (radius);
                let x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
                let y_end = center_y + Math.sin(rads * i)*(radius + bar_height);
                drawBar(x, y, x_end, y_end, bar_width, freqArr[i], ctx && ctx);
            }
            window.requestAnimationFrame(animationLooper);
        
    }
    
    const drawBar = (x1, y1, x2, y2, width,frequency, ctx) => {
        console.log(ctx);
        let lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
    const initPage = () => {
        let audio = new Audio();
        let context = new (window.AudioContext || window.webkitAudioContext)();
        let analyser = context.createAnalyser();
        let freqArr = new Uint8Array(analyser.frequencyBitCount);
        audio.src = "/it_came_from_china.mp3";
        let source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        audio.play();
        animationLooper(analyser, freqArr);
}
    
    let radius = 150;
    let center_x = ctx.width / 2;
    let center_y = ctx.height / 2;

    
    return (
        <Wrapper>
            <CircleCanvas width="600" height="600" ref={ref}>
                {/* <Circle />
                <Bar /> */}
                {/* {ctx && drawCircle()} */}
                {/* {ctx && drawBars()} */}
            </CircleCanvas>
        </Wrapper>
    )
}

export default CircleContainer;