precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform float opacity;

void main() {

    vec2 coords = vTexCoord;
    coords.y = 1.0 - coords.y;

    vec4 texColor = texture2D(texture, coords) * opacity;
  
    gl_FragColor = texColor;

}