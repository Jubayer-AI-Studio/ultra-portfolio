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
  ExternalLink,
} from 'lucide-react';
import { ArcadeModal } from './ArcadeModal';

interface BrunoWorldProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenArcade?: (gameId: string, title: string) => void;
}

interface PhysicsBlock {
  mesh: THREE.Mesh;
  x: number;
  z: number;
  vx: number;
  vz: number;
  rotX: number;
  rotZ: number;
  knocked: boolean;
}

export const BrunoWorld: React.FC<BrunoWorldProps> = ({
  isOpen,
  onClose,
  onOpenArcade,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [activeZone, setActiveZone] = useState<{
    id: string;
    title: string;
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
    if (!isOpen) return;

    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070a);
    scene.fog = new THREE.FogExp2(0x06070a, 0.015);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
    dirLight.position.set(30, 45, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -40;
    dirLight.shadow.camera.right = 40;
    dirLight.shadow.camera.top = 40;
    dirLight.shadow.camera.bottom = -40;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const cyanSpot = new THREE.PointLight(0x00f0ff, 3, 40);
    cyanSpot.position.set(0, 15, 0);
    scene.add(cyanSpot);

    // 3. Ground Arena Track (Stylized Bruno Simon Asphault with Grid & Neon Curbs)
    const floorSize = 180;
    const groundGeom = new THREE.PlaneGeometry(floorSize, floorSize, 64, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090c14,
      roughness: 0.8,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid Floor Overlay
    const gridHelper = new THREE.GridHelper(floorSize, 45, 0x00f0ff, 0x141a29);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Track Perimeter Walls (Neon Glass Barriers)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
    });
    const half = floorSize / 2 - 2;
    const createWall = (x: number, z: number, w: number, d: number) => {
      const wallGeom = new THREE.BoxGeometry(w, 2, d);
      const wall = new THREE.Mesh(wallGeom, wallMat);
      wall.position.set(x, 1, z);
      scene.add(wall);
    };
    createWall(0, -half, floorSize, 1);
    createWall(0, half, floorSize, 1);
    createWall(-half, 0, 1, floorSize);
    createWall(half, 0, 1, floorSize);

    // 4. Build The Cyber Toy Car (Bruno Simon Style Roadster)
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    // Car Body / Chassis (Aerodynamic Sports Wedge)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x007799,
      emissiveIntensity: 0.2,
    });
    const chassisGeom = new THREE.BoxGeometry(2, 0.6, 3.8);
    const chassis = new THREE.Mesh(chassisGeom, bodyMat);
    chassis.position.y = 0.6;
    chassis.castShadow = true;
    carGroup.add(chassis);

    // Cabin / Windshield
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.1,
      metalness: 0.9,
    });
    const cabinGeom = new THREE.BoxGeometry(1.6, 0.55, 1.8);
    const cabin = new THREE.Mesh(cabinGeom, cabinMat);
    cabin.position.set(0, 1.05, -0.2);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Rear Spoiler
    const spoilerGeom = new THREE.BoxGeometry(1.8, 0.1, 0.5);
    const spoiler = new THREE.Mesh(spoilerGeom, bodyMat);
    spoiler.position.set(0, 1.15, 1.7);
    spoiler.castShadow = true;
    carGroup.add(spoiler);

    // Glowing Cyber Headlights
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hlGeom = new THREE.BoxGeometry(0.35, 0.15, 0.1);
    const hlLeft = new THREE.Mesh(hlGeom, headlightMat);
    hlLeft.position.set(-0.7, 0.6, -1.9);
    carGroup.add(hlLeft);

    const hlRight = new THREE.Mesh(hlGeom, headlightMat);
    hlRight.position.set(0.7, 0.6, -1.9);
    carGroup.add(hlRight);

    // Forward SpotLight Beam
    const carLight = new THREE.SpotLight(0xffffff, 8, 30, Math.PI / 4, 0.3, 1);
    carLight.position.set(0, 0.8, -1.8);
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, -15);
    carGroup.add(lightTarget);
    carLight.target = lightTarget;
    carGroup.add(carLight);

    // 4 Wheels with rotation
    const wheelGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 24);
    wheelGeom.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.6,
      metalness: 0.4,
    });

    const createWheel = (x: number, y: number, z: number) => {
      const wMesh = new THREE.Mesh(wheelGeom, wheelMat);
      wMesh.position.set(x, y, z);
      wMesh.castShadow = true;
      carGroup.add(wMesh);
      return wMesh;
    };

    const frontLeftWheel = createWheel(-1.1, 0.42, -1.2);
    const frontRightWheel = createWheel(1.1, 0.42, -1.2);
    const backLeftWheel = createWheel(-1.1, 0.42, 1.2);
    const backRightWheel = createWheel(1.1, 0.42, 1.2);

    // 5. Interactive Stations & Billboards in 3D Space
    const zones = [
      {
        id: 'noorhub',
        title: 'NOORHUB SAAS PLATFORM',
        desc: 'Complete Madrasa & Educational SaaS Architecture (Next.js 15 + Cloudflare)',
        actionText: 'Open SaaS Architecture',
        actionType: 'saas' as const,
        x: -24,
        z: -24,
        color: 0x00f0ff,
        iconLabel: 'NOORHUB',
      },
      {
        id: 'iron-strike',
        title: 'IRON STRIKE 2D FIGHTER',
        desc: 'Retro Martial Arts Arcade Arena (Playable In-Page with Combos)',
        actionText: 'Fight in Arcade',
        actionType: 'arcade' as const,
        x: 24,
        z: -24,
        color: 0xf59e0b,
        iconLabel: 'IRON STRIKE',
      },
      {
        id: 'icon-2030',
        title: 'ICON 2030 CINEMA THEATER',
        desc: 'AI Cinema Trilogy with 10s Continuity Pipeline (Directed by JUBAYER)',
        actionText: 'Launch Cinema',
        actionType: 'cinema' as const,
        x: 24,
        z: 24,
        color: 0xf43f5e,
        iconLabel: 'ICON 2030',
      },
      {
        id: 'dhaka-racing',
        title: 'DHAKA OPEN WORLD RACING',
        desc: '10+ Authentic Dhaka City Routes with Real Damage Physics',
        actionText: 'View Racing Game',
        actionType: 'racing' as const,
        x: -24,
        z: 24,
        color: 0x10b981,
        iconLabel: 'DHAKA RACING',
      },
    ];

    // Build 3D Monument for each zone
    zones.forEach((z) => {
      const zGroup = new THREE.Group();
      zGroup.position.set(z.x, 0, z.z);
      scene.add(zGroup);

      // Floor Activation Ring
      const ringGeom = new THREE.RingGeometry(5.5, 6, 32);
      ringGeom.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: z.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.y = 0.05;
      zGroup.add(ring);

      // 3D Monolith Pedestal
      const colGeom = new THREE.CylinderGeometry(1.6, 2, 4, 16);
      const colMat = new THREE.MeshStandardMaterial({
        color: 0x121520,
        metalness: 0.7,
        roughness: 0.2,
      });
      const col = new THREE.Mesh(colGeom, colMat);
      col.position.y = 2;
      col.castShadow = true;
      zGroup.add(col);

      // Floating Crystal Diamond
      const diamondGeom = new THREE.OctahedronGeometry(1.4, 0);
      const diamondMat = new THREE.MeshStandardMaterial({
        color: z.color,
        emissive: z.color,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.9,
      });
      const diamond = new THREE.Mesh(diamondGeom, diamondMat);
      diamond.position.y = 5.2;
      diamond.castShadow = true;
      diamond.name = `diamond_${z.id}`;
      zGroup.add(diamond);

      // Floating SpotLight for monument
      const zLight = new THREE.PointLight(z.color, 3, 14);
      zLight.position.set(0, 5, 0);
      zGroup.add(zLight);
    });

    // 6. Interactive Physics Domino Blocks & Bowling Pins to Smash!
    const physicsBlocks: PhysicsBlock[] = [];
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.3,
      metalness: 0.2,
    });
    const blockGeom = new THREE.BoxGeometry(0.8, 1.8, 0.4);

    // Create a row of dominoes near center (0, -8)
    for (let i = 0; i < 9; i++) {
      const mesh = new THREE.Mesh(blockGeom, blockMat);
      const bx = -4 + i * 1;
      const bz = -8;
      mesh.position.set(bx, 0.9, bz);
      mesh.castShadow = true;
      scene.add(mesh);

      physicsBlocks.push({
        mesh,
        x: bx,
        z: bz,
        vx: 0,
        vz: 0,
        rotX: 0,
        rotZ: 0,
        knocked: false,
      });
    }

    // 7. Stunt Jump Ramp (Launch the car into the air!)
    const rampGroup = new THREE.Group();
    rampGroup.position.set(0, 0, 10);
    scene.add(rampGroup);

    const rampGeom = new THREE.BoxGeometry(4, 1.2, 5);
    rampGeom.rotateX(Math.PI / 12);
    const rampMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      roughness: 0.4,
      metalness: 0.6,
    });
    const rampMesh = new THREE.Mesh(rampGeom, rampMat);
    rampMesh.position.y = 0.5;
    rampMesh.castShadow = true;
    rampMesh.receiveShadow = true;
    rampGroup.add(rampMesh);

    // 8. Car Driving Physics Variables
    let carX = 0;
    let carZ = 0;
    let carY = 0;
    let carVelocityY = 0;
    let carAngle = 0;
    let carSpeed = 0;
    let steerAngle = 0;
    let inAir = false;

    const maxSpeed = 0.55;
    const accel = 0.016;
    const friction = 0.965;
    const turnSpeed = 0.045;

    // 9. Input Listeners
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
        // Reset Car
        carX = 0;
        carZ = 0;
        carY = 0;
        carVelocityY = 0;
        carAngle = 0;
        carSpeed = 0;
        steerAngle = 0;
        sound.playWarp();
      }
      if (k === 'escape') {
        onClose();
      }
      if (k === 'enter') {
        const curZone = activeZoneRef.current;
        if (curZone) {
          handleZoneAction(curZone.actionType);
        }
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

    // 10. Animation Loop
    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;

      // Keyboard & physics step
      const keys = keysRef.current;

      // Acceleration
      if (keys.forward) {
        carSpeed = Math.min(maxSpeed, carSpeed + accel);
        if (frame % 15 === 0) sound.playEngineRev();
      } else if (keys.backward) {
        carSpeed = Math.max(-maxSpeed * 0.45, carSpeed - accel);
      } else {
        carSpeed *= friction;
      }

      // Handbrake
      if (keys.handbrake) {
        carSpeed *= 0.88;
      }

      // Steering
      const steerTarget = (keys.left ? 1 : 0) - (keys.right ? 1 : 0);
      steerAngle += (steerTarget * 0.45 - steerAngle) * 0.2;

      // Turn car based on speed
      if (Math.abs(carSpeed) > 0.005) {
        const dir = carSpeed > 0 ? 1 : -1;
        carAngle += steerAngle * turnSpeed * dir;
      }

      // Forward vector
      carX -= Math.sin(carAngle) * carSpeed;
      carZ -= Math.cos(carAngle) * carSpeed;

      // Arena boundaries
      const bound = half - 3;
      if (carX > bound) {
        carX = bound;
        carSpeed *= -0.4;
        sound.playImpact();
      }
      if (carX < -bound) {
        carX = -bound;
        carSpeed *= -0.4;
        sound.playImpact();
      }
      if (carZ > bound) {
        carZ = bound;
        carSpeed *= -0.4;
        sound.playImpact();
      }
      if (carZ < -bound) {
        carZ = -bound;
        carSpeed *= -0.4;
        sound.playImpact();
      }

      // Stunt Ramp Jump Check (Ramp is at 0, 10, size 4x5)
      if (
        Math.abs(carX - 0) < 2.2 &&
        carZ > 8 &&
        carZ < 13 &&
        carSpeed > 0.25 &&
        !inAir
      ) {
        inAir = true;
        carVelocityY = 0.35;
        sound.playWarp();
      }

      // Vertical Gravity & Jump
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

      // Apply transformations to Car Group
      carGroup.position.set(carX, carY, carZ);
      carGroup.rotation.y = carAngle;
      if (inAir) {
        carGroup.rotation.x = -carVelocityY * 1.5;
      } else {
        carGroup.rotation.x = 0;
      }

      // Rotate Wheels with speed
      const wheelRotSpeed = carSpeed * 4;
      frontLeftWheel.rotation.x += wheelRotSpeed;
      frontRightWheel.rotation.x += wheelRotSpeed;
      backLeftWheel.rotation.x += wheelRotSpeed;
      backRightWheel.rotation.x += wheelRotSpeed;

      // Steer Front Wheels
      frontLeftWheel.rotation.y = steerAngle * 0.8;
      frontRightWheel.rotation.y = steerAngle * 0.8;

      // Camera Smooth Follow (Isometric 3rd Person)
      const targetCamX = carX + Math.sin(carAngle) * 16;
      const targetCamY = carY + 14;
      const targetCamZ = carZ + Math.cos(carAngle) * 16;

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.lookAt(carX, carY + 1, carZ);

      // Check Smash against Domino Physics Blocks
      physicsBlocks.forEach((block) => {
        const dx = carX - block.x;
        const dz = carZ - block.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 1.8 && !block.knocked && Math.abs(carSpeed) > 0.1) {
          block.knocked = true;
          block.vx = -Math.sin(carAngle) * (Math.abs(carSpeed) * 0.8 + 0.1);
          block.vz = -Math.cos(carAngle) * (Math.abs(carSpeed) * 0.8 + 0.1);
          sound.playImpact();
        }

        if (block.knocked) {
          block.x += block.vx;
          block.z += block.vz;
          block.vx *= 0.92;
          block.vz *= 0.92;
          block.rotX += 0.08;
          block.mesh.position.set(block.x, 0.45, block.z);
          block.mesh.rotation.x = block.rotX;
        }
      });

      // Rotate Floating Diamonds in Stations
      zones.forEach((z) => {
        const dObj = scene.getObjectByName(`diamond_${z.id}`);
        if (dObj) {
          dObj.rotation.y += 0.02;
          dObj.position.y = 5.2 + Math.sin(frame * 0.05) * 0.3;
        }
      });

      // Proximity Check to Stations
      let foundZone: (typeof zones)[0] | null = null;
      for (const z of zones) {
        const dist = Math.hypot(carX - z.x, carZ - z.z);
        if (dist < 7) {
          foundZone = z;
          break;
        }
      }

      if (foundZone) {
        setActiveZone(foundZone);
      } else {
        setActiveZone(null);
      }

      // Update KM/H state
      setSpeedKmh(Math.round(Math.abs(carSpeed) * 180));

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
  }, [isOpen]);

  const handleZoneAction = (actionType: 'arcade' | 'saas' | 'cinema' | 'racing') => {
    sound.playWarp();
    if (actionType === 'arcade') {
      if (onOpenArcade) {
        onOpenArcade('iron-strike', 'Iron Strike 2D Fighter');
      } else {
        setArcadeModalGame({
          id: 'iron-strike',
          title: 'Iron Strike 2D Fighter',
        });
      }
    } else if (actionType === 'saas') {
      onClose();
      const el = document.getElementById('software');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'cinema') {
      onClose();
      const el = document.getElementById('cinema');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionType === 'racing') {
      window.open('https://github.com/Jubayer-AI-Studio/Dhaka-Open-World-Racing', '_blank');
    }
  };

  const toggleMute = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    sound.setMuted(next);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden select-none">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-3 bg-zinc-950/80 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            BRUNO SIMON 3D CAR WORLD // JUBAYER AHMAD
          </span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-cyan-400 font-mono text-xs hidden sm:inline">
            PHYSICS PLAYGROUND
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              sound.playCarHorn();
              setHornActive(true);
              setTimeout(() => setHornActive(false), 300);
            }}
            className={`px-3.5 py-2 rounded-xl border font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              hornActive
                ? 'bg-yellow-400 text-black border-yellow-300 scale-105'
                : 'bg-zinc-900/90 hover:bg-zinc-800 text-yellow-300 border-white/10'
            }`}
          >
            <span>HORN [H]</span>
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900/90 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-zinc-300 hover:text-rose-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>EXIT 3D WORLD</span>
          </button>
        </div>
      </div>

      {/* Proximity Station Alert Banner (When car drives close to a station) */}
      {activeZone && (
        <div className="absolute top-20 inset-x-4 sm:inset-x-0 sm:w-max sm:mx-auto z-20 flex flex-col items-center">
          <div className="p-4 sm:px-6 rounded-2xl bg-zinc-950/95 border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.4)] backdrop-blur-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-bold">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                APPROACHING SECTOR
              </div>
              <div className="text-base sm:text-lg font-black text-white">
                {activeZone.title}
              </div>
              <div className="text-zinc-400 text-xs mt-0.5 max-w-sm">
                {activeZone.desc}
              </div>
            </div>

            <button
              onClick={() => handleZoneAction(activeZone.actionType)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-mono font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-400/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{activeZone.actionText} [ENTER]</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Center: Speedometer & Controls Guide */}
      <div className="absolute bottom-6 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 pointer-events-none z-20">
        
        {/* Speedometer Gauge HUD */}
        <div className="bg-zinc-950/85 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md flex items-center gap-4 pointer-events-auto">
          <div className="font-mono">
            <div className="text-3xl sm:text-4xl font-black text-cyan-300 tracking-tight">
              {speedKmh}
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
              KM / HOUR
            </div>
          </div>

          <div className="h-8 w-[1px] bg-zinc-800" />

          <div className="font-mono text-xs text-zinc-400 space-y-0.5">
            <div className="text-white font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>SPORT MODE</span>
            </div>
            <div className="text-[11px] text-zinc-500">CYBER CHASSIS</div>
          </div>
        </div>

        {/* Keyboard Controls Legend (Desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-950/85 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md font-mono text-xs text-zinc-400 pointer-events-auto">
          <span>DRIVE:</span>
          <span className="text-cyan-300">[W / ↑]</span> Gas •
          <span className="text-cyan-300">[S / ↓]</span> Reverse •
          <span className="text-cyan-300">[A / D]</span> Steer •
          <span className="text-cyan-300">[SPACE]</span> Drift •
          <span className="text-cyan-300">[H]</span> Horn •
          <span className="text-cyan-300">[R]</span> Reset
        </div>

        {/* Touch Controls (Mobile) */}
        <div className="flex md:hidden items-center gap-3 pointer-events-auto">
          {/* Steer buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onTouchStart={() => (keysRef.current.left = true)}
              onTouchEnd={() => (keysRef.current.left = false)}
              onMouseDown={() => (keysRef.current.left = true)}
              onMouseUp={() => (keysRef.current.left = false)}
              className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-white/15 flex items-center justify-center text-white active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onTouchStart={() => (keysRef.current.right = true)}
              onTouchEnd={() => (keysRef.current.right = false)}
              onMouseDown={() => (keysRef.current.right = true)}
              onMouseUp={() => (keysRef.current.right = false)}
              className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-white/15 flex items-center justify-center text-white active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Gas & Reverse pedals */}
          <div className="flex items-center gap-1.5">
            <button
              onTouchStart={() => (keysRef.current.backward = true)}
              onTouchEnd={() => (keysRef.current.backward = false)}
              onMouseDown={() => (keysRef.current.backward = true)}
              onMouseUp={() => (keysRef.current.backward = false)}
              className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-white/15 flex items-center justify-center text-rose-300 active:scale-95"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
            <button
              onTouchStart={() => (keysRef.current.forward = true)}
              onTouchEnd={() => (keysRef.current.forward = false)}
              onMouseDown={() => (keysRef.current.forward = true)}
              onMouseUp={() => (keysRef.current.forward = false)}
              className="w-12 h-12 rounded-xl bg-cyan-400 text-black font-bold flex items-center justify-center active:scale-95 shadow-lg shadow-cyan-400/30"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Embedded Arcade Modal if Triggered from Bruno World */}
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
