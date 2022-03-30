import React from 'react';
import styled from 'styled-components';
import song from '../music/it_comes_from_china.ogg';

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

let ctx, x_end, y_end, bar_height;
const width = window.innerWidth;
const height = window.innerHeight;
const bars = 200;
const bar_width = 2;
const radius = 80;
const center_x = width / 2;
const center_y = height / 2;

class CircleContainer extends React.Component{
    constructor(props) {
        super(props);
        this.audio = new Audio(song);
        this.canvas = React.createRef()
        this.state = {
            analyser: '',
            freqArray: [],
            audio: {}
         };
    }

    componentDidMount() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createMediaElementSource(this.audio);

        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
    }

    animationLooper(canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
        gradient.addColorStop(0,"rgba(35, 7, 77, 1)");
        gradient.addColorStop(1,"rgba(204, 83, 51, 1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        for (var i = 0; i < bars; i++) {
            //divide a circle into equal part
            const rads = Math.PI * 2 / bars;

            // Math is magical
            bar_height = this.frequency_array[i]*0.7;

            const x = center_x + Math.cos(rads * i) * (radius);
            const y = center_y + Math.sin(rads * i) * (radius);
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
            //draw a bar
            this.drawBar(x, y, x_end, y_end, this.frequency_array[i], ctx, canvas);
        }
     }

     drawBar(x1=0, y1=0, x2=0, y2=0, frequency, ctx) {
        const lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = bar_width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    tick = () => {
        this.animationLooper(this.canvas.current);
        this.analyser.getByteTimeDomainData(this.frequency_array);
        this.rafId = requestAnimationFrame(this.tick);
    }

    togglePlay() {
        
        console.log(this.audio);
        
        if(this.audio.paused) {
            this.audio.play()
            this.rafId = requestAnimationFrame(this.tick);
          } else {
            this.audio.pause();
            cancelAnimationFrame(this.rafId);
          }
    }

    render() {
        return (
            <Wrapper>
                <canvas ref={this.canvas} />
               <button onClick={this.togglePlay.bind(this)}>Play/Pause</button>
            </Wrapper>
        )
    }
     
}

export default CircleContainer;