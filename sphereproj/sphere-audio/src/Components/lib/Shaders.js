const vertexShader = () => {
    return `
        varying float x;
        varying float y;
        varying float z;
        varying float s;
        varying float t;
        varying vec3 vUv;
        uniform float u_time;
        uniform float u_amplitude;
        uniform float[64] u_data_arr;
        uniform float u_modulate_min;
        uniform float u_modulate_max;
        uniform float u_noise;
        void main() {
            vUv = position;
            x = abs(position.x);
            y = abs(position.y);
            z = abs(position.z);
            float floor_x = round(x);
            float floor_y = round(y);
            float floor_z = round(z);
            float x_multiplier = (32.0 - x) / 8.0;
            float y_multiplier = (32.0 - y) / 8.0;
            float z_multiplier = (32.0 - z) / 8.0;

            x = position.x * (sin((u_data_arr[int(floor_x)] /200.0) + (u_modulate_min / 200.0)) + u_noise * u_amplitude * (u_modulate_max/200.0));
            y = position.y * (sin((u_data_arr[int(floor_y)] /200.0) + (u_modulate_min / 200.0)) + u_noise * u_amplitude * (u_modulate_max/200.0));
            z = position.z * (sin((u_data_arr[int(floor_z)] /200.0) + (u_modulate_min / 200.0)) + u_noise * u_amplitude * (u_modulate_max/200.0));
            //x = position.x;
            //y = position.y;
            //z = position.z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x + x, position.y + y, position.z + z, 1.0);
        }
      `;
  };
  
  const fragmentShader = () => {
    return `
      varying float x;
      varying float y;
      varying float z;
      varying vec3 vUv;
      uniform float u_time;
      // uniform vec3 u_black;
      // uniform vec3 u_white;
      void main() {
        gl_FragColor = vec4((32.0 - abs(x)) / 32.0, (32.0 - abs(y)) / 32.0, (32.0 - abs(z)) / 32.0, 1.0);
      }
    `;
  };
  
  export { vertexShader, fragmentShader };