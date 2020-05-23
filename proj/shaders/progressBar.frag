#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;

uniform float Psupplies;
void main() {
	vec4 color = vec4(0.2, 0.2, 0.2, 1.0);
	float filter = -0.5+Psupplies;

	if (coords.x < filter){
    gl_FragColor =vec4(-coords.x+0.5, coords.x+0.5, 0.0, 1.0);
  }
  if (coords.x > filter){
    gl_FragColor = color;
  }

}
