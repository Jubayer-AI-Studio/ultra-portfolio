import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/sound';
import {
  X,
  Volume2,
  VolumeX,
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  ExternalLink,
} from 'lucide-react';
import { ArcadeModal } from './ArcadeModal';

interface BrunoCityWorldProps {
  isFullPage?: boolean;
  onClose?: () => void;
  onOpenSaaS?: () => void;
  onOpenCinema?: () => void;
}

interface PhysicsCrate {
  mesh: THREE.Mesh;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotZ: number;
  knocked: boolean;
}

export const BrunoCityWorld: React.FC<BrunoCityWorldProps> = ({
  isFullPage = false,
  onClose,
  onOpenSaaS,
  onOpenCinema,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(isFullPage);
  const [activeZone, setActiveZone] = useState<{
    id: string;
    title: string;
    tag: string;
    desc: string;
    actionText: string;
    actionType: 'arcade' | 'saas' | 'cinema' | 'racing';
  } | null>(null);
  const [arcadeModalGame, setArcadeModalGame] = useState<{ id: string; title: string } | null>(null);
  const [hornActive, setHornActive] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // Virtual keys for keyboard & touch
  const keysRef = useRef<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    handbrake: boolean;
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    handbrake: false,
  });

  const activeZoneRef = useRef(activeZone);
  activeZoneRef.current = activeZone;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer (Vibrant Sunny Daylight Environment)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x93c5fd); // Clear sunny blue sky
    scene.fog = new THREE.FogExp2(0x93c5fd, 0.009);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      250
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Sunny Daylight Lighting (Crisp Shadows & Warm Sunlight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    sunLight.position.set(40, 60, 35);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 180;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const skyFill = new THREE.HemisphereLight(0xbae6fd, 0x4ade80, 0.9);
    scene.add(skyFill);

    // 3. Stylized City Landscape (Grass, Roads, River & Mountains)
    const worldSize = 220;

    // Lush Green Ground Plane
    const groundGeom = new THREE.PlaneGeometry(worldSize, worldSize, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80, // Vibrant sunny grass green
      roughness: 0.85,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // River / Canal cutting through (Z = -2 to +2, width 14)
    const riverGeom = new THREE.PlaneGeometry(worldSize, 14);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Sparkling blue water
      roughness: 0.1,
      metalness: 0.8,
    });
    const river = new THREE.Mesh(riverGeom, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.04, 0);
    scene.add(river);

    // Wooden Bridge spanning the river at X = 0
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(0, 0.1, 0);
    scene.add(bridgeGroup);

    // Bridge deck
    const bridgeDeckGeom = new THREE.BoxGeometry(12, 0.4, 16);
    const bridgeDeckMat = new THREE.MeshStandardMaterial({
      color: 0x854d0e, // Rich wood brown
      roughness: 0.7,
    });
    const bridgeDeck = new THREE.Mesh(bridgeDeckGeom, bridgeDeckMat);
    bridgeDeck.position.y = 0.3;
    bridgeDeck.castShadow = true;
    bridgeDeck.receiveShadow = true;
    bridgeGroup.add(bridgeDeck);

    // Bridge railings
    const railingMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const createRailing = (rx: number) => {
      const rGeom = new THREE.BoxGeometry(0.3, 1.2, 16);
      const rMesh = new THREE.Mesh(rGeom, railingMat);
      rMesh.position.set(rx, 0.9, 0);
      rMesh.castShadow = true;
      bridgeGroup.add(rMesh);
    };
    createRailing(-5.8);
    createRailing(5.8);

    // Road Network (Grey Asphalt with White Centerlines)
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Clean dark slate asphalt
      roughness: 0.75,
    });

    // North-South Main Boulevard (X = 0, length = 200, width = 10)
    const roadNSGeom = new THREE.PlaneGeometry(10, worldSize);
    const roadNS = new THREE.Mesh(roadNSGeom, roadMat);
    roadNS.rotation.x = -Math.PI / 2;
    roadNS.position.set(0, 0.05, 0);
    roadNS.receiveShadow = true;
    scene.add(roadNS);

    // East-West Main Avenue (Z = -30 and Z = 30)
    const createRoadEW = (zPos: number) => {
      const roadEWGeom = new THREE.PlaneGeometry(worldSize, 10);
      const roadEW = new THREE.Mesh(roadEWGeom, roadMat);
      roadEW.rotation.x = -Math.PI / 2;
      roadEW.position.set(0, 0.05, zPos);
      roadEW.receiveShadow = true;
      scene.add(roadEW);
    };
    createRoadEW(-35);
    createRoadEW(35);

    // Road White Markings (Dashed Centerlines)
    const markMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let z = -90; z <= 90; z += 6) {
      if (Math.abs(z) > 8) {
        // Skip bridge
        const markGeom = new THREE.PlaneGeometry(0.4, 3);
        const mark = new THREE.Mesh(markGeom, markMat);
        mark.rotation.x = -Math.PI / 2;
        mark.position.set(0, 0.06, z);
        scene.add(mark);
      }
    }

    // 4. Low-Poly Distant Mountains & Hills
    const mtnGroup = new THREE.Group();
    scene.add(mtnGroup);
    const mtnMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.9,
      flatShading: true,
    });
    const mtnPeakMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
      flatShading: true,
    });

    const createMountain = (mx: number, mz: number, r: number, h: number) => {
      const coneGeom = new THREE.ConeGeometry(r, h, 7);
      const cone = new THREE.Mesh(coneGeom, mtnMat);
      cone.position.set(mx, h / 2, mz);
      cone.castShadow = true;
      mtnGroup.add(cone);

      // Snow peak
      const peakGeom = new THREE.ConeGeometry(r * 0.35, h * 0.35, 7);
      const peak = new THREE.Mesh(peakGeom, mtnPeakMat);
      peak.position.set(mx, h - (h * 0.35) / 2, mz);
      mtnGroup.add(peak);
    };

    // Place mountain range along edges
    for (let i = -80; i <= 80; i += 30) {
      createMountain(i, -95, 20 + (i % 7), 28 + (i % 9));
      createMountain(i, 95, 22 + (i % 5), 26 + (i % 8));
      createMountain(-95, i, 22 + (i % 6), 27 + (i % 7));
      createMountain(95, i, 20 + (i % 8), 29 + (i % 6));
    }

    // 5. Low-Poly Trees along roads
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8, flatShading: true });
    const trunkGeom = new THREE.CylinderGeometry(0.3, 0.4, 2, 6);
    const foliageGeom = new THREE.DodecahedronGeometry(1.8, 1);

    const createTree = (tx: number, tz: number) => {
      const trunk = new THREE.Mesh(trunkGeom, trunkMat);
      trunk.position.set(tx, 1, tz);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const foliage = new THREE.Mesh(foliageGeom, foliageMat);
      foliage.position.set(tx, 2.8, tz);
      foliage.castShadow = true;
      treeGroup.add(foliage);
    };

    // Plant trees along Boulevard
    for (let z = -80; z <= 80; z += 12) {
      if (Math.abs(z) > 10) {
        createTree(-7.5, z);
        createTree(7.5, z);
      }
    }

    // 6. The 4 Major Factory Campuses / Project Zones
    const campuses = [
      {
        id: 'noorhub',
        title: 'NOORHUB SAAS CAMPUS',
        tag: 'FLAGSHIP ENTERPRISE SAAS',
        desc: 'Complete Madrasa & Educational SaaS Platform (Next.js 15, Cloudflare Zero Trust, PostgreSQL & RBAC)',
        actionText: 'Enter SaaS Campus',
        actionType: 'saas' as const,
        x: -42,
        z: -35,
        color: 0x0284c7,
      },
      {
        id: 'iron-strike',
        title: 'IRON STRIKE COLISEUM',
        tag: '2D ARCADE FIGHTER ARENA',
        desc: 'High-octane Martial Arts Combat with Special Move Gauges & Hitbox Combos',
        actionText: 'Fight in Coliseum',
        actionType: 'arcade' as const,
        x: 42,
        z: -35,
        color: 0xf59e0b,
      },
      {
        id: 'icon-2030',
        title: 'ICON 2030 CINEMA STUDIO',
        tag: 'AI CINEMA TRILOGY',
        desc: 'Cinematic Universe with 10s Face-Locked Continuity Architecture (Directed by JUBAYER AI Specialist)',
        actionText: 'Watch in Cinema',
        actionType: 'cinema' as const,
        x: 42,
        z: 35,
        color: 0xe11d48,
      },
      {
        id: 'dhaka-racing',
        title: 'DHAKA RACING GRANDSTAND',
        tag: 'OPEN-WORLD URBAN DRIVING',
        desc: 'Explore 10+ Authentic Dhaka Routes with Realistic Damage Physics & Dynamic Weather',
        actionText: 'Launch Dhaka Racing',
        actionType: 'racing' as const,
        x: -42,
        z: 35,
        color: 0x16a34a,
      },
    ];

    // Build 3D Building Campuses
    campuses.forEach((camp) => {
      const cGroup = new THREE.Group();
      cGroup.position.set(camp.x, 0, camp.z);
      scene.add(cGroup);

      // Campus Ground Foundation / Concrete Plaza
      const plazaGeom = new THREE.BoxGeometry(26, 0.4, 26);
      const plazaMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0, // Clean light stone plaza
        roughness: 0.6,
      });
      const plaza = new THREE.Mesh(plazaGeom, plazaMat);
      plaza.position.y = 0.2;
      plaza.receiveShadow = true;
      cGroup.add(plaza);

      // Main Glass & Concrete Factory / Headquarters Building
      const bldgGeom = new THREE.BoxGeometry(18, 12, 14);
      const bldgMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.7,
        roughness: 0.2,
      });
      const bldg = new THREE.Mesh(bldgGeom, bldgMat);
      bldg.position.set(0, 6.2, -3);
      bldg.castShadow = true;
      bldg.receiveShadow = true;
      cGroup.add(bldg);

      // Glass Windows Grid (Glowing Emissive Windows)
      const winGeom = new THREE.PlaneGeometry(16, 9);
      const winMat = new THREE.MeshStandardMaterial({
        color: camp.color,
        emissive: camp.color,
        emissiveIntensity: 0.7,
        roughness: 0.1,
      });
      const win = new THREE.Mesh(winGeom, winMat);
      win.position.set(0, 6.5, 4.05);
      cGroup.add(win);

      // Entrance Canopy Gate
      const gateGeom = new THREE.BoxGeometry(8, 0.5, 4);
      const gateMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const gate = new THREE.Mesh(gateGeom, gateMat);
      gate.position.set(0, 3.2, 5.5);
      gate.castShadow = true;
      cGroup.add(gate);

      // Floating Hologram Diamond on Roof
      const diamondGeom = new THREE.OctahedronGeometry(2, 0);
      const diamondMat = new THREE.MeshStandardMaterial({
        color: camp.color,
        emissive: camp.color,
        emissiveIntensity: 0.8,
        metalness: 0.9,
      });
      const diamond = new THREE.Mesh(diamondGeom, diamondMat);
      diamond.position.set(0, 15, -3);
      diamond.castShadow = true;
      diamond.name = `diamond_${camp.id}`;
      cGroup.add(diamond);

      // Proximity Glow Ring around entrance
      const ringGeom = new THREE.RingGeometry(6, 6.8, 32);
      ringGeom.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: camp.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.set(0, 0.45, 7);
      cGroup.add(ring);
    });

    // 7. Smashable Physics Wooden Crates Pyramid
    const crates: PhysicsCrate[] = [];
    const crateMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Amber wooden crate
      roughness: 0.8,
    });
    const crateGeom = new THREE.BoxGeometry(1.4, 1.4, 1.4);

    // Build pyramid at (0, 0, -16)
    const pyramidRows = [
      [-2.1, -0.7, 0.7, 2.1], // Base row 4 crates
      [-1.4, 0, 1.4], // 2nd row 3 crates
      [-0.7, 0.7], // 3rd row 2 crates
      [0], // Top row 1 crate
    ];

    pyramidRows.forEach((row, rowIdx) => {
      row.forEach((xOffset) => {
        const mesh = new THREE.Mesh(crateGeom, crateMat);
        const cx = xOffset;
        const cy = 0.7 + rowIdx * 1.4;
        const cz = -18;
        mesh.position.set(cx, cy, cz);
        mesh.castShadow = true;
        scene.add(mesh);

        crates.push({
          mesh,
          x: cx,
          y: cy,
          z: cz,
          vx: 0,
          vy: 0,
          vz: 0,
          rotX: 0,
          rotZ: 0,
          knocked: false,
        });
      });
    });

    // 8. Stunt Jump Ramp (Launches car over the river / road!)
    const rampGroup = new THREE.Group();
    rampGroup.position.set(0, 0, 14);
    scene.add(rampGroup);

    const rampGeom = new THREE.BoxGeometry(6, 1.6, 6);
    rampGeom.rotateX(Math.PI / 10);
    const rampMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Yellow hazard ramp
      roughness: 0.4,
    });
    const rampMesh = new THREE.Mesh(rampGeom, rampMat);
    rampMesh.position.y = 0.8;
    rampMesh.castShadow = true;
    rampMesh.receiveShadow = true;
    rampGroup.add(rampMesh);

    // 9. THE VIBRANT BEAUTIFUL CAR (Bruno Simon Style Ferrari Red Roadster)
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, 25);
    scene.add(carGroup);

    // Sleek Glossy Red Sports Car Body
    const carBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xdc2626, // Vivid Ferrari Red
      metalness: 0.75,
      roughness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });

    // Lower Wedge Chassis
    const carChassisGeom = new THREE.BoxGeometry(2.2, 0.7, 4.2);
    const carChassis = new THREE.Mesh(carChassisGeom, carBodyMat);
    carChassis.position.y = 0.65;
    carChassis.castShadow = true;
    carGroup.add(carChassis);

    // White Racing Stripe down center
    const stripeGeom = new THREE.BoxGeometry(0.5, 0.72, 4.22);
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const stripe = new THREE.Mesh(stripeGeom, stripeMat);
    stripe.position.y = 0.65;
    carGroup.add(stripe);

    // Cabin / Tinted Cockpit Glass
    const cockpitGeom = new THREE.BoxGeometry(1.7, 0.65, 2.0);
    const cockpitMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Deep midnight cockpit glass
      roughness: 0.05,
      metalness: 0.95,
    });
    const cockpit = new THREE.Mesh(cockpitGeom, cockpitMat);
    cockpit.position.set(0, 1.2, -0.2);
    cockpit.castShadow = true;
    carGroup.add(cockpit);

    // Rear High-Downforce Spoiler
    const spoilerWingGeom = new THREE.BoxGeometry(2.1, 0.1, 0.6);
    const spoilerWing = new THREE.Mesh(spoilerWingGeom, carBodyMat);
    spoilerWing.position.set(0, 1.35, 1.8);
    spoilerWing.castShadow = true;
    carGroup.add(spoilerWing);

    // Chrome Headlights (with actual SpotLight Beams)
    const hlLensMat = new THREE.MeshBasicMaterial({ color: 0xfef08a }); // Warm yellow headlight
    const hlGeom = new THREE.BoxGeometry(0.4, 0.2, 0.1);
    const hlL = new THREE.Mesh(hlGeom, hlLensMat);
    hlL.position.set(-0.75, 0.65, -2.12);
    carGroup.add(hlL);
    const hlR = new THREE.Mesh(hlGeom, hlLensMat);
    hlR.position.set(0.75, 0.65, -2.12);
    carGroup.add(hlR);

    // Forward SpotLight Shining on ground
    const carHeadlight = new THREE.SpotLight(0xfffbeb, 6, 35, Math.PI / 4, 0.3, 1);
    carHeadlight.position.set(0, 0.8, -2.0);
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, -18);
    carGroup.add(lightTarget);
    carHeadlight.target = lightTarget;
    carGroup.add(carHeadlight);

    // Red Tail Lights
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tailGeom = new THREE.BoxGeometry(0.4, 0.15, 0.1);
    const tlL = new THREE.Mesh(tailGeom, tailMat);
    tlL.position.set(-0.75, 0.7, 2.12);
    carGroup.add(tlL);
    const tlR = new THREE.Mesh(tailGeom, tailMat);
    tlR.position.set(0.75, 0.7, 2.12);
    carGroup.add(tlR);

    // 4 Wheels: Rubber Tires with Silver 5-spoke Alloy Rims
    const tireGeom = new THREE.CylinderGeometry(0.46, 0.46, 0.38, 24);
    tireGeom.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
    });
    const rimGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.4, 16);
    rimGeom.rotateZ(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.2,
    });

    const createWheelAssembly = (wx: number, wy: number, wz: number) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(wx, wy, wz);
      const tire = new THREE.Mesh(tireGeom, tireMat);
      tire.castShadow = true;
      wGroup.add(tire);
      const rim = new THREE.Mesh(rimGeom, rimMat);
      wGroup.add(rim);
      carGroup.add(wGroup);
      return wGroup;
    };

    const frontLWheel = createWheelAssembly(-1.2, 0.46, -1.3);
    const frontRWheel = createWheelAssembly(1.2, 0.46, -1.3);
    const backLWheel = createWheelAssembly(-1.2, 0.46, 1.3);
    const backRWheel = createWheelAssembly(1.2, 0.46, 1.3);

    // 10. Car Physics State
    let carX = 0;
    let carY = 0;
    let carZ = 25;
    let carVelocityY = 0;
    let carAngle = 0;
    let carSpeed = 0;
    let steerAngle = 0;
    let inAir = false;

    const maxSpeed = 0.58;
    const accel = 0.018;
    const friction = 0.965;
    const turnSpeed = 0.046;

    // 11. Input Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keysRef.current.forward = true;
      if (k === 's' || k === 'arrowdown') keysRef.current.backward = true;
      if (k === 'a' || k === 'arrowleft') keysRef.current.left = true;
      if (k === 'd' || k === 'arrowright') keysRef.current.right = true;
      if (k === ' ') {
        e.preventDefault();
        keysRef.current.handbrake = true;
      }
      if (k === 'h') {
        sound.playCarHorn();
        setHornActive(true);
        setTimeout(() => setHornActive(false), 300);
      }
      if (k === 'r') {
        carX = 0;
        carY = 0;
        carZ = 25;
        carVelocityY = 0;
        carAngle = 0;
        carSpeed = 0;
        steerAngle = 0;
        sound.playWarp();
      }
      if (k === 'enter') {
        const cur = activeZoneRef.current;
        if (cur) handleCampusAction(cur.actionType);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keysRef.current.forward = false;
      if (k === 's' || k === 'arrowdown') keysRef.current.backward = false;
      if (k === 'a' || k === 'arrowleft') keysRef.current.left = false;
      if (k === 'd' || k === 'arrowright') keysRef.current.right = false;
      if (k === ' ') keysRef.current.handbrake = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 12. Animation Loop
    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      const keys = keysRef.current;

      // Acceleration & Sound
      if (keys.forward) {
        carSpeed = Math.min(maxSpeed, carSpeed + accel);
        if (frame % 14 === 0) sound.playEngineRev();
      } else if (keys.backward) {
        carSpeed = Math.max(-maxSpeed * 0.45, carSpeed - accel);
      } else {
        carSpeed *= friction;
      }

      // Handbrake
      if (keys.handbrake) carSpeed *= 0.88;

      // Steering
      const steerTarget = (keys.left ? 1 : 0) - (keys.right ? 1 : 0);
      steerAngle += (steerTarget * 0.45 - steerAngle) * 0.2;

      // Turning based on speed
      if (Math.abs(carSpeed) > 0.005) {
        const dir = carSpeed > 0 ? 1 : -1;
        carAngle += steerAngle * turnSpeed * dir;
      }

      // Forward position translation
      carX -= Math.sin(carAngle) * carSpeed;
      carZ -= Math.cos(carAngle) * carSpeed;

      // Bounds check
      const bound = worldSize / 2 - 8;
      if (carX > bound) {
        carX = bound;
        carSpeed *= -0.3;
        sound.playImpact();
      }
      if (carX < -bound) {
        carX = -bound;
        carSpeed *= -0.3;
        sound.playImpact();
      }
      if (carZ > bound) {
        carZ = bound;
        carSpeed *= -0.3;
        sound.playImpact();
      }
      if (carZ < -bound) {
        carZ = -bound;
        carSpeed *= -0.3;
        sound.playImpact();
      }

      // Stunt Jump Ramp (X = 0, Z = 14)
      if (
        Math.abs(carX - 0) < 3.2 &&
        carZ > 12 &&
        carZ < 17 &&
        carSpeed > 0.25 &&
        !inAir
      ) {
        inAir = true;
        carVelocityY = 0.38;
        sound.playWarp();
      }

      // Vertical Gravity & Jump Airtime
      if (inAir) {
        carY += carVelocityY;
        carVelocityY -= 0.016; // gravity
        if (carY <= 0) {
          carY = 0;
          inAir = false;
          carVelocityY = 0;
          sound.playImpact();
        }
      }

      // Apply to Car Group
      carGroup.position.set(carX, carY, carZ);
      carGroup.rotation.y = carAngle;
      if (inAir) {
        carGroup.rotation.x = -carVelocityY * 1.4;
      } else {
        carGroup.rotation.x = 0;
      }

      // Wheel rotation
      const wRot = carSpeed * 4;
      frontLWheel.rotation.x += wRot;
      frontRWheel.rotation.x += wRot;
      backLWheel.rotation.x += wRot;
      backRWheel.rotation.x += wRot;

      // Steer Front Wheels
      frontLWheel.rotation.y = steerAngle * 0.75;
      frontRWheel.rotation.y = steerAngle * 0.75;

      // Camera Smooth Follow (Isometric 3rd Person View)
      const targetCamX = carX + Math.sin(carAngle) * 18;
      const targetCamY = carY + 16;
      const targetCamZ = carZ + Math.cos(carAngle) * 18;

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.lookAt(carX, carY + 1.2, carZ);

      // Check Smash against Wooden Crates Pyramid
      crates.forEach((crate) => {
        const dx = carX - crate.x;
        const dz = carZ - crate.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 2.0 && !crate.knocked && Math.abs(carSpeed) > 0.12) {
          crate.knocked = true;
          crate.vx = -Math.sin(carAngle) * (Math.abs(carSpeed) * 0.9 + 0.15);
          crate.vz = -Math.cos(carAngle) * (Math.abs(carSpeed) * 0.9 + 0.15);
          crate.vy = 0.22;
          sound.playImpact();
        }

        if (crate.knocked) {
          crate.x += crate.vx;
          crate.z += crate.vz;
          crate.y += crate.vy;
          crate.vy -= 0.015; // gravity on crate
          if (crate.y <= 0.7) {
            crate.y = 0.7;
            crate.vy = 0;
          }
          crate.vx *= 0.93;
          crate.vz *= 0.93;
          crate.rotX += 0.06;
          crate.mesh.position.set(crate.x, crate.y, crate.z);
          crate.mesh.rotation.x = crate.rotX;
        }
      });

      // Rotate Floating Diamonds on Campuses
      campuses.forEach((c) => {
        const dObj = scene.getObjectByName(`diamond_${c.id}`);
        if (dObj) {
          dObj.rotation.y += 0.02;
          dObj.position.y = 15 + Math.sin(frame * 0.04) * 0.4;
        }
      });

      // Proximity Detection to the 4 Campuses
      let foundCampus: (typeof campuses)[0] | null = null;
      for (const c of campuses) {
        // Distance from car to campus gate entrance
        const gateX = c.x;
        const gateZ = c.z + 7;
        const dist = Math.hypot(carX - gateX, carZ - gateZ);
        if (dist < 10) {
          foundCampus = c;
          break;
        }
      }

      if (foundCampus) {
        setActiveZone(foundCampus);
      } else {
        setActiveZone(null);
      }

      setSpeedKmh(Math.round(Math.abs(carSpeed) * 190));

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isFullscreen]);

  const handleCampusAction = (actionType: 'arcade' | 'saas' | 'cinema' | 'racing') => {
    sound.playWarp();
    if (actionType === 'arcade') {
      setArcadeModalGame({
        id: 'iron-strike',
        title: 'Iron Strike 2D Fighter',
      });
    } else if (actionType === 'saas') {
      if (onOpenSaaS) onOpenSaaS();
      else {
        const el = document.getElementById('software');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (actionType === 'cinema') {
      if (onOpenCinema) onOpenCinema();
      else {
        const el = document.getElementById('cinema');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (actionType === 'racing') {
      window.open('https://github.com/Jubayer-AI-Studio/Dhaka-Open-World-Racing', '_blank');
    }
  };

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    sound.setMuted(next);
  };

  return (
    <div
      className={`relative select-none overflow-hidden transition-all duration-500 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#93c5fd]'
          : 'w-full h-[520px] sm:h-[620px] rounded-3xl border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.3)] my-8'
      }`}
    >
      {/* 3D Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full block" />

      {/* Top HUD Bar */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-3 bg-white/90 border border-slate-200/80 px-4 py-2 rounded-2xl backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-xs font-bold text-slate-900 tracking-wider">
            BRUNO SIMON 3D CITY // JUBAYER AHMAD
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-emerald-700 font-mono text-xs font-bold hidden sm:inline">
            4 TECH FACTORY CAMPUSES
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              sound.playCarHorn();
              setHornActive(true);
              setTimeout(() => setHornActive(false), 300);
            }}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              hornActive
                ? 'bg-amber-400 text-black border-amber-500 scale-105'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
            }`}
          >
            <span>HORN [H]</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-md cursor-pointer"
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-md cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {isFullPage && onClose && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold flex items-center gap-1 transition-colors shadow-md cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>EXIT</span>
            </button>
          )}
        </div>
      </div>

      {/* Approaching Project Campus Notification Banner */}
      {activeZone && (
        <div className="absolute top-20 inset-x-4 sm:inset-x-0 sm:w-max sm:mx-auto z-20 flex flex-col items-center">
          <div className="p-4 sm:px-6 rounded-2xl bg-white/95 border-2 border-emerald-500 shadow-[0_15px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500 flex items-center justify-center text-emerald-600 font-bold">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>

            <div>
              <div className="font-mono text-[11px] text-emerald-600 font-black tracking-wider uppercase">
                {activeZone.tag}
              </div>
              <div className="text-base sm:text-xl font-black text-slate-900 font-sans">
                {activeZone.title}
              </div>
              <div className="text-slate-600 text-xs mt-0.5 max-w-md font-sans">
                {activeZone.desc}
              </div>
            </div>

            <button
              onClick={() => handleCampusAction(activeZone.actionType)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-black text-xs flex items-center gap-2 shadow-lg shadow-red-500/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{activeZone.actionText} [ENTER]</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom HUD: Speedometer & Controls Guide */}
      <div className="absolute bottom-5 inset-x-4 sm:inset-x-6 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pointer-events-none z-20">
        
        {/* Speedometer Gauge */}
        <div className="bg-white/95 border border-slate-200/80 px-5 py-3 rounded-2xl backdrop-blur-md shadow-lg flex items-center gap-4 pointer-events-auto">
          <div className="font-mono">
            <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight">
              {speedKmh}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              KM / HOUR
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-200" />

          <div className="font-mono text-xs space-y-0.5">
            <div className="text-slate-900 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span>FERRARI RED ROADSTER</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold">BRUNO SIMON PHYSICS</div>
          </div>
        </div>

        {/* Desktop Keyboard Controls Legend */}
        <div className="hidden md:flex items-center gap-2 bg-white/95 border border-slate-200/80 px-4 py-2.5 rounded-2xl backdrop-blur-md font-mono text-xs text-slate-700 shadow-lg pointer-events-auto">
          <span className="font-bold text-slate-900">DRIVE:</span>
          <span className="text-red-600 font-bold">[W / ↑]</span> Gas •
          <span className="text-red-600 font-bold">[S / ↓]</span> Reverse •
          <span className="text-red-600 font-bold">[A / D]</span> Steer •
          <span className="text-red-600 font-bold">[SPACE]</span> Drift •
          <span className="text-red-600 font-bold">[H]</span> Horn •
          <span className="text-red-600 font-bold">[R]</span> Reset
        </div>

        {/* Mobile Touch Controls */}
        <div className="flex md:hidden items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <button
              onTouchStart={() => (keysRef.current.left = true)}
              onTouchEnd={() => (keysRef.current.left = false)}
              onMouseDown={() => (keysRef.current.left = true)}
              onMouseUp={() => (keysRef.current.left = false)}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-md flex items-center justify-center active:scale-95 font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onTouchStart={() => (keysRef.current.right = true)}
              onTouchEnd={() => (keysRef.current.right = false)}
              onMouseDown={() => (keysRef.current.right = true)}
              onMouseUp={() => (keysRef.current.right = false)}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-md flex items-center justify-center active:scale-95 font-bold"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onTouchStart={() => (keysRef.current.backward = true)}
              onTouchEnd={() => (keysRef.current.backward = false)}
              onMouseDown={() => (keysRef.current.backward = true)}
              onMouseUp={() => (keysRef.current.backward = false)}
              className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-md flex items-center justify-center active:scale-95 font-bold"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
            <button
              onTouchStart={() => (keysRef.current.forward = true)}
              onTouchEnd={() => (keysRef.current.forward = false)}
              onMouseDown={() => (keysRef.current.forward = true)}
              onMouseUp={() => (keysRef.current.forward = false)}
              className="w-12 h-12 rounded-xl bg-red-600 text-white shadow-lg shadow-red-500/40 flex items-center justify-center active:scale-95 font-bold"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Embedded Arcade Modal if triggered from Coliseum */}
      {arcadeModalGame && (
        <ArcadeModal
          isOpen={Boolean(arcadeModalGame)}
          onClose={() => setArcadeModalGame(null)}
          gameId={arcadeModalGame.id}
          gameTitle={arcadeModalGame.title}
          externalUrl="https://ai.studio/apps/45effe9f-8244-49d3-a401-e4a0e09f9e90"
        />
      )}
    </div>
  );
};
