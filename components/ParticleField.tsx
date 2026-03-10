"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ParticleFieldMode = "ambient" | "intro";

type ParticleFieldProps = {
  mode?: ParticleFieldMode;
  className?: string;
};

type ParticleModeConfig = {
  particleCount: number;
  accentCount: number;
  sparkleCount: number;
  radius: number;
  accentRadius: number;
  sparkleRadius: number;
  cameraFov: number;
  cameraStartZ: number;
  cameraEndZ: number;
  coreColor: string;
  accentColor: string;
  sparkleColor: string;
  coreSize: number;
  accentSize: number;
  sparkleSize: number;
  coreOpacity: number;
  accentOpacity: number;
  sparkleOpacity: number;
  pointerInfluence: boolean;
};

const AMBIENT_CONFIG: ParticleModeConfig = {
  particleCount: 1400,
  accentCount: 450,
  sparkleCount: 0,
  radius: 32,
  accentRadius: 21,
  sparkleRadius: 0,
  cameraFov: 58,
  cameraStartZ: 24,
  cameraEndZ: 24,
  coreColor: "#3b82f6",
  accentColor: "#f8fafc",
  sparkleColor: "#f8fafc",
  coreSize: 0.1,
  accentSize: 0.065,
  sparkleSize: 0,
  coreOpacity: 0.62,
  accentOpacity: 0.36,
  sparkleOpacity: 0,
  pointerInfluence: true
};

const INTRO_CONFIG: ParticleModeConfig = {
  particleCount: 900,
  accentCount: 260,
  sparkleCount: 180,
  radius: 36,
  accentRadius: 24,
  sparkleRadius: 16,
  cameraFov: 52,
  cameraStartZ: 30,
  cameraEndZ: 22.5,
  coreColor: "#7c9dff",
  accentColor: "#c4b5fd",
  sparkleColor: "#f8fafc",
  coreSize: 0.125,
  accentSize: 0.075,
  sparkleSize: 0.052,
  coreOpacity: 0.5,
  accentOpacity: 0.28,
  sparkleOpacity: 0.22,
  pointerInfluence: false
};

const DEFAULT_CLASS_NAME = "pointer-events-none fixed inset-0 z-0 opacity-80";

function createParticles(count: number, radius = 32) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

export function ParticleField({
  mode = "ambient",
  className
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const config = mode === "intro" ? INTRO_CONFIG : AMBIENT_CONFIG;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: mode !== "intro",
      powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, mode === "intro" ? 1.6 : 1.8)
    );
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    if (mode === "intro") {
      scene.fog = new THREE.FogExp2("#090915", 0.014);
    }

    const camera = new THREE.PerspectiveCamera(
      config.cameraFov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = config.cameraStartZ;

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.BufferGeometry();
    coreGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(createParticles(config.particleCount, config.radius), 3)
    );

    const coreMaterial = new THREE.PointsMaterial({
      color: config.coreColor,
      size: config.coreSize,
      transparent: true,
      opacity: config.coreOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const coreParticles = new THREE.Points(coreGeometry, coreMaterial);

    const accentGeometry = new THREE.BufferGeometry();
    accentGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        createParticles(config.accentCount, config.accentRadius),
        3
      )
    );

    const accentMaterial = new THREE.PointsMaterial({
      color: config.accentColor,
      size: config.accentSize,
      transparent: true,
      opacity: config.accentOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const accentParticles = new THREE.Points(accentGeometry, accentMaterial);

    group.add(coreParticles);
    group.add(accentParticles);

    let sparkleGeometry: THREE.BufferGeometry | null = null;
    let sparkleMaterial: THREE.PointsMaterial | null = null;
    let sparkleParticles: THREE.Points | null = null;

    if (config.sparkleCount > 0) {
      sparkleGeometry = new THREE.BufferGeometry();
      sparkleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          createParticles(config.sparkleCount, config.sparkleRadius),
          3
        )
      );

      sparkleMaterial = new THREE.PointsMaterial({
        color: config.sparkleColor,
        size: config.sparkleSize,
        transparent: true,
        opacity: config.sparkleOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      sparkleParticles = new THREE.Points(sparkleGeometry, sparkleMaterial);
      group.add(sparkleParticles);
    }

    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);

    const clock = new THREE.Clock();
    let raf = 0;

    const handlePointerMove = (event: MouseEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, mode === "intro" ? 1.6 : 1.8)
      );
    };

    const animate = () => {
      raf = window.requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (config.pointerInfluence) {
        targetRotation.x += (pointer.y * 0.16 - targetRotation.x) * 0.03;
        targetRotation.y += (pointer.x * 0.2 - targetRotation.y) * 0.03;
      } else {
        targetRotation.x += (Math.sin(t * 0.2) * 0.05 - targetRotation.x) * 0.02;
        targetRotation.y += (Math.cos(t * 0.18) * 0.07 - targetRotation.y) * 0.02;
      }

      group.rotation.x = targetRotation.x + Math.sin(t * 0.35) * 0.025;
      group.rotation.y = targetRotation.y + Math.cos(t * 0.4) * 0.03;
      group.rotation.z = Math.sin(t * 0.25) * 0.03;

      coreParticles.rotation.y += 0.0007;
      accentParticles.rotation.x -= 0.00045;
      if (sparkleParticles) {
        sparkleParticles.rotation.z += 0.0008;
      }

      if (mode === "intro") {
        const zoomProgress = Math.min(t / 11.5, 1);
        camera.position.z = THREE.MathUtils.lerp(
          config.cameraStartZ,
          config.cameraEndZ,
          zoomProgress
        );
        coreMaterial.opacity = config.coreOpacity + Math.sin(t * 0.5) * 0.05;
        accentMaterial.opacity = config.accentOpacity + Math.cos(t * 0.62) * 0.04;
        if (sparkleMaterial) {
          sparkleMaterial.opacity =
            config.sparkleOpacity + Math.sin(t * 1.1) * 0.07;
        }
      }

      renderer.render(scene, camera);
    };

    if (config.pointerInfluence) {
      window.addEventListener("mousemove", handlePointerMove);
    }
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      if (config.pointerInfluence) {
        window.removeEventListener("mousemove", handlePointerMove);
      }
      window.removeEventListener("resize", handleResize);

      coreGeometry.dispose();
      coreMaterial.dispose();
      accentGeometry.dispose();
      accentMaterial.dispose();
      if (sparkleGeometry) {
        sparkleGeometry.dispose();
      }
      if (sparkleMaterial) {
        sparkleMaterial.dispose();
      }

      renderer.dispose();
      scene.clear();
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? DEFAULT_CLASS_NAME}
      aria-hidden="true"
    />
  );
}
