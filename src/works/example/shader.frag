precision mediump float;

float rand(in vec2 xy) {
  return fract(sin(dot(xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rand2(in vec2 xy) {
  return fract(sin(vec2(dot(xy, vec2(127.1, 311.7)), dot(xy, vec2(269.5, 183.3)))) * 43758.5453123);
}

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uScreen;

void main() {
  const float SCALE = 100.0;
  vec2 coord = gl_FragCoord.xy / SCALE + uTime;
  vec2 mouse = uMouse / SCALE + uTime;
  vec2 i = floor(coord.xy);

  const float MAX_MANHATTAN_DIFF = 50.0;
  const float MOUSE_DISTANCE = 150.0;
  const float MIN_SCALE = 0.1;
  const float MAX_SCALE = 10.0;

  float min_dist = distance(coord, mouse);
  vec2 min_diff = vec2(0.0);
  vec2 min_scale_diff = vec2(0.0);

  for(int ix = -1; ix < 2; ++ix) {
    for(int iy = -1; iy < 2; ++iy) {
      vec2 pos = i + vec2(ix, iy);
      vec2 local = pos + rand2(pos);
      vec2 diff = MAX_MANHATTAN_DIFF * 2.0 * (rand2(pos) - 0.5);
      float scale = mix(MIN_SCALE, MAX_SCALE, rand(pos));
      float dist = sqrt(pow(distance(coord, local), 2.0) + pow(MOUSE_DISTANCE / SCALE, 2.0));
      float cond = step(dist, min_dist);
      min_dist = mix(min_dist, dist, cond);
      min_diff = mix(min_diff, scale * diff, cond);
      min_scale_diff = mix(min_scale_diff, scale * (pos - local), cond);
    }
  }

  vec2 uv = clamp(vTextureCoord + (min_diff + min_scale_diff) / uScreen, 0.0, 1.0);

  const vec3 C = vec3(0.0, 1.0, 1.0);
  const vec3 M = vec3(1.0, 0.0, 1.0);
  const vec3 Y = vec3(1.0, 1.0, 0.0);
  const vec3 W = vec3(1.0, 1.0, 1.0);
  gl_FragColor = vec4(mix(mix(C, M, uv.x), mix(Y, W, uv.x), uv.y), 1.0);
}
