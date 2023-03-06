precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform vec2 dimensions;
uniform float pixelSize;
uniform float opacity;

void main() {
    vec2 coord = vTexCoord;
    // texture is loaded upside down and backwards by default, so flip it
    coord.y = 1.0 - coord.y;
    
    // pixelation
    coord *= dimensions;
    coord = dimensions/2.0 + pixelSize * floor((coord - dimensions/2.0) / vec2(pixelSize, pixelSize));
    coord /= dimensions;
    vec4 texture = texture2D(texture, coord);
  
    // fade
    texture.rgba *= opacity;
  
    gl_FragColor = texture;
}