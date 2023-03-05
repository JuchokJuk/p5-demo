precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform vec2 dimensions;
uniform float pixelSize;
uniform float opacity;

void main() {
    vec2 coords = vTexCoord;
    // texture is loaded upside down and backwards by default, so flip it
    coords.y = 1.0 - coords.y;
    
    // pixelation
    coords *= dimensions;
    coords = dimensions/2.0 + pixelSize * floor((coords - dimensions/2.0) / vec2(pixelSize, pixelSize));
    coords /= dimensions;
    vec4 texture = texture2D(texture, coords);
  
    // fade
    texture.rgba *= opacity;
  
    gl_FragColor = texture;
}