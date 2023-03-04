import { sketch } from 'p5js-wrapper';

let video;

let noiseShader;
let pixelationShader;
let opacityShader;

let buffer;
let buffer2;

let tick = 0;
const videoDimensions = [3240, 1080]

sketch.preload = () => {
  video = createVideo('video.webm');
  video.elt.muted = true;
  video.size(...videoDimensions);
  video.loop();
  video.hide();

  noiseShader = loadShader('noiseShader/shader.vert', 'noiseShader/shader.frag');
  pixelationShader = loadShader('pixelationShader/shader.vert', 'pixelationShader/shader.frag');
  opacityShader = loadShader('opacityShader/shader.vert', 'opacityShader/shader.frag');
}

sketch.setup = () => {
  buffer = createGraphics(windowWidth, windowHeight, WEBGL);
  buffer2 = createGraphics(windowWidth, windowHeight, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

sketch.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
}

const noiseFadeSpeeed = 0.004;
const noiseMin = 0;
const noiseMax = 0.2;
const pixelationFadeSpeeed = 1;
const pixelationMin = 1;
const pixelationMax = 100;
const pixelationStep = 4;
const opacityFadeSpeeed = 0.005;
const opacityMin = 0;
const opacityMax = 1;

sketch.draw = () => {
  image(buffer, 0, 0);
  buffer.background(0);
  image(buffer2, 0, 0);
  buffer2.background(0);

  noiseShader.setUniform('texture', video);
  noiseShader.setUniform('time', tick);
  noiseShader.setUniform("dimensions", [width, height]);
  noiseShader.setUniform("videoDimensions", videoDimensions)
  noiseShader.setUniform("noiseStrength", Math.max(noiseMin, noiseMax - tick * noiseFadeSpeeed));
  buffer.shader(noiseShader);

  pixelationShader.setUniform('texture', buffer);
  pixelationShader.setUniform("dimensions", [width, height]);
  pixelationShader.setUniform('pixelSize', Math.max(pixelationMin, pixelationMax - ~~(tick * pixelationFadeSpeeed / pixelationStep) * pixelationStep));
  buffer2.shader(pixelationShader);

  opacityShader.setUniform('texture', buffer2);
  opacityShader.setUniform('opacity', Math.min(opacityMax, opacityMin + tick * opacityFadeSpeeed ));
  shader(opacityShader);

  buffer.rect(0, 0, width, height);
  buffer2.rect(0, 0, width, height);
  rect(0, 0, width, height);
  tick++;
}

