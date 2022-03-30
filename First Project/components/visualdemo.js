import React, { useRef, useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
// import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import EqualizerIcon from '@material-ui/icons/Equalizer';
// import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Canvas from './canvas';

const VisualDemo = ({...props}) => {

  const [canvas, setCanvasRef] = useState();
  let Ref = useRef();
  // let canvas = document.querySelector("#canvas");

  useEffect(() => {
    setCanvasRef(Ref.current);
  }, []);
  // function renderFrame() {
  //   // React.createElement()
  //   // let canvas = document.querySelector("#canvas");
  //   let canvas = React.createElement('canvas', {});
  //   console.log(canvas);
  //   requestAnimationFrame(renderFrame);
  //   // canvas.width = window.innerWidth;
  //   // canvas.height = window.innerHeight;
  //   props.analyser.getByteFrequencyData(props.dataArray);
    
  //   let ctx = canvas.getContext('2d');
  //   // let width = canvas.width;
  //   // let height = canvas.height;
    
  //   let barWidth = (750 / props.bufferLength) * 2.5;
  //   let barHeight;
  //   let x = 0;
  //   // ctx.fillStyle = "#000";
  //   ctx.fillRect(0, 0, 750, 200);
  //   x=0;
  //   for(let i=0; i < props.bufferLength; i++){
  //     barHeight = props.dataArray[i];
  //     let r = barHeight + (25 * (i/props.bufferLength));
  //     let g = 250 * (i/props.bufferLength);
  //     let b = 50;
  //     ctx.fillStyle = "rgb(" + r + "," + g + "," + b +")";
  //     ctx.fillRect(x, 200 - barHeight, barWidth, barHeight);
  //     x += barWidth + 1;
  //   }
  // }
  return (
    <>
      <canvas ref={Ref} height={200} width={750} id="canvas">
        {/* {renderFrame()} */}
        {canvas && <Canvas 
          canvas={canvas} 
          bufferLength={props.bufferLength}
          dataArray={props.dataArray}
        analyser={props.analyser}/>}
      </canvas>
      <button className="test" onClick={() => props.play()}>Play Audio</button>
      <button onClick={() => props.pause()}>Pause Audio</button>
    </>
  )
}

export default VisualDemo;