
export const createGridMaterial = (materialVar) => {
    materialVar.onBeforeCompile = (shader) => {
		shader.uniforms.speed = {
			value: this.animationSpeed,
		};
		shader.uniforms.time = {
			value: 0,
		};
		shader.vertexShader =
			`
            uniform float speed;
			uniform float time;
			varying vec3 vPos;
			` + shader.vertexShader;
		shader.vertexShader = shader.vertexShader.replace(
			`#include <begin_vertex>`,
			`#include <begin_vertex>
				vec2 tuv = uv;
				float t = time * 0.001 * speed;
				vPos = transformed;
				`
		);
		shader.fragmentShader =
			`
			#extension GL_OES_standard_derivatives : enable
            uniform float speed;
			uniform float time;
			varying vec3 vPos;
			float line(vec3 position, float width, vec3 step){
				vec3 tempCoord = position / step;
				vec2 coord = tempCoord.xz;
				coord.y -= time * speed / 2.;
				vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord * width);
				float line = min(grid.x, grid.y);
				return min(line, 1.0);
			}
			` + shader.fragmentShader;
		shader.fragmentShader = shader.fragmentShader.replace(
			`gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
			`
				float l = line(vPos, 1.0, vec3(2.0)); // grid line width
				vec3 base = mix(vec3(0, 0.75, 0), vec3(0), smoothstep(0., 0., abs(vPos.x))); //ROAD COLOR
				vec3 c = mix(outgoingLight, base, l);
				gl_FragColor = vec4(c, diffuseColor.a);
				`
		);
		this.materialShaders.push(shader);
	};
}