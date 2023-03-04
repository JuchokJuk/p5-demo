precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform vec2 dimensions;
uniform float pixelSize;

void main() {

    vec2 coords = vTexCoord;
    coords.y = 1.0 - coords.y;
    
    coords *= dimensions;
    coords = dimensions/2.0 + pixelSize * floor((coords - dimensions/2.0) / vec2(pixelSize, pixelSize));
    coords /= dimensions;
  
    vec4 texColor = texture2D(texture, coords);
  
    gl_FragColor = texColor;

}