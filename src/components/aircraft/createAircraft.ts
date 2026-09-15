import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type Point = [number, number, number];
/** Original generic civilian aircraft. Visual geometry only, not an engineering model. */
export function createAircraft() {
  const aircraft = new THREE.Group();
  const paint = new THREE.MeshPhysicalMaterial({ color: 0xd8dedc, roughness: .3, metalness: .12, clearcoat: .65, clearcoatRoughness: .24 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x142c38, roughness: .13, metalness: .42, clearcoat: 1 });
  const alloy = new THREE.MeshStandardMaterial({ color: 0x819396, metalness: .78, roughness: .26 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x222a2b, roughness: .75 });
  const trim = new THREE.MeshStandardMaterial({ color: 0x395b70, metalness: .25, roughness: .36 });
  const seam = new THREE.MeshStandardMaterial({ color: 0x65787e, roughness: .6 });
  const rivets: THREE.BufferGeometry[] = [];
  // Meshes added while `zone` is set belong to that damage area (see assessmentZones.ts) and can be highlighted.
  let zone: string | undefined;
  function add(geometry: THREE.BufferGeometry, material: THREE.Material, p: Point = [0,0,0]) {
    const object = new THREE.Mesh(geometry, material);
    object.userData.zone = zone;
    object.position.fromArray(p); object.castShadow = true; object.receiveShadow = true; aircraft.add(object); return object;
  }
  function tube(points: Point[], radius = .007, material: THREE.Material = seam) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    return add(new THREE.TubeGeometry(curve, Math.max(8, points.length * 4), radius, 5, false), material);
  }
  function ellipsoid(p: Point, scale: Point, material: THREE.Material = paint) {
    const mesh = add(new THREE.SphereGeometry(1, 32, 20), material, p); mesh.scale.fromArray(scale); return mesh;
  }
  function rod(a: Point, b: Point, radius: number, material: THREE.Material = alloy) {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const object = add(new THREE.CylinderGeometry(radius, radius, start.distanceTo(end), 12), material);
    object.position.copy(start).add(end).multiplyScalar(.5);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), end.sub(start).normalize());
    return object;
  }
  // z, half-width, top, bottom. Smooth station interpolation keeps a continuous skin.
  const stations = [
    [-2.75,.17,.16,-.18],[-2.55,.31,.24,-.29],[-2.05,.4,.29,-.38],
    [-1.5,.44,.34,-.45],[-.88,.48,.79,-.46],[-.3,.5,.81,-.46],
    [.45,.46,.75,-.39],[.95,.35,.49,-.26],[1.55,.24,.32,-.17],
    [2.4,.14,.25,-.055],[3.12,.075,.22,.035],[3.37,.012,.15,.1]
  ];
  function profile(z: number, axis: number) {
    let i = 0; while (i < stations.length - 2 && z > stations[i + 1][0]) i++;
    const a = stations[i], b = stations[i + 1], prev = stations[Math.max(0, i - 1)], next = stations[Math.min(stations.length - 1, i + 2)];
    const d = b[0] - a[0], t = THREE.MathUtils.clamp((z - a[0]) / d, 0, 1);
    const m0 = (b[axis] - prev[axis]) / (b[0] - prev[0]);
    const m1 = (next[axis] - a[axis]) / (next[0] - a[0]);
    return (2*t*t*t-3*t*t+1)*a[axis] + (t*t*t-2*t*t+t)*d*m0 + (-2*t*t*t+3*t*t)*b[axis] + (t*t*t-t*t)*d*m1;
  }
  function skin(z: number, angle: number, offset = 0): Point {
    const w = profile(z,1), top = profile(z,2), bottom = profile(z,3);
    const c = Math.cos(angle), s = Math.sin(angle);
    return [Math.sign(c)*Math.pow(Math.abs(c),.8)*(w+offset), (top+bottom)/2+Math.sign(s)*Math.pow(Math.abs(s),.9)*((top-bottom)/2+offset), z];
  }
  function surface(rows: number, cols: number, point: (u: number,v: number) => Point, material: THREE.Material) {
    const positions: number[] = [], indices: number[] = [];
    for(let r=0;r<=rows;r++) for(let c=0;c<=cols;c++) positions.push(...point(r/rows,c/cols));
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) {
      const a=r*(cols+1)+c,b=a+cols+1;
      indices.push(a,a+1,b,a+1,b+1,b);
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
    geometry.setIndex(indices); geometry.computeVertexNormals();
    return add(geometry,material);
  }
  // Fuselage skin is split at existing panel seams so nose, cabin and tail cone highlight separately.
  const skinSection=(z0:number,z1:number,rows:number)=>surface(rows,64,(u,v)=>skin(z0+u*(z1-z0),v*Math.PI*2),paint);
  zone="nose";skinSection(-2.75,-1.5,26);
  zone="cabin";skinSection(-1.5,1.65,66);
  zone="tail";skinSection(1.65,3.37,36);
  zone="cabin";
  // Flush glazing follows the skin, with thin seals rather than protruding spheres.
  function windowPatch(z0:number,z1:number,a0:number,a1:number) {
    const m=glass.clone();m.side=THREE.DoubleSide;
    surface(16,16,(u,v)=>skin(z0+(z1-z0)*u,a0+(a1-a0)*v,.009),m);
    const outline:Point[]=[];
    for(let i=0;i<=20;i++)outline.push(skin(z0+(z1-z0)*i/20,a0,.012));
    for(let i=0;i<=12;i++)outline.push(skin(z1,a0+(a1-a0)*i/12,.012));
    for(let i=0;i<=20;i++)outline.push(skin(z1-(z1-z0)*i/20,a1,.012));
    for(let i=0;i<=12;i++)outline.push(skin(z0,a1-(a1-a0)*i/12,.012));
    tube(outline,.009,dark);
  }
  windowPatch(-1.46,-.88,.32,Math.PI-.32);
  tube(Array.from({length:16},(_,i)=>skin(-1.46+i*.58/15,Math.PI/2,.024)),.014,paint);
  for(const side of [-1,1]) {
    const angle=(a:number)=>side===1?a:Math.PI-a;
    zone="cabin";
    windowPatch(-.81,-.08,angle(.09),angle(.8));
    windowPatch(.035,.65,angle(.12),angle(.72));
    // Door perimeter, handle and a fine blue pinstripe.
    tube([skin(-.83,angle(.85),.014),skin(-.83,angle(-.8),.014),skin(-.55,angle(-1.05),.014),skin(.0,angle(-.9),.014),skin(.02,angle(.82),.014)],.006);
    rod(skin(-.03,angle(-.1),.024),skin(-.21,angle(-.1),.024),.013,alloy);
    zone=undefined;
    tube(Array.from({length:64},(_,i)=>skin(-2.38+i*5.35/63,angle(-.13),.012)),.022,trim);
    tube(Array.from({length:64},(_,i)=>skin(-2.38+i*5.35/63,angle(-.24),.012)),.006,alloy);
    // Cowling vents and small fasteners are geometry, not downloaded textures.
    zone="nose";
    for(let i=0;i<4;i++) {
      const p=skin(-1.69+i*.075,angle(.03),.012);
      const vent=add(new THREE.BoxGeometry(.012,.115,.026),dark,p);vent.rotation.x=-.15;
    }
    for(let i=0;i<11;i++) {
      const p=skin(-2.45,angle(-.9+i*.18),.008);
      const rivet=new THREE.SphereGeometry(.008,6,4);rivet.translate(...p);rivets.push(rivet);
    }
  }
  zone=undefined;
  for(const z of [-2.45,-1.5,.85,1.65,2.55])tube(Array.from({length:65},(_,i)=>skin(z,i*Math.PI/32,.006)),.004);

  // Airfoil sections, tapered tips, slight dihedral and trailing-edge divisions.
  function wingPoint(span:number,chordFraction:number,upper:boolean):Point {
    const taper=1-Math.max(0,(span-2.85)/1.55)*.28;
    const chord=1.42*taper;
    const thickness=5*.12*(.2969*Math.sqrt(chordFraction)-.126*chordFraction-.3516*chordFraction**2+.2843*chordFraction**3-.1036*chordFraction**4)*chord;
    return [span,.84+span*.026+(upper?thickness:-thickness*.65),-.94+span*.03+chord*chordFraction];
  }
  for(const side of [-1,1]) {
    zone="wing";
    const wingMat=paint.clone();wingMat.side=THREE.DoubleSide;
    surface(60,72,(u,v)=>{
      const upper=v<=.5, c=upper?v*2:2-v*2;
      const p=wingPoint(u*4.35,c,upper);p[0]*=side;return p;
    },wingMat);
    // Rounded wingtip fairing and restrained navigation light lenses.
    const tip=ellipsoid([side*4.35,.958,-.24],[.09,.075,.51]);tip.rotation.x=.025;
    const light= new THREE.MeshPhysicalMaterial({color:side<0?0x783d38:0x335c55,roughness:.15,metalness:.2,clearcoat:1});
    ellipsoid([side*4.4,.985,-.53],[.035,.034,.085],light);
    for(const fraction of [.72]) tube(Array.from({length:55},(_,i)=>{const p=wingPoint(.52+i*3.7/54,fraction,true);p[0]*=side;p[1]+=.004;return p;}),.004);
    for(const span of [.54,2.15,4.08])tube(Array.from({length:30},(_,i)=>{const p=wingPoint(span,.04+i*.94/29,true);p[0]*=side;p[1]+=.004;return p;}),.0035);
    // Streamlined wing support strut and its end fittings.
    const support=rod([side*.38,-.25,-.37],[side*2.65,.88,-.46],.04,paint);support.scale.z=.44;
    ellipsoid([side*2.65,.88,-.46],[.095,.055,.1]);
    // Horizontal tail with tapered airfoil, including elevator seam.
    zone="tail";
    surface(28,40,(u,v)=>{
      const x=.09+u*1.45,c=v<=.5?v*2:2-v*2;
      const chord=.85-u*.27;
      return [side*x,.17+Math.sin(Math.PI*c)*.045*(v<=.5?1:-1),2.37+u*.19+chord*(c-.5)];
    },wingMat);
    tube(Array.from({length:26},(_,i)=>{const u=i/25;return [side*(.14+u*1.37),.195,2.37+u*.19+(.85-u*.27)*.22];}),.004);
    // Spring gear, brake assembly, tyres, rims and shaped wheel fairings.
    zone="gear";
    tube([[side*.35,-.31,-.02],[side*.57,-.57,.06],[side*.91,-1.1,.12],[side*1.05,-1.16,.12]],.047,paint);
    const wheel=add(new THREE.TorusGeometry(.172,.063,12,36),dark,[side*1.055,-1.17,.12]);wheel.rotation.y=Math.PI/2;
    const hub=add(new THREE.CylinderGeometry(.105,.105,.16,24),alloy,[side*1.055,-1.17,.12]);hub.rotation.z=Math.PI/2;
    ellipsoid([side*1.055,-1.055,.11],[.16,.19,.4]);
    tube([[side*1.207,-1.1,-.18],[side*1.214,-1.05,.08],[side*1.19,-1.1,.37]],.004);
  }
  // Swept vertical tail: a thin aerofoil, rather than an extruded block.
  zone="tail";
  const outline = [[1.97,.18],[2.17,.49],[2.59,1.47],[2.78,1.52],[2.94,1.43],[3.29,.18]];
  const shape=new THREE.Shape();shape.moveTo(outline[0][0],outline[0][1]);
  outline.slice(1).forEach(p=>shape.lineTo(p[0],p[1]));shape.closePath();
  const fin=add(new THREE.ExtrudeGeometry(shape,{depth:.045,bevelEnabled:true,bevelThickness:.025,bevelSize:.035,bevelSegments:3,steps:1}),paint,[-.0225,0,0]);fin.rotation.y=-Math.PI/2;
  for(const side of [-1,1])tube([[side*.05,1.43,2.79],[side*.05,.75,3.02],[side*.05,.2,3.22]],.004);
  // Nose undercarriage, oleo, fork and tyre.
  zone="gear";
  rod([0,-.31,-2.05],[0,-.87,-2.04],.042,alloy);
  rod([0,-.7,-2.04],[0,-1.15,-1.98],.055,paint);
  const noseWheel=add(new THREE.TorusGeometry(.136,.054,12,32),dark,[0,-1.19,-1.98]);noseWheel.rotation.y=Math.PI/2;
  const noseHub=add(new THREE.CylinderGeometry(.08,.08,.14,24),alloy,[0,-1.19,-1.98]);noseHub.rotation.z=Math.PI/2;
  ellipsoid([0,-1.075,-1.99],[.125,.13,.3]);
  // Spinner and two shaped, pitched propeller blades.
  zone="nose";
  ellipsoid([0,-.015,-2.82],[.195,.195,.27],alloy);
  const propeller=new THREE.Group();
  for(const side of [-1,1]) {
    const blade=new THREE.Shape();blade.moveTo(-.045,.12);blade.bezierCurveTo(-.11,.45,-.09,.91,-.035,1.03);blade.quadraticCurveTo(.02,1.09,.07,1.02);blade.bezierCurveTo(.14,.65,.1,.25,.045,.12);blade.closePath();
    const geometry=new THREE.ExtrudeGeometry(blade,{depth:.018,bevelEnabled:true,bevelSize:.009,bevelThickness:.008,bevelSegments:2});
    const object=new THREE.Mesh(geometry,dark);object.rotation.z=side===1?.28:Math.PI+.28;object.rotation.y=.25;object.position.z=-2.8;object.castShadow=true;object.userData.zone=zone;propeller.add(object);
    const stripe=new THREE.Mesh(new THREE.BoxGeometry(.1,.06,.025),paint);stripe.position.set(-side*.24,side*.94,-2.8);stripe.rotation.z=.28;stripe.userData.zone=zone;propeller.add(stripe);
  }
  aircraft.add(propeller);
  // Engine intake, exhaust, aerials and a small cabin step.
  for(const side of [-1,1])ellipsoid([side*.235,.07,-2.57],[.095,.065,.055],dark);
  rod([.18,-.32,-2.12],[.23,-.57,-2.0],.042,dark);
  zone="cabin";
  rod([0,.81,.19],[0,1.14,.35],.012,alloy);
  rod([-.45,-.36,.22],[-.68,-.61,.22],.023,alloy);
  rod([-.68,-.61,.1],[-.68,-.61,.38],.035,dark);
  zone=undefined;
  if(rivets.length){const merged=mergeGeometries(rivets);add(merged,alloy);rivets.forEach(geometry=>geometry.dispose());}
  return aircraft;
}
