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
  Flame,
  Compass,
  RotateCcw,
} from 'lucide-react';
import { NoorHubModal } from './NoorHubModal';
import { GithubIcon } from './Icons';

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

interface PhysicsPin {
  group: THREE.Group;
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

interface PhysicsBrick {
  mesh: THREE.Mesh;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  knocked: boolean;
}

interface SmokeParticle {
  mesh: THREE.Mesh;
  active: boolean;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  vz: number;
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
  const [cameraMode, setCameraMode] = useState<'iso' | 'chase' | 'top'>('iso');
  const [nitroGauge, setNitroGauge] = useState(100);
  const [isNitroActive, setIsNitroActive] = useState(false);
  const [carCoords, setCarCoords] = useState({ x: 0, z: 25, angle: 0 });

  const [activeZone, setActiveZone] = useState<{
    id: string;
    title: string;
    tag: string;
    desc: string;
    actionText: string;
    actionType: 'saas' | 'cinema' | 'live-url';
    liveUrl?: string;
    githubUrl?: string;
  } | null>(null);

  const [noorHubModalOpen, setNoorHubModalOpen] = useState(false);
  const [hornActive, setHornActive] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // Virtual keys for keyboard & touch
  const keysRef = useRef<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    handbrake: boolean;
    nitro: boolean;
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    handbrake: false,
    nitro: false,
  });

  const activeZoneRef = useRef(activeZone);
  activeZoneRef.current = activeZone;

  const cameraModeRef = useRef(cameraMode);
  cameraModeRef.current = cameraMode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer (Vibrant Sunny Daylight Environment)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x93c5fd); // Clear sunny blue sky
    scene.fog = new THREE.FogExp2(0x93c5fd, 0.008);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const initialWidth = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 360);
    const initialHeight = container.clientHeight || 540;

    const camera = new THREE.PerspectiveCamera(
      45,
      initialWidth / Math.max(initialHeight, 1),
      0.1,
      280
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      powerPreference: isMobile ? 'default' : 'high-performance',
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Sunny Daylight Lighting (Crisp Shadows & Warm Sunlight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.9);
    sunLight.position.set(45, 65, 35);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    sunLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 190;
    sunLight.shadow.camera.left = -70;
    sunLight.shadow.camera.right = 70;
    sunLight.shadow.camera.top = 70;
    sunLight.shadow.camera.bottom = -70;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    const skyFill = new THREE.HemisphereLight(0xbae6fd, 0x4ade80, 0.95);
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

    // River / Canal cutting through (Z = -3 to +3, width 14)
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

    // North-South Main Boulevard (X = 0, length = 220, width = 10)
    const roadNSGeom = new THREE.PlaneGeometry(10, worldSize);
    const roadNS = new THREE.Mesh(roadNSGeom, roadMat);
    roadNS.rotation.x = -Math.PI / 2;
    roadNS.position.set(0, 0.05, 0);
    roadNS.receiveShadow = true;
    scene.add(roadNS);

    // East-West Main Avenues (Z = -35 and Z = 35)
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

    // Mountain perimeter
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
        actionText: 'Open NoorHub SaaS',
        actionType: 'saas' as const,
        liveUrl: 'https://noorhub.vercel.app',
        githubUrl: 'https://github.com/Jubayer-AI-Studio/NoorHub-Madrasa-Management-SaaS',
        x: -42,
        z: -35,
        color: 0x0284c7,
      },
      {
        id: 'rihlah-gadget',
        title: 'RIHLAH GADGET TECH EXPO',
        tag: 'CLOUDFLARE EDGE PWA E-COMMERCE',
        desc: 'Next.js 15 PWA E-Commerce Platform deployed on Cloudflare Pages edge network with instant cart',
        actionText: 'Visit Rihlah Gadget Shop',
        actionType: 'live-url' as const,
        liveUrl: 'https://rihlah-gadget-shop.pages.dev',
        githubUrl: 'https://github.com/Jubayer-AI-Studio/rihlah-gadget-shop',
        x: 42,
        z: -35,
        color: 0xd97706,
      },
      {
        id: 'icon-2030',
        title: 'ICON 2030 CINEMA STUDIO',
        tag: 'AI CINEMA TRILOGY',
        desc: 'Cinematic Universe with 10s Face-Locked Continuity Architecture (Directed by Jubayer Ahmad)',
        actionText: 'Watch ICON 2030 Cinema',
        actionType: 'cinema' as const,
        liveUrl: 'https://www.youtube.com/@jubayeraispecialist',
        githubUrl: 'https://github.com/Jubayer-AI-Studio',
        x: 42,
        z: 35,
        color: 0x8b5cf6,
      },
      {
        id: 'mesk-prokashon',
        title: 'MESK PROKASHON & AI TOWER',
        tag: 'DIGITAL BOOKSTORE & WHATSAPP AI',
        desc: 'Official digital bookstore of Maulana Muhammad Zainul Abedin with automated WhatsApp AI order bot',
        actionText: 'Visit Mesk Bookstore',
        actionType: 'live-url' as const,
        liveUrl: 'https://mesk-nine.vercel.app',
        githubUrl: 'https://github.com/Jubayer-AI-Studio/mesk',
        x: -42,
        z: 35,
        color: 0x059669,
      },
    ];

    // Build 3D Building Campuses
    campuses.forEach((camp) => {
      const cGroup = new THREE.Group();
      cGroup.position.set(camp.x, 0, camp.z);
      scene.add(cGroup);

      // Campus Ground Foundation Plaza
      const plazaGeom = new THREE.BoxGeometry(28, 0.4, 28);
      const plazaMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
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

      // Glass Windows Grid (Glowing Windows)
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
      const diamondGeom = new THREE.OctahedronGeometry(2.2, 0);
      const diamondMat = new THREE.MeshStandardMaterial({
        color: camp.color,
        emissive: camp.color,
        emissiveIntensity: 0.85,
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
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.set(0, 0.45, 7);
      cGroup.add(ring);
    });

    // 7. BRUNO SIMON PHYSICS OBJECTS:

    // 7A. Smashable Physics Wooden Crates Pyramid (Center Boulevard)
    const crates: PhysicsCrate[] = [];
    const crateMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Amber wooden crate
      roughness: 0.8,
    });
    const crateGeom = new THREE.BoxGeometry(1.4, 1.4, 1.4);

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
        const cz = -22;
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

    // 7B. 10 BOWLING PINS FORMATION (Classic Triangle Alley at East Side: X=26, Z=-18)
    const bowlingPins: PhysicsPin[] = [];
    const pinBodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
    const pinRedBandMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });

    const pinRows = [
      [{ x: 0, z: 0 }], // Row 1 (Head pin)
      [{ x: -0.6, z: -1.0 }, { x: 0.6, z: -1.0 }], // Row 2
      [{ x: -1.2, z: -2.0 }, { x: 0, z: -2.0 }, { x: 1.2, z: -2.0 }], // Row 3
      [{ x: -1.8, z: -3.0 }, { x: -0.6, z: -3.0 }, { x: 0.6, z: -3.0 }, { x: 1.8, z: -3.0 }], // Row 4
    ];

    pinRows.forEach((row) => {
      row.forEach((pos) => {
        const pinGroup = new THREE.Group();
        const px = 26 + pos.x;
        const py = 0;
        const pz = -18 + pos.z;
        pinGroup.position.set(px, py, pz);

        // Lower body cylinder
        const bGeom = new THREE.CylinderGeometry(0.24, 0.32, 1.2, 16);
        const bMesh = new THREE.Mesh(bGeom, pinBodyMat);
        bMesh.position.y = 0.6;
        bMesh.castShadow = true;
        pinGroup.add(bMesh);

        // Red band
        const bandGeom = new THREE.CylinderGeometry(0.21, 0.23, 0.25, 16);
        const bandMesh = new THREE.Mesh(bandGeom, pinRedBandMat);
        bandMesh.position.y = 1.0;
        pinGroup.add(bandMesh);

        // Neck & Head sphere
        const headGeom = new THREE.SphereGeometry(0.22, 16, 16);
        const headMesh = new THREE.Mesh(headGeom, pinBodyMat);
        headMesh.position.y = 1.35;
        headMesh.castShadow = true;
        pinGroup.add(headMesh);

        scene.add(pinGroup);

        bowlingPins.push({
          group: pinGroup,
          x: px,
          y: py,
          z: pz,
          vx: 0,
          vy: 0,
          vz: 0,
          rotX: 0,
          rotZ: 0,
          knocked: false,
        });
      });
    });

    // 7C. DESTRUCTIBLE BRICK WALL (West Side: X=-26, Z=-18)
    const bricks: PhysicsBrick[] = [];
    const brickColors = [0x0284c7, 0xf59e0b, 0xef4444, 0x10b981];
    const brickGeom = new THREE.BoxGeometry(1.6, 0.8, 0.8);

    for (let r = 0; r < 3; r++) {
      for (let c = -2; c <= 2; c++) {
        const bMat = new THREE.MeshStandardMaterial({
          color: brickColors[(r + c + 4) % brickColors.length],
          roughness: 0.5,
        });
        const bMesh = new THREE.Mesh(brickGeom, bMat);
        const bx = -26 + c * 1.65;
        const by = 0.4 + r * 0.82;
        const bz = -18;
        bMesh.position.set(bx, by, bz);
        bMesh.castShadow = true;
        scene.add(bMesh);

        bricks.push({
          mesh: bMesh,
          x: bx,
          y: by,
          z: bz,
          vx: 0,
          vy: 0,
          vz: 0,
          rotX: 0,
          rotY: 0,
          rotZ: 0,
          knocked: false,
        });
      }
    }

    // 7D. 3D BLOCK TEXT IN THE WORLD ("JUBAYER" on the grass)
    const textGroup = new THREE.Group();
    textGroup.position.set(0, 0, 38);
    scene.add(textGroup);

    const letterMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.2,
    });
    // Create blocky stylized letters for "J U B A Y E R"
    const letterBlocks = [
      { x: -9, w: 1.8, h: 1.8, d: 0.8 }, // J
      { x: -6, w: 1.8, h: 1.8, d: 0.8 }, // U
      { x: -3, w: 1.8, h: 1.8, d: 0.8 }, // B
      { x: 0, w: 1.8, h: 1.8, d: 0.8 },  // A
      { x: 3, w: 1.8, h: 1.8, d: 0.8 },  // Y
      { x: 6, w: 1.8, h: 1.8, d: 0.8 },  // E
      { x: 9, w: 1.8, h: 1.8, d: 0.8 },  // R
    ];
    letterBlocks.forEach((lb) => {
      const bGeom = new THREE.BoxGeometry(lb.w, lb.h, lb.d);
      const bMesh = new THREE.Mesh(bGeom, letterMat);
      bMesh.position.set(lb.x, lb.h / 2, 0);
      bMesh.castShadow = true;
      textGroup.add(bMesh);
    });

    // 8. DUAL STUNT JUMP RAMPS:
    // Ramp 1: South Ramp launching across the river (Z = 12)
    const ramp1Group = new THREE.Group();
    ramp1Group.position.set(0, 0, 12);
    scene.add(ramp1Group);

    const ramp1Geom = new THREE.BoxGeometry(6, 1.8, 6);
    ramp1Geom.rotateX(Math.PI / 9);
    const rampMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Yellow hazard ramp
      roughness: 0.4,
    });
    const ramp1Mesh = new THREE.Mesh(ramp1Geom, rampMat);
    ramp1Mesh.position.y = 0.9;
    ramp1Mesh.castShadow = true;
    ramp1Mesh.receiveShadow = true;
    ramp1Group.add(ramp1Mesh);

    // Ramp 2: North Mega Launch Ramp (Z = -12)
    const ramp2Group = new THREE.Group();
    ramp2Group.position.set(0, 0, -12);
    scene.add(ramp2Group);

    const ramp2Geom = new THREE.BoxGeometry(6, 1.8, 6);
    ramp2Geom.rotateX(-Math.PI / 9);
    const ramp2Mesh = new THREE.Mesh(ramp2Geom, rampMat);
    ramp2Mesh.position.y = 0.9;
    ramp2Mesh.castShadow = true;
    ramp2Mesh.receiveShadow = true;
    ramp2Group.add(ramp2Mesh);

    // 9. THE VIBRANT BEAUTIFUL CAR (Bruno Simon Style Ferrari Red Roadster)
    const carGroup = new THREE.Group();
    carGroup.position.set(0, 0, 25);
    scene.add(carGroup);

    // Sub-group for body roll/pitch suspension physics
    const carChassisWrapper = new THREE.Group();
    carGroup.add(carChassisWrapper);

    // Sleek Glossy Red Sports Car Body
    const carBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xdc2626, // Vivid Ferrari Red
      metalness: 0.75,
      roughness: 0.15,
      clearcoat: 0.7,
      clearcoatRoughness: 0.1,
    });

    // Lower Wedge Chassis
    const carChassisGeom = new THREE.BoxGeometry(2.2, 0.7, 4.2);
    const carChassis = new THREE.Mesh(carChassisGeom, carBodyMat);
    carChassis.position.y = 0.65;
    carChassis.castShadow = true;
    carChassisWrapper.add(carChassis);

    // White Racing Stripe down center
    const stripeGeom = new THREE.BoxGeometry(0.5, 0.72, 4.22);
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const stripe = new THREE.Mesh(stripeGeom, stripeMat);
    stripe.position.y = 0.65;
    carChassisWrapper.add(stripe);

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
    carChassisWrapper.add(cockpit);

    // Rear High-Downforce Spoiler
    const spoilerWingGeom = new THREE.BoxGeometry(2.1, 0.1, 0.6);
    const spoilerWing = new THREE.Mesh(spoilerWingGeom, carBodyMat);
    spoilerWing.position.set(0, 1.35, 1.8);
    spoilerWing.castShadow = true;
    carChassisWrapper.add(spoilerWing);

    // Spoiler Struts
    const strutGeom = new THREE.BoxGeometry(0.1, 0.4, 0.2);
    const strutMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const sL = new THREE.Mesh(strutGeom, strutMat);
    sL.position.set(-0.7, 1.15, 1.8);
    carChassisWrapper.add(sL);
    const sR = new THREE.Mesh(strutGeom, strutMat);
    sR.position.set(0.7, 1.15, 1.8);
    carChassisWrapper.add(sR);

    // Chrome Headlights with SpotLight Beams
    const hlLensMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const hlGeom = new THREE.BoxGeometry(0.4, 0.2, 0.1);
    const hlL = new THREE.Mesh(hlGeom, hlLensMat);
    hlL.position.set(-0.75, 0.65, -2.12);
    carChassisWrapper.add(hlL);
    const hlR = new THREE.Mesh(hlGeom, hlLensMat);
    hlR.position.set(0.75, 0.65, -2.12);
    carChassisWrapper.add(hlR);

    // Forward SpotLight Shining on ground
    const carHeadlight = new THREE.SpotLight(0xfffbeb, 6, 38, Math.PI / 4, 0.3, 1);
    carHeadlight.position.set(0, 0.8, -2.0);
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, -18);
    carChassisWrapper.add(lightTarget);
    carHeadlight.target = lightTarget;
    carChassisWrapper.add(carHeadlight);

    // Red Tail Lights
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tailGeom = new THREE.BoxGeometry(0.4, 0.15, 0.1);
    const tlL = new THREE.Mesh(tailGeom, tailMat);
    tlL.position.set(-0.75, 0.7, 2.12);
    carChassisWrapper.add(tlL);
    const tlR = new THREE.Mesh(tailGeom, tailMat);
    tlR.position.set(0.75, 0.7, 2.12);
    carChassisWrapper.add(tlR);

    // Dual Nitro Exhaust Pipes & Animated Flames
    const exhaustGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 12);
    exhaustGeom.rotateX(Math.PI / 2);
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 });
    const exL = new THREE.Mesh(exhaustGeom, exhaustMat);
    exL.position.set(-0.5, 0.45, 2.15);
    carChassisWrapper.add(exL);
    const exR = new THREE.Mesh(exhaustGeom, exhaustMat);
    exR.position.set(0.5, 0.45, 2.15);
    carChassisWrapper.add(exR);

    // Nitro Flame Cones (Hidden by default, scale up on Nitro)
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
    });
    const flameGeom = new THREE.ConeGeometry(0.2, 0.9, 12);
    flameGeom.rotateX(-Math.PI / 2);
    const flameL = new THREE.Mesh(flameGeom, flameMat);
    flameL.position.set(-0.5, 0.45, 2.65);
    flameL.scale.set(0.01, 0.01, 0.01);
    carChassisWrapper.add(flameL);
    const flameR = new THREE.Mesh(flameGeom, flameMat);
    flameR.position.set(0.5, 0.45, 2.65);
    flameR.scale.set(0.01, 0.01, 0.01);
    carChassisWrapper.add(flameR);

    // 4 Wheels: Rubber Tires with Alloy Rims
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

    // 10. Smoke Particles Pool (Tire smoke on drift / acceleration)
    const smokePool: SmokeParticle[] = [];
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });
    const smokeGeom = new THREE.SphereGeometry(0.25, 8, 8);

    for (let i = 0; i < 30; i++) {
      const sMesh = new THREE.Mesh(smokeGeom, smokeMat);
      sMesh.visible = false;
      scene.add(sMesh);
      smokePool.push({
        mesh: sMesh,
        active: false,
        life: 0,
        maxLife: 25,
        vx: 0,
        vy: 0,
        vz: 0,
      });
    }

    const spawnSmoke = (x: number, y: number, z: number) => {
      const p = smokePool.find((sp) => !sp.active);
      if (!p) return;
      p.active = true;
      p.life = p.maxLife;
      p.mesh.position.set(x, y, z);
      p.mesh.scale.set(0.5, 0.5, 0.5);
      p.mesh.visible = true;
      p.vx = (Math.random() - 0.5) * 0.05;
      p.vy = 0.03 + Math.random() * 0.04;
      p.vz = (Math.random() - 0.5) * 0.05;
    };

    // 11. Car Physics State
    let carX = 0;
    let carY = 0;
    let carZ = 25;
    let carVelocityY = 0;
    let carAngle = 0;
    let carSpeed = 0;
    let steerAngle = 0;
    let inAir = false;
    let nitroFuel = 100;

    const baseMaxSpeed = 0.58;
    const nitroMaxSpeed = 0.92;
    const accel = 0.018;
    const friction = 0.965;
    const turnSpeed = 0.048;

    // 12. Input Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keysRef.current.forward = true;
      if (k === 's' || k === 'arrowdown') keysRef.current.backward = true;
      if (k === 'a' || k === 'arrowleft') keysRef.current.left = true;
      if (k === 'd' || k === 'arrowright') keysRef.current.right = true;
      if (k === ' ') {
        e.preventDefault();
        keysRef.current.handbrake = true;
        sound.playDriftScreech();
      }
      if (k === 'shift') {
        e.preventDefault();
        keysRef.current.nitro = true;
        sound.playNitroBoost();
      }
      if (k === 'c') {
        setCameraMode((prev) => (prev === 'iso' ? 'chase' : prev === 'chase' ? 'top' : 'iso'));
        sound.playClick();
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
        if (cur) handleCampusAction(cur);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keysRef.current.forward = false;
      if (k === 's' || k === 'arrowdown') keysRef.current.backward = false;
      if (k === 'a' || k === 'arrowleft') keysRef.current.left = false;
      if (k === 'd' || k === 'arrowright') keysRef.current.right = false;
      if (k === ' ') keysRef.current.handbrake = false;
      if (k === 'shift') keysRef.current.nitro = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 13. Animation Loop
    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      const keys = keysRef.current;

      // Handle Nitro Boost
      const isBoosting = keys.nitro && nitroFuel > 0 && keys.forward;
      setIsNitroActive(isBoosting);

      if (isBoosting) {
        nitroFuel = Math.max(0, nitroFuel - 0.7);
        flameL.scale.set(1.2, 1.2, 1.2);
        flameR.scale.set(1.2, 1.2, 1.2);
      } else {
        nitroFuel = Math.min(100, nitroFuel + 0.15);
        flameL.scale.set(0.01, 0.01, 0.01);
        flameR.scale.set(0.01, 0.01, 0.01);
      }
      setNitroGauge(Math.round(nitroFuel));

      const curMaxSpeed = isBoosting ? nitroMaxSpeed : baseMaxSpeed;
      const curAccel = isBoosting ? accel * 2.2 : accel;

      // Acceleration & Sound
      if (keys.forward) {
        carSpeed = Math.min(curMaxSpeed, carSpeed + curAccel);
        if (frame % 14 === 0) sound.playEngineRev();
        // Emit smoke occasionally
        if (frame % 5 === 0) {
          spawnSmoke(carX + Math.sin(carAngle) * 1.5, carY + 0.3, carZ + Math.cos(carAngle) * 1.5);
        }
      } else if (keys.backward) {
        carSpeed = Math.max(-curMaxSpeed * 0.45, carSpeed - accel);
      } else {
        carSpeed *= friction;
      }

      // Handbrake / Drift
      if (keys.handbrake) {
        carSpeed *= 0.88;
        if (Math.abs(carSpeed) > 0.15 && frame % 4 === 0) {
          spawnSmoke(carX, carY + 0.3, carZ);
        }
      }

      // Steering
      const steerTarget = (keys.left ? 1 : 0) - (keys.right ? 1 : 0);
      steerAngle += (steerTarget * 0.48 - steerAngle) * 0.22;

      // Turning based on speed
      if (Math.abs(carSpeed) > 0.005) {
        const dir = carSpeed > 0 ? 1 : -1;
        carAngle += steerAngle * turnSpeed * dir;
      }

      // Forward position translation
      carX -= Math.sin(carAngle) * carSpeed;
      carZ -= Math.cos(carAngle) * carSpeed;

      // World Boundaries
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

      // Stunt Jump Ramp 1 (South River Jump: X = 0, Z = 12)
      if (
        Math.abs(carX - 0) < 3.2 &&
        carZ > 10 &&
        carZ < 15 &&
        carSpeed > 0.22 &&
        !inAir
      ) {
        inAir = true;
        carVelocityY = isBoosting ? 0.48 : 0.38;
        sound.playWarp();
      }

      // Stunt Jump Ramp 2 (North Mega Jump: X = 0, Z = -12)
      if (
        Math.abs(carX - 0) < 3.2 &&
        carZ < -10 &&
        carZ > -15 &&
        carSpeed < -0.22 &&
        !inAir
      ) {
        inAir = true;
        carVelocityY = isBoosting ? 0.48 : 0.38;
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

      // Apply coordinates to car group
      carGroup.position.set(carX, carY, carZ);
      carGroup.rotation.y = carAngle;

      // Realistic Dynamic Suspension: Body roll and pitch
      if (inAir) {
        carChassisWrapper.rotation.x = -carVelocityY * 1.5;
        carChassisWrapper.rotation.z = 0;
      } else {
        // Roll into turns, pitch on acceleration/braking
        const rollTarget = -steerAngle * Math.min(1, Math.abs(carSpeed) * 2) * 0.16;
        const pitchTarget = keys.forward ? 0.05 : keys.backward ? -0.06 : 0;
        carChassisWrapper.rotation.z += (rollTarget - carChassisWrapper.rotation.z) * 0.2;
        carChassisWrapper.rotation.x += (pitchTarget - carChassisWrapper.rotation.x) * 0.2;
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

      // Update Smoke Particles
      smokePool.forEach((p) => {
        if (!p.active) return;
        p.life -= 1;
        if (p.life <= 0) {
          p.active = false;
          p.mesh.visible = false;
        } else {
          p.mesh.position.x += p.vx;
          p.mesh.position.y += p.vy;
          p.mesh.position.z += p.vz;
          const progress = 1 - p.life / p.maxLife;
          const s = 0.5 + progress * 1.8;
          p.mesh.scale.set(s, s, s);
        }
      });

      // Camera Follow based on selected Camera Mode
      const curCamMode = cameraModeRef.current;
      let targetCamX = carX;
      let targetCamY = carY + 16;
      let targetCamZ = carZ;

      if (curCamMode === 'iso') {
        // Isometric Drone View (Bruno Simon signature angle)
        targetCamX = carX + Math.sin(carAngle) * 19;
        targetCamY = carY + 16;
        targetCamZ = carZ + Math.cos(carAngle) * 19;
      } else if (curCamMode === 'chase') {
        // Dynamic 3rd Person Racing Chase Cam
        targetCamX = carX + Math.sin(carAngle) * 12;
        targetCamY = carY + 5.5;
        targetCamZ = carZ + Math.cos(carAngle) * 12;
      } else {
        // Top-Down Helicopter Overview
        targetCamX = carX;
        targetCamY = carY + 36;
        targetCamZ = carZ + 0.1;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.085;
      camera.position.y += (targetCamY - camera.position.y) * 0.085;
      camera.position.z += (targetCamZ - camera.position.z) * 0.085;
      camera.lookAt(carX, carY + 1.2, carZ);

      // Check Smash against Wooden Crates Pyramid
      crates.forEach((crate) => {
        const dx = carX - crate.x;
        const dz = carZ - crate.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 2.0 && !crate.knocked && Math.abs(carSpeed) > 0.12) {
          crate.knocked = true;
          crate.vx = -Math.sin(carAngle) * (Math.abs(carSpeed) * 0.95 + 0.18);
          crate.vz = -Math.cos(carAngle) * (Math.abs(carSpeed) * 0.95 + 0.18);
          crate.vy = 0.25;
          sound.playImpact();
        }

        if (crate.knocked) {
          crate.x += crate.vx;
          crate.z += crate.vz;
          crate.y += crate.vy;
          crate.vy -= 0.015;
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

      // Check Smash against 10 Bowling Pins
      bowlingPins.forEach((pin) => {
        const dx = carX - pin.x;
        const dz = carZ - pin.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 1.6 && !pin.knocked && Math.abs(carSpeed) > 0.1) {
          pin.knocked = true;
          pin.vx = -Math.sin(carAngle) * (Math.abs(carSpeed) * 1.1 + 0.2);
          pin.vz = -Math.cos(carAngle) * (Math.abs(carSpeed) * 1.1 + 0.2);
          pin.vy = 0.28;
          sound.playImpact();
        }

        if (pin.knocked) {
          pin.x += pin.vx;
          pin.z += pin.vz;
          pin.y += pin.vy;
          pin.vy -= 0.016;
          if (pin.y <= 0) {
            pin.y = 0;
            pin.vy = 0;
          }
          pin.vx *= 0.92;
          pin.vz *= 0.92;
          pin.rotX += 0.08;
          pin.rotZ += 0.06;
          pin.group.position.set(pin.x, pin.y, pin.z);
          pin.group.rotation.x = pin.rotX;
          pin.group.rotation.z = pin.rotZ;
        }
      });

      // Check Smash against Brick Wall
      bricks.forEach((brick) => {
        const dx = carX - brick.x;
        const dz = carZ - brick.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 1.8 && !brick.knocked && Math.abs(carSpeed) > 0.12) {
          brick.knocked = true;
          brick.vx = -Math.sin(carAngle) * (Math.abs(carSpeed) * 1.2 + 0.15) + (Math.random() - 0.5) * 0.2;
          brick.vz = -Math.cos(carAngle) * (Math.abs(carSpeed) * 1.2 + 0.15);
          brick.vy = 0.22 + Math.random() * 0.15;
          sound.playImpact();
        }

        if (brick.knocked) {
          brick.x += brick.vx;
          brick.z += brick.vz;
          brick.y += brick.vy;
          brick.vy -= 0.015;
          if (brick.y <= 0.4) {
            brick.y = 0.4;
            brick.vy = 0;
          }
          brick.vx *= 0.94;
          brick.vz *= 0.94;
          brick.rotX += 0.05;
          brick.rotY += 0.04;
          brick.mesh.position.set(brick.x, brick.y, brick.z);
          brick.mesh.rotation.x = brick.rotX;
          brick.mesh.rotation.y = brick.rotY;
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
        const gateX = c.x;
        const gateZ = c.z + 7;
        const dist = Math.hypot(carX - gateX, carZ - gateZ);
        if (dist < 11) {
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
      setCarCoords({ x: carX, z: carZ, angle: carAngle });

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

  const handleCampusAction = (zone: {
    actionType: 'saas' | 'cinema' | 'live-url';
    liveUrl?: string;
  } | null) => {
    if (!zone) return;
    sound.playWarp();
    if (zone.actionType === 'saas') {
      if (onOpenSaaS) onOpenSaaS();
      setNoorHubModalOpen(true);
    } else if (zone.actionType === 'cinema') {
      if (onOpenCinema) onOpenCinema();
      else {
        const el = document.getElementById('cinema');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (zone.liveUrl) {
      window.open(zone.liveUrl, '_blank');
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
          : 'w-full h-[540px] sm:h-[650px] rounded-3xl border-2 border-white/40 shadow-[0_25px_70px_rgba(0,0,0,0.3)] my-8'
      }`}
    >
      {/* 3D Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full block" />

      {/* Top HUD Bar (Ultra-Compact on Mobile) */}
      <div className="absolute top-2.5 sm:top-4 inset-x-2 sm:inset-x-6 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-1.5 sm:gap-2.5 bg-white/95 border border-slate-200/90 px-2.5 py-1 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl backdrop-blur-md shadow-md pointer-events-auto shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs font-black text-slate-900 tracking-wider whitespace-nowrap">
            <span className="hidden sm:inline">BRUNO SIMON 3D CITY // </span>JUBAYER
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto shrink-0">
          {/* Reset Car Position */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }));
              sound.playWarp();
            }}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center gap-1 transition-all shadow-md cursor-pointer"
            title="Reset Car [R]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
            <span className="hidden md:inline">RESET</span>
          </button>

          {/* Camera Mode Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setCameraMode(cameraMode === 'iso' ? 'chase' : cameraMode === 'chase' ? 'top' : 'iso');
            }}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center gap-1 transition-all shadow-md cursor-pointer"
            title="Switch Camera View [C]"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline uppercase">CAM: {cameraMode}</span>
          </button>

          {/* Horn Button */}
          <button
            onClick={() => {
              sound.playCarHorn();
              setHornActive(true);
              setTimeout(() => setHornActive(false), 300);
            }}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border font-mono text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md ${
              hornActive
                ? 'bg-amber-400 text-black border-amber-500 scale-105'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
            }`}
            title="Horn [H]"
          >
            <span className="text-xs">📢</span>
            <span className="hidden md:inline">HORN</span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-md cursor-pointer"
            title="Mute Sound"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-md cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {isFullPage && onClose && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-amber-200 border border-stone-700 font-mono text-xs font-bold flex items-center gap-1 transition-colors shadow-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EXIT</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Speedometer & Nitro Mini-Badge for Mobile */}
      <div className="flex md:hidden absolute top-12 left-2.5 z-20 pointer-events-auto bg-white/95 border border-slate-200/90 px-2.5 py-1 rounded-xl shadow-md backdrop-blur-md items-center gap-2 font-mono">
        <div className="text-emerald-600 font-black text-xs">{speedKmh} <span className="text-[9px] text-slate-500">KM/H</span></div>
        <div className="h-3 w-[1px] bg-slate-300" />
        <div className="flex items-center gap-1 text-[10px] text-cyan-700 font-bold">
          <Flame className={`w-3 h-3 ${isNitroActive ? 'text-cyan-500 animate-bounce' : ''}`} />
          <span>{nitroGauge}%</span>
        </div>
      </div>

      {/* Approaching Project Campus Notification Banner (Mobile Responsive) */}
      {activeZone && (
        <div className="absolute top-16 sm:top-20 inset-x-2 sm:inset-x-0 sm:max-w-xl sm:mx-auto z-20 flex flex-col items-center pointer-events-auto">
          <div className="w-full p-3 sm:p-5 rounded-2xl bg-white/95 border-2 border-emerald-500 shadow-[0_15px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 border border-emerald-500 flex items-center justify-center text-emerald-600 font-bold shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-mono text-[10px] sm:text-[11px] text-emerald-600 font-black tracking-wider uppercase truncate">
                {activeZone.tag}
              </div>
              <div className="text-sm sm:text-lg font-black text-slate-900 font-sans truncate">
                {activeZone.title}
              </div>
              <div className="text-slate-600 text-[11px] sm:text-xs mt-0.5 line-clamp-2 font-sans">
                {activeZone.desc}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => handleCampusAction(activeZone)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-950 hover:bg-black text-amber-200 border border-amber-500/50 font-mono font-black text-xs flex items-center justify-center gap-1.5 shadow-xl transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{activeZone.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {activeZone.githubUrl && (
                <a
                  href={activeZone.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="w-full sm:w-auto px-3 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-black text-amber-200 border border-slate-700 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Real-Time Radar Mini-Map (Bottom-Right) */}
      <div className="absolute top-20 right-4 sm:right-6 pointer-events-auto z-20 hidden md:block">
        <div className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-lg backdrop-blur-md">
          <div className="text-[10px] font-mono font-bold text-slate-700 mb-1 flex items-center justify-between">
            <span>CITY RADAR</span>
            <span className="text-emerald-600">LIVE</span>
          </div>
          <svg className="w-24 h-24 bg-slate-900 rounded-xl" viewBox="-110 -110 220 220">
            {/* River */}
            <rect x="-110" y="-7" width="220" height="14" fill="#0284c7" opacity="0.6" />
            {/* Roads */}
            <rect x="-5" y="-110" width="10" height="220" fill="#475569" />
            <rect x="-110" y="-40" width="220" height="10" fill="#475569" />
            <rect x="-110" y="30" width="220" height="10" fill="#475569" />
            {/* 4 Campuses */}
            <circle cx="-42" cy="-35" r="8" fill="#0284c7" />
            <circle cx="42" cy="-35" r="8" fill="#f59e0b" />
            <circle cx="42" cy="35" r="8" fill="#8b5cf6" />
            <circle cx="-42" cy="35" r="8" fill="#16a34a" />
            {/* Player Car Marker & Heading Arrow */}
            <g transform={`translate(${carCoords.x}, ${carCoords.z}) rotate(${(-carCoords.angle * 180) / Math.PI})`}>
              <polygon points="0,-8 5,6 -5,6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* Universal Virtual Driving Controller (Always Visible on Mobile & Desktop) */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-2 sm:inset-x-5 flex items-end justify-between pointer-events-none z-20">
        
        {/* Left Control Cluster: Steering & Speedometer */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Speedometer & Nitro Status Pill */}
          <div className="bg-stone-950/90 border border-stone-800 text-white px-3.5 py-1.5 rounded-xl shadow-lg backdrop-blur-md flex items-center gap-3 font-mono">
            <div className="text-xl sm:text-2xl font-black text-amber-400">
              {speedKmh} <span className="text-[10px] text-stone-400 font-bold">KM/H</span>
            </div>
            <div className="h-4 w-[1px] bg-stone-700" />
            <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-bold">
              <Flame className={`w-3.5 h-3.5 ${isNitroActive ? 'text-cyan-300 animate-bounce' : ''}`} />
              <span>{nitroGauge}%</span>
            </div>
          </div>

          {/* Steer Left & Right Buttons */}
          <div className="flex items-center gap-2">
            <button
              onPointerDown={(e) => { e.preventDefault(); keysRef.current.left = true; }}
              onPointerUp={(e) => { e.preventDefault(); keysRef.current.left = false; }}
              onPointerLeave={() => { keysRef.current.left = false; }}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-stone-950/90 hover:bg-stone-900 active:bg-amber-500/20 active:scale-95 border-2 border-stone-700 text-amber-200 shadow-2xl flex items-center justify-center font-black cursor-pointer transition-all backdrop-blur-md"
              title="Steer Left [A / ←]"
            >
              <ArrowLeft className="w-6 h-6 text-amber-200" />
            </button>

            <button
              onPointerDown={(e) => { e.preventDefault(); keysRef.current.right = true; }}
              onPointerUp={(e) => { e.preventDefault(); keysRef.current.right = false; }}
              onPointerLeave={() => { keysRef.current.right = false; }}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-stone-950/90 hover:bg-stone-900 active:bg-amber-500/20 active:scale-95 border-2 border-stone-700 text-amber-200 shadow-2xl flex items-center justify-center font-black cursor-pointer transition-all backdrop-blur-md"
              title="Steer Right [D / →]"
            >
              <ArrowRight className="w-6 h-6 text-amber-200" />
            </button>
          </div>
        </div>

        {/* Center Control Cluster: Nitro Boost & Drift Handbrake */}
        <div className="flex items-center gap-2 pointer-events-auto mb-1">
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              keysRef.current.nitro = true;
              sound.playNitroBoost();
            }}
            onPointerUp={(e) => { e.preventDefault(); keysRef.current.nitro = false; }}
            onPointerLeave={() => { keysRef.current.nitro = false; }}
            className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border-2 font-mono text-xs font-black flex items-center gap-1.5 shadow-xl transition-all cursor-pointer backdrop-blur-md ${
              isNitroActive
                ? 'bg-cyan-500 text-black border-cyan-300 scale-105 shadow-cyan-500/50'
                : 'bg-stone-950/90 hover:bg-stone-900 text-cyan-300 border-cyan-800/80 active:scale-95'
            }`}
            title="Nitro Boost [SHIFT]"
          >
            <Flame className="w-4 h-4" />
            <span className="hidden sm:inline">NITRO</span>
          </button>

          <button
            onPointerDown={(e) => {
              e.preventDefault();
              keysRef.current.handbrake = true;
              sound.playDriftScreech();
            }}
            onPointerUp={(e) => { e.preventDefault(); keysRef.current.handbrake = false; }}
            onPointerLeave={() => { keysRef.current.handbrake = false; }}
            className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-stone-950/90 hover:bg-stone-900 active:scale-95 border-2 border-amber-700/80 text-amber-300 shadow-xl font-mono text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
            title="Drift Handbrake [SPACE]"
          >
            <span>DRIFT</span>
          </button>
        </div>

        {/* Right Control Cluster: Reverse & Prominent DRIVE FORWARD */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onPointerDown={(e) => { e.preventDefault(); keysRef.current.backward = true; }}
            onPointerUp={(e) => { e.preventDefault(); keysRef.current.backward = false; }}
            onPointerLeave={() => { keysRef.current.backward = false; }}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-stone-950/90 hover:bg-stone-900 active:bg-amber-500/20 active:scale-95 border-2 border-stone-700 text-amber-200 shadow-2xl flex items-center justify-center font-black cursor-pointer transition-all backdrop-blur-md"
            title="Reverse / Brake [S / ↓]"
          >
            <ArrowDown className="w-6 h-6 text-stone-300" />
          </button>

          <button
            onPointerDown={(e) => { e.preventDefault(); keysRef.current.forward = true; }}
            onPointerUp={(e) => { e.preventDefault(); keysRef.current.forward = false; }}
            onPointerLeave={() => { keysRef.current.forward = false; }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-t from-stone-950 to-stone-900 hover:from-black hover:to-stone-800 active:scale-95 border-2 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.35)] text-amber-300 flex flex-col items-center justify-center font-black cursor-pointer transition-all backdrop-blur-md"
            title="Drive Forward [W / ↑]"
          >
            <ArrowUp className="w-7 h-7 text-amber-300 animate-pulse" />
            <span className="text-[9px] font-mono font-bold tracking-wider text-amber-400 -mt-1">DRIVE</span>
          </button>
        </div>

      </div>



      {/* Embedded Live NOORHUB SaaS Modal if triggered from Campus */}
      <NoorHubModal
        isOpen={noorHubModalOpen}
        onClose={() => setNoorHubModalOpen(false)}
      />
    </div>
  );
};
