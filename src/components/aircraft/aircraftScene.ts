import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createAircraft } from "./createAircraft";
import { ASSESSMENT_ZONES } from "@/data/assessmentZones";

export type AircraftScene = ReturnType<typeof mountAircraftScene>;
export type SceneAction = "left" | "right" | "top" | "reset";

const HIGHLIGHT = 0x2f7098;
const DEFAULT_YAW = -0.65, DEFAULT_PITCH = 0.3, MIN_PITCH = -0.15, MAX_PITCH = 1.35, TOP_PITCH = 1.3;

/** `propeller` turns the blades on input. Used on the damage assessment page, where the model is the
 * subject; the homepage hero leaves it still so the drifting sky behind it carries the movement. */
export function mountAircraftScene(host: HTMLDivElement, markers: HTMLButtonElement[], onFailure: () => void, options: { propeller?: boolean } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x101e28, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentTarget = pmrem.fromScene(environment, 0.04);
  scene.environment = environmentTarget.texture;
  scene.environmentIntensity = 0.9;
  environment.dispose(); pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
  const aircraft = createAircraft();
  // Each highlightable mesh gets its own material so tinting one damage area never affects another.
  const zoneMaterials = new Map<string, { material: THREE.MeshStandardMaterial; base: THREE.Color }[]>();
  const sharedMaterials = new Set<THREE.Material>();
  aircraft.traverse(object => {
    const zone: unknown = object.userData.zone;
    if (!(object instanceof THREE.Mesh) || typeof zone !== "string" || !(object.material instanceof THREE.MeshStandardMaterial)) return;
    sharedMaterials.add(object.material);
    const material = object.material.clone();
    object.material = material;
    zoneMaterials.set(zone, [...(zoneMaterials.get(zone) ?? []), { material, base: material.color.clone() }]);
  });
  const highlightColor = new THREE.Color(HIGHLIGHT);
  scene.add(aircraft, new THREE.HemisphereLight(0xdce8ed, 0x3c505c, 0.6));
  const key = new THREE.DirectionalLight(0xfff7e9, 2.7); key.position.set(-3, 7, -5); scene.add(key);
  key.castShadow = true;
  key.shadow.mapSize.setScalar(host.clientWidth < 500 ? 1024 : 2048);
  key.shadow.camera.left = -6; key.shadow.camera.right = 6;
  key.shadow.camera.top = 6; key.shadow.camera.bottom = -6;
  key.shadow.normalBias = 0.035; key.shadow.bias = -0.0001; key.shadow.radius = 4;
  const rim = new THREE.DirectionalLight(0xb8d7e5, 1.2); rim.position.set(4, 3, 3); scene.add(rim);
  const shadowCanvas = document.createElement("canvas"); shadowCanvas.width = 128; shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext("2d");
  if (shadowContext) {
    const gradient = shadowContext.createRadialGradient(64,64,8,64,64,64);
    gradient.addColorStop(0,"rgba(0,0,0,0.5)"); gradient.addColorStop(0.5,"rgba(0,0,0,0.25)"); gradient.addColorStop(1,"rgba(0,0,0,0)");
    shadowContext.fillStyle = gradient; shadowContext.fillRect(0,0,128,128);
  }
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(11,8), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -1.41; scene.add(floor);

  // Current angles ease towards targets; input only ever changes the targets.
  let yaw = DEFAULT_YAW, pitch = DEFAULT_PITCH, targetYaw = yaw, targetPitch = pitch;
  let fitted: number[] = [], frame = 0, disposed = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const extremities = [
    [-4.45,1,-.9],[-4.45,1,.5],[4.45,1,-.9],[4.45,1,.5],
    [0,1.55,2.8],[0,.2,3.4],[0,1.1,-2.8],[0,-1.4,-2],
    [-1.2,-1.4,.2],[1.2,-1.4,.2],[0,0,-3.1],[-1.6,.2,2.8],[1.6,.2,2.8],
  ].map(point => new THREE.Vector3(...point));
  const vector = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const zonePoint = new THREE.Vector3();
  const direction = new THREE.Vector3();

  function placeCamera(atYaw: number, atPitch: number, atDistance: number) {
    camera.position.set(Math.sin(atYaw) * Math.cos(atPitch) * atDistance, Math.sin(atPitch) * atDistance, -Math.cos(atYaw) * Math.cos(atPitch) * atDistance);
    camera.lookAt(0, 0.05, 0); camera.updateMatrixWorld();
  }
  // Camera distance depends on elevation only: at any given tilt it frames the aircraft from every heading,
  // so turning it never changes its apparent size. Tilting towards the top view eases the camera back.
  // The vertical allowance leaves room for the caption and controls overlaid at the bottom.
  const PITCH_SAMPLES = [MIN_PITCH, 0, DEFAULT_PITCH, 0.6, 0.9, 1.15, MAX_PITCH];
  function requiredDistance(samplePitch: number) {
    let required = 7;
    for (let step = 0; step < 24; step++) {
      while (required < 60) {
        placeCamera(step / 24 * Math.PI * 2, samplePitch, required);
        const fits = extremities.every(point => { vector.copy(point).project(camera); return Math.abs(vector.x) < .88 && vector.y < .8 && vector.y > -.68; });
        if (fits) break;
        required *= 1.02;
      }
    }
    return required;
  }
  function fitDistances() { fitted = PITCH_SAMPLES.map(requiredDistance); }
  function distanceFor(atPitch: number) {
    const index = PITCH_SAMPLES.findIndex((sample, i) => atPitch <= PITCH_SAMPLES[i + 1] || i === PITCH_SAMPLES.length - 2);
    const from = PITCH_SAMPLES[index], to = PITCH_SAMPLES[index + 1];
    return THREE.MathUtils.lerp(fitted[index], fitted[index + 1], THREE.MathUtils.clamp((atPitch - from) / (to - from), 0, 1));
  }
  function render() {
    if (disposed) return;
    const width = host.clientWidth, height = host.clientHeight;
    placeCamera(yaw, pitch, distanceFor(pitch));
    renderer.render(scene, camera);
    const positions = ASSESSMENT_ZONES.map(zone => {
      vector.fromArray(zone.position).project(camera);
      return { x: (vector.x * 0.5 + 0.5) * width, y: (-vector.y * 0.5 + 0.5) * height };
    });
    // Separate touch targets when zones project close together at oblique angles.
    for (let pass = 0; pass < 8; pass++) {
      positions.forEach((a, i) => positions.slice(i + 1).forEach(b => {
        const dx = b.x - a.x || 0.01, dy = b.y - a.y || 0.01;
        const gap = Math.hypot(dx, dy);
        if (gap < 46) {
          const shift = (46 - gap) / 2;
          a.x -= dx / gap * shift; a.y -= dy / gap * shift;
          b.x += dx / gap * shift; b.y += dy / gap * shift;
        }
      }));
    }
    positions.forEach((position, index) => {
      const marker = markers[index];
      if (!marker) return;
      marker.style.left = `${THREE.MathUtils.clamp(position.x, 23, width - 23)}px`;
      marker.style.top = `${THREE.MathUtils.clamp(position.y, 23, height - 60)}px`;
      // Fade markers the aircraft hides from this angle; they remain selectable.
      zonePoint.fromArray(ASSESSMENT_ZONES[index].position);
      const reach = camera.position.distanceTo(zonePoint);
      raycaster.set(camera.position, direction.subVectors(zonePoint, camera.position).normalize());
      raycaster.far = reach;
      const hit = raycaster.intersectObject(aircraft, true).find(item => item.object instanceof THREE.Mesh);
      marker.toggleAttribute("data-occluded", !!hit && hit.distance < reach - 0.45);
    });
  }
  /**
   * The propeller turns while the model is being handled and winds down when it is let go, the way a
   * prop does after shutdown. Purely decorative, so reduced-motion settings skip it, and it never
   * spins on its own: rendering still only happens in response to input.
   */
  const propeller = aircraft.getObjectByName("propeller");
  let spin = 0;
  function spinUp(amount: number) {
    if (!options.propeller || reducedMotion.matches) return;
    spin = Math.min(0.55, Math.max(spin, amount));
    update();
  }
  function animate() {
    frame = 0;
    const ease = reducedMotion.matches ? 1 : 0.22;
    yaw += (targetYaw - yaw) * ease;
    pitch += (targetPitch - pitch) * ease;
    const settled = Math.abs(targetYaw - yaw) < 0.001 && Math.abs(targetPitch - pitch) < 0.001;
    if (settled) { yaw = targetYaw; pitch = targetPitch; }
    if (spin > 0.0015) {
      if (propeller) propeller.rotation.z += spin;
      // Holding the model keeps the blades turning; letting go winds them down over a second or so.
      spin *= drag ? 0.997 : 0.962;
    } else {
      spin = 0;
    }
    if (!settled || spin > 0) frame = requestAnimationFrame(animate);
    render();
  }
  function update() { if (!frame && !disposed) frame = requestAnimationFrame(animate); }
  function resize() {
    renderer.setSize(host.clientWidth, host.clientHeight);
    camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix();
    fitDistances(); render();
  }
  const observer = new ResizeObserver(resize); observer.observe(host);

  let drag: { x: number; y: number; yaw: number; pitch: number; id: number } | null = null;
  const canvas = renderer.domElement;
  function down(e: PointerEvent) {
    if (e.button !== 0 || !e.isPrimary) return;
    drag = { x: e.clientX, y: e.clientY, yaw: targetYaw, pitch: targetPitch, id: e.pointerId };
    canvas.setPointerCapture(e.pointerId);
  }
  function move(e: PointerEvent) {
    if (!drag || drag.id !== e.pointerId) return;
    // The near side of the aircraft follows the pointer, like turning a model in the hand.
    targetYaw = drag.yaw + (e.clientX - drag.x) * 0.008;
    // On touch, vertical gestures remain available to scroll the page.
    if (e.pointerType !== "touch") targetPitch = THREE.MathUtils.clamp(drag.pitch + (e.clientY - drag.y) * 0.006, MIN_PITCH, MAX_PITCH);
    spinUp(0.24);
    update();
  }
  function up(e: PointerEvent) { if (drag?.id === e.pointerId) drag = null; }
  function lost(e: Event) { e.preventDefault(); onFailure(); }
  canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  // Entrance: the aircraft turns into its resting angle while the propeller winds down.
  if (!reducedMotion.matches) {
    yaw = DEFAULT_YAW - 0.8;
    pitch = DEFAULT_PITCH + 0.16;
    if (options.propeller) spin = 0.5;
    update();
  }
  return {
    /** A short turn of the blades, so choosing a damage area gets a response from the model. */
    nudge() { spinUp(0.26); },
    highlight(zones: string[]) {
      zoneMaterials.forEach((materials, zone) => {
        const active = zones.includes(zone);
        // Blend the surface colour towards aviation blue; a faint glow keeps dark parts (tyres, blades) visible.
        materials.forEach(({ material, base }) => {
          material.color.copy(base);
          if (active) material.color.lerp(highlightColor, 0.6);
          material.emissive.copy(active ? highlightColor : new THREE.Color(0x000000));
          material.emissiveIntensity = active ? 0.25 : 1;
        });
      });
      render();
    },
    control(action: SceneAction) {
      if (action === "left") targetYaw -= 0.45;
      if (action === "right") targetYaw += 0.45;
      if (action === "top") targetPitch = targetPitch > TOP_PITCH - 0.1 ? DEFAULT_PITCH : TOP_PITCH;
      if (action === "reset") {
        // Return by the shortest turn rather than unwinding every rotation.
        targetYaw = DEFAULT_YAW + Math.round((targetYaw - DEFAULT_YAW) / (Math.PI * 2)) * Math.PI * 2;
        targetPitch = DEFAULT_PITCH;
      }
      spinUp(0.34);
      update();
    },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", up); canvas.removeEventListener("webglcontextlost", lost);
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => material.dispose());
        }
      });
      sharedMaterials.forEach(material => material.dispose());
      environmentTarget.dispose(); shadowTexture.dispose(); key.shadow.dispose();
      renderer.dispose(); canvas.remove();
    },
  };
}
