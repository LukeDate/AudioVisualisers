export const groundVertexShader = () => {
    return `
    
    #include <common>
    #include <uv_pars_vertex>
    #include <uv2_pars_vertex>
    #include <envmap_pars_vertex>
    #include <color_pars_vertex>
    #include <fog_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <skinning_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>
    void main() {
        #include <uv_vertex>
        #include <uv2_vertex>
        #include <color_vertex>
        #include <skinbase_vertex>
        #ifdef USE_ENVMAP
        #include <beginnormal_vertex>
        #include <morphnormal_vertex>
        #include <skinnormal_vertex>
        #include <defaultnormal_vertex>
        #endif
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <project_vertex>
        #include <logdepthbuf_vertex>
        #include <worldpos_vertex>
        #include <clipping_planes_vertex>
        #include <envmap_vertex>
        #include <fog_vertex>
}
    `
}

export const testVertShader = () => {
    return `
    varying float z;
    varying vec3 vUv;
    uniform float u_time;
    void main() {
        vUv = position;
        z = abs(position.z);
        
        
        float floor_z = round(z);
        
        float z_multiplier = (32.0 - z) / 8.0;


        z = position.z * (sin((u_data_arr[int(floor_z)] /200.0) + (u_modulate_min / 200.0)) + u_noise * u_amplitude * (u_modulate_max/200.0));
        //x = position.x;
        //y = position.y;
        //z = position.z;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x + x, position.y + y, position.z + z, 1.0);
    }
    `
}


export const palmVertexShader = () => {
    return`
    uniform float time;
    attribute vec3 instPosition;
  + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace(
    #include <begin_vertex>`,
    `#include <begin_vertex>
      
      transformed.x *= sign(instPosition.x); // flip
      vec3 ip = instPosition;
      ip.z = mod(50. + ip.z + time * speed., 100.) - 50.;
      transformed *= 0.4 + smoothstep(50., 45., abs(ip.z)) * 0.6;
      transformed += ip;
    `
}

export const sunVertexShader = () => {
    return `
    varying vec2 vUv;
    #include <common>
    #include <uv_pars_vertex>
    #include <uv2_pars_vertex>
    #include <envmap_pars_vertex>
    #include <color_pars_vertex>
    #include <fog_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <skinning_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>
    void main() {
        #include <uv_vertex>
        #include <uv2_vertex>
        #include <color_vertex>
        #include <skinbase_vertex>
        #ifdef USE_ENVMAP
        #include <beginnormal_vertex>
        #include <morphnormal_vertex>
        #include <skinnormal_vertex>
        #include <defaultnormal_vertex>
        #endif
        #include <begin_vertex>
            vUv = uv;
        
        #include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <project_vertex>
        #include <logdepthbuf_vertex>
        #include <worldpos_vertex>
        #include <clipping_planes_vertex>
        #include <envmap_vertex>
        #include <fog_vertex>
  }`
}