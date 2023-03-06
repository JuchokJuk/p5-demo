import { sketch } from 'p5js-wrapper';

let video;

let noiseShader;
let pixelationAndOpacityShader;

let buffer;

let tick = 0;
const videoDimensions = [3240, 1080]

sketch.preload = () => {
  video = createVideo('video.webm');
  video.elt.muted = true;
  video.size(...videoDimensions);
  video.loop();
  video.hide();

  noiseShader = loadShader('shaders/default.vert', 'shaders/noiseShader.frag');
  pixelationAndOpacityShader = loadShader('shaders/default.vert', 'shaders/pixelationFadeShader.frag');
}

sketch.setup = () => {
  buffer = createGraphics(windowWidth, windowHeight, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  buffer.noStroke();
  setAttributes('premultipliedAlpha', false);
  buffer.setAttributes('premultipliedAlpha', false);
}

sketch.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
}

const speed = 1;

const noiseFadeSpeeed = 0.002 * speed;
const pixelationFadeSpeeed = 0.8 * speed;
const opacityFadeSpeeed = 0.007 * speed;

const pixelationStep = 4;

const noiseMin = 0;
const noiseMax = 0.15;
const pixelationMin = 1;
const pixelationMax = 100;
const opacityMin = 0;
const opacityMax = 1;

sketch.draw = () => {
  image(buffer, 0, 0);
  buffer.background(0, 0, 0, 0);
  background(0, 0, 0, 0);

  noiseShader.setUniform('texture', video);
  noiseShader.setUniform('time', tick);
  noiseShader.setUniform("dimensions", [width, height]);
  noiseShader.setUniform("videoDimensions", videoDimensions)
  noiseShader.setUniform("noiseStrength", Math.max(noiseMin, noiseMax - tick * noiseFadeSpeeed));
  buffer.shader(noiseShader);

  pixelationAndOpacityShader.setUniform('texture', buffer);
  pixelationAndOpacityShader.setUniform("dimensions", [width, height]);
  pixelationAndOpacityShader.setUniform('pixelSize', Math.max(pixelationMin, pixelationMax - ~~(tick * pixelationFadeSpeeed / pixelationStep) * pixelationStep));
  pixelationAndOpacityShader.setUniform('opacity', Math.min(opacityMax, opacityMin + tick * opacityFadeSpeeed));
  shader(pixelationAndOpacityShader);


  buffer.rect(0, 0, width, height);
  rect(0, 0, width, height);
  tick++;
}

