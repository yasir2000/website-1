import {
  WebGLRenderer,
  OrthographicCamera,
  Mesh,
  Scene,
  ShaderMaterial,
  PlaneBufferGeometry,
  Clock,
  Vector2,
} from 'three'

import store from '../store.js'
import gsap from 'gsap'

const vertex = `
precision mediump float;

varying vec2 vUv;

void main(){
  vec3 pos = position;

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`

const fragment = `
precision mediump float;

uniform vec2 uProgress;

uniform float uTime;
uniform float uBend;
uniform float uMidAlpha;

uniform bool uOut;

varying vec2 vUv;

float scale = 4.;
float smoothness = 0.0001;
float seed = 10.;

float random(vec2 co)
{
    highp float a = seed;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f*f*(3.0-2.0*f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

vec4 a = vec4(1., 1., 1., 1.);
vec4 b = vec4(1., 1., 1., 0.);
vec4 c = vec4(22. / 255., 33. / 255., 92. / 255., 1.);

#define M_PI 3.1415926535897932384626433832795

void main() {
  vec2 uv = vUv;
  vec2 uvF = uv;

  float n = noise(uv * scale);
  
  float p = mix(-smoothness, 1.0 + smoothness, uProgress.x);
  float lower = p - smoothness;
  float higher = p + smoothness;
  
  float q = smoothstep(lower, higher, n);

  uvF.y -= ((sin(uvF.x * M_PI) * uBend) * .25);
  float tf = step(uvF.y, uProgress.y);

  vec4 color = mix(a, b, 1. - q);
  vec4 finalColor = mix(color, c, tf);

  if(finalColor.a < 0.0001) discard;
  gl_FragColor = finalColor;
}
`

class GlTransition {

  constructor() {
    this.scene = new Scene()
    
    this.camera = new OrthographicCamera(
      store.width / - 2, 
      store.width / 2, 
      store.height / 2, 
      store.height / - 2, 
      1, 
      10 
    )
    this.camera.lookAt(this.scene.position)
    this.camera.position.z = 1
  
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
    })

    this.renderer.setPixelRatio(gsap.utils.clamp(1, 1.5, window.devicePixelRatio))
    this.renderer.setSize(store.width, store.height)
    this.renderer.setClearColor(0xffffff, 0)

    this.clock = new Clock()

    this.init()
  }

  createMesh() {
    this.uniforms = {
      uProgress: { value: new Vector2(1, 1) },
      uMidAlpha: { value: 1 },
      uTime: { value: 0 },
      uBend: { value: 0 },
      uOut: { value: true }
    }

    this.geometry = new PlaneBufferGeometry(1, 1)
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      fragmentShader: fragment,
      vertexShader: vertex,
    })

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.scale.set(store.width, store.height, 1)
    this.mesh.frustumCulled = false
    this.scene.add(this.mesh)
  }

  render() {
    this.renderer.render(this.scene, this.camera)   
  }

  intro() {
    gsap.set(store.body, {
      alpha: 1
    })
    if (location.pathname === '/') {
      this.introHome()
    } else {
      this.uniforms.uProgress.value.y = 0
      this.in()
    }
  }

  introHome() {
    return gsap.timeline({
      onUpdate: () => {
        this.render()
      }
    })
    .fromTo(this.uniforms.uProgress.value, {
      y: 1
    }, {
      y: 0,
      ease: 'expo.inOut',
      duration: 2.5
    }, 0) 
    .to(this.bend(), {
      progress: 1,
      duration: 2.5,
      ease: 'expo.inOut',
    }, 0)
  }

  in() {
    return gsap.timeline({
      onUpdate: () => {
        this.render()
        this.uniforms.uTime.value = this.clock.getElapsedTime()
      }
    })
    .fromTo(this.uniforms.uProgress.value, {
      x: 0
    }, {
      x: 1,
      ease: 'power1.out',
      duration: 0.75
    }, 0) 
  }

  out(cb) {
    return gsap.timeline({
      onUpdate: () => {
        this.render()
        this.uniforms.uTime.value = this.clock.getElapsedTime()
      },
      onComplete: () => {
        cb()
      }
    })
    .fromTo(this.uniforms.uProgress.value, {
      x: 1
    }, {
      x: 0,
      ease: 'power1.out',
      duration: 0.75
    }, 0) 
  }

  bend() {
    return gsap.timeline({ paused: true })
    .to(this.uniforms.uBend, {
      value: 1.25,
      ease: 'linear',
      duration: 0.65
    })
    .to(this.uniforms.uBend, {
      value: 0,
      ease: 'linear',
      duration: 0.35
    })
  }

  init() {
    store.body.appendChild(this.renderer.domElement)
    this.renderer.domElement.classList.add('c-transition-gl', 'js-transition-gl')
    this.createMesh()
    this.render()
  }
}

export default new GlTransition()