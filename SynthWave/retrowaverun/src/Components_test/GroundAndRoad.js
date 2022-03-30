import React, { useCallback } from 'react';
import { groundFragmentShader } from "../Shaders/fragmentShader"
import { groundVertexShader } from "../Shaders/vertexShader"
import { useFrame } from '@react-three/fiber'
import { noise } from '../Shaders/Noise';
export const GroundAndRoad = () => {
    let uniforms = {
            "diffuse": {
              "value": {
                "r": 1,
                "g": 0,
                "b": 0.9333333333333333,
              }
            },
            "opacity": {
              "value": 1
            },
            "map": {
              "value": null
            },
            "uvTransform": {
              "value": {
                "elements": [
                  1,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1
                ]
              }
            },
            "uv2Transform": {
              "value": {
                "elements": [
                  1,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1
                ]
              }
            },
            "alphaMap": {
              "value": null
            },
            "specularMap": {
              "value": null
            },
            "envMap": {
              "value": null
            },
            "flipEnvMap": {
              "value": -1
            },
            "reflectivity": {
              "value": 1
            },
            "refractionRatio": {
              "value": 0.98
            },
            "maxMipLevel": {
              "value": 0
            },
            "aoMap": {
              "value": null
            },
            "aoMapIntensity": {
              "value": 1
            },
            "lightMap": {
              "value": null
            },
            "lightMapIntensity": {
              "value": 1
            },
            "fogDensity": {
              "value": 0.00025
            },
            "fogNear": {
              "value": 42.5
            },
            "fogFar": {
              "value": 50
            },
            "fogColor": {
              "value": {
                "r": 1,
                "g": 0.6666666666666666,
                "b": 0.26666666666666666
              }
            },
            "time": {
                type: 'f',
              "value": 14.453999999999999
            },
            "clippingPlanes": {
              "value": null,
              "needsUpdate": false
            }
          }
    // let uniforms = {
    //     time: {
    //         type: 'f',
    //         value: 14.453999999999999
    //     },
    //     opacity: {
    //         type: 'f',
    //         value: 1
    //     },
    //     diffuse: {
    //         type: 'v3',
    //         value: {
    //             r: 1,
    //             g: 0,
    //             b: 0.9333333333333333,
    //         }
    //     },
    // }
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        uniforms.time.value = a;
      })
    
    const speed = 10;

    let oBC = useCallback(shader => {
        shader.vertexShader =
    `
        uniform float time;
        varying vec3 vPos;
    ` + noise + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
        vec2 tuv = uv;
        float t = time * 0.01 * ${speed}.; 
        tuv.y += t;
        transformed.y = snoise(vec3(tuv * 5., 0.)) * 5.;
        transformed.y *= smoothstep(5., 15., abs(transformed.x)); // road stripe
        vPos = transformed;
        `);

        shader.fragmentShader =
        `
        #extension GL_OES_standard_derivatives : enable
        uniform float time;
        varying vec3 vPos;
    
        float line(vec3 position, float width, vec3 step){
          vec3 tempCoord = position / step;
          
          vec2 coord = tempCoord.xz;
          coord.y -= time * ${speed}. / 2.;
    
          vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord * width);
          float line = min(grid.x, grid.y);
          
          return min(line, 1.0);
        }
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
        `
        float l = line(vPos, 2.0, vec3(2.0));
        vec3 base = mix(vec3(0, 0.75, 1), vec3(0), smoothstep(5., 7.5, abs(vPos.x)));
        vec3 c = mix(outgoingLight, base, l);
        gl_FragColor = vec4(c, diffuseColor.a);
        `
      );
  
    }, [])  
     

    return (
        <mesh rotation={[-Math.PI/2,0, 0]} color={[0xff00ee]}>
            <color attach="material" args={[0xff00ee]}/>
            <planeBufferGeometry
                attach='geometry' 
                args={[100, 100, 200, 200]} 
                />
            <shaderMaterial
                extensions={{derivatives: true}}
                onBeforeCompile={oBC}
                attach="material"  
                uniforms={uniforms}
                wireframe
                vertexShader={groundVertexShader()}
                fragmentShader={groundFragmentShader()}
            />
        </mesh>
    )   
}