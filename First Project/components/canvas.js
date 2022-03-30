const Canvas = ({...props}) => {
   
        // React.createElement()
        // let canvas = document.querySelector("#canvas");
        // let canvas = React.createElement('canvas', {});

        console.log(props.canvas);
        requestAnimationFrame(Canvas);
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        props.analyser.getByteFrequencyData(props.dataArray);
        
        let ctx = props.canvas.getContext('2d');
        // let width = canvas.width;
        // let height = canvas.height;
        
        let barWidth = (750 / props.bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        // ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 750, 200);
        x=0;
        for(let i=0; i < props.bufferLength; i++){
          barHeight = props.dataArray[i];
          let r = barHeight + (25 * (i/props.bufferLength));
          let g = 250 * (i/props.bufferLength);
          let b = 50;
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b +")";
          ctx.fillRect(x, 200 - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
}

export default Canvas;