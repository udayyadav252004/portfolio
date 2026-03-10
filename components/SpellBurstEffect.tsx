"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

export type SpellBurstHandle = {
  cast: () => void;
};

type SpellBurstEffectProps = {
  className?: string;
};

const PARTICLE_COUNT = 420;

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(219,234,254,0.96)");
  gradient.addColorStop(0.65, "rgba(129,140,248,0.52)");
  gradient.addColorStop(1, "rgba(129,140,248,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const SpellBurstEffect = forwardRef<SpellBurstHandle, SpellBurstEffectProps>(
  function SpellBurstEffect({ className }, ref) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const castRef = useRef<() => void>(() => {
      return;
    });

    useImperativeHandle(
      ref,
      () => ({
        cast: () => {
          castRef.current();
        }
      }),
      []
    );

    useEffect(() => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance"
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(root.clientWidth, root.clientHeight);
      root.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        42,
        root.clientWidth / root.clientHeight,
        0.1,
        100
      );
      camera.position.z = 20;

      const flashGeometry = new THREE.PlaneGeometry(3.1, 3.1);
      const flashMaterial = new THREE.MeshBasicMaterial({
        color: "#dbeafe",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const flashMesh = new THREE.Mesh(flashGeometry, flashMaterial);
      scene.add(flashMesh);

      const ringGeometry = new THREE.RingGeometry(0.9, 1.2, 96);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: "#93c5fd",
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.z = -0.02;
      scene.add(ringMesh);

      const outerRingGeometry = new THREE.RingGeometry(1.25, 1.45, 96);
      const outerRingMaterial = new THREE.MeshBasicMaterial({
        color: "#c4b5fd",
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const outerRingMesh = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
      outerRingMesh.position.z = -0.03;
      scene.add(outerRingMesh);

      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const velocities = new Float32Array(PARTICLE_COUNT * 3);
      const lifetimes = new Float32Array(PARTICLE_COUNT);

      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const i3 = index * 3;
        positions[i3] = 9999;
        positions[i3 + 1] = 9999;
        positions[i3 + 2] = 9999;
        velocities[i3] = 0;
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = 0;
        lifetimes[index] = 0;
      }

      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
      );

      const particleTexture = createParticleTexture();
      const particleMaterial = new THREE.PointsMaterial({
        color: "#c7d2fe",
        size: 0.18,
        transparent: true,
        opacity: 0,
        map: particleTexture ?? undefined,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });

      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      particleSystem.position.z = -0.01;
      scene.add(particleSystem);

      const flashState = { scale: 0.25, opacity: 0 };
      const ringState = { scale: 0.35, opacity: 0 };
      const outerRingState = { scale: 0.25, opacity: 0 };
      const particleState = { opacity: 0 };

      const spawnParticles = () => {
        for (let index = 0; index < PARTICLE_COUNT; index += 1) {
          const i3 = index * 3;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const speed = 4.5 + Math.random() * 10.5;

          const vx = Math.sin(phi) * Math.cos(theta) * speed;
          const vy = Math.sin(phi) * Math.sin(theta) * speed;
          const vz = Math.cos(phi) * speed * 0.4;

          positions[i3] = (Math.random() - 0.5) * 0.24;
          positions[i3 + 1] = (Math.random() - 0.5) * 0.24;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.1;

          velocities[i3] = vx;
          velocities[i3 + 1] = vy;
          velocities[i3 + 2] = vz;
          lifetimes[index] = 0.68 + Math.random() * 0.6;
        }

        particleGeometry.attributes.position.needsUpdate = true;
      };

      const cast = () => {
        gsap.killTweensOf([flashState, ringState, outerRingState, particleState]);

        flashState.scale = 0.25;
        flashState.opacity = 1;
        ringState.scale = 0.35;
        ringState.opacity = 0.96;
        outerRingState.scale = 0.2;
        outerRingState.opacity = 0.8;
        particleState.opacity = 1;

        spawnParticles();

        gsap.to(flashState, {
          scale: 4.8,
          opacity: 0,
          duration: 0.55,
          ease: "power4.out"
        });

        gsap.to(ringState, {
          scale: 8.8,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out"
        });

        gsap.to(outerRingState, {
          scale: 10.4,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });

        gsap.to(particleState, {
          opacity: 0,
          duration: 1.25,
          ease: "power2.out"
        });
      };

      castRef.current = cast;

      const clock = new THREE.Clock();
      let raf = 0;

      const animate = () => {
        raf = window.requestAnimationFrame(animate);
        const delta = Math.min(clock.getDelta(), 0.033);

        let hasActiveParticles = false;

        for (let index = 0; index < PARTICLE_COUNT; index += 1) {
          if (lifetimes[index] <= 0) {
            continue;
          }

          hasActiveParticles = true;

          const i3 = index * 3;
          lifetimes[index] -= delta * 1.2;

          if (lifetimes[index] <= 0) {
            lifetimes[index] = 0;
            positions[i3] = 9999;
            positions[i3 + 1] = 9999;
            positions[i3 + 2] = 9999;
            continue;
          }

          velocities[i3] *= 0.972;
          velocities[i3 + 1] *= 0.972;
          velocities[i3 + 2] *= 0.968;

          positions[i3] += velocities[i3] * delta;
          positions[i3 + 1] += velocities[i3 + 1] * delta + delta * 0.45;
          positions[i3 + 2] += velocities[i3 + 2] * delta;
        }

        if (hasActiveParticles) {
          particleGeometry.attributes.position.needsUpdate = true;
        }

        flashMesh.scale.setScalar(flashState.scale);
        flashMaterial.opacity = flashState.opacity;

        ringMesh.scale.setScalar(ringState.scale);
        ringMaterial.opacity = ringState.opacity;

        outerRingMesh.scale.setScalar(outerRingState.scale);
        outerRingMaterial.opacity = outerRingState.opacity;

        particleMaterial.opacity = particleState.opacity;

        renderer.render(scene, camera);
      };

      const handleResize = () => {
        camera.aspect = root.clientWidth / root.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(root.clientWidth, root.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      };

      window.addEventListener("resize", handleResize);

      animate();

      return () => {
        window.cancelAnimationFrame(raf);
        window.removeEventListener("resize", handleResize);

        gsap.killTweensOf([flashState, ringState, outerRingState, particleState]);

        if (particleTexture) {
          particleTexture.dispose();
        }

        flashGeometry.dispose();
        flashMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        outerRingGeometry.dispose();
        outerRingMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();

        renderer.dispose();
        scene.clear();

        if (renderer.domElement.parentNode === root) {
          root.removeChild(renderer.domElement);
        }
      };
    }, []);

    const baseClassName = className
      ? `pointer-events-none absolute inset-0 z-40 ${className}`
      : "pointer-events-none absolute inset-0 z-40";

    return <div ref={rootRef} className={baseClassName} aria-hidden="true" />;
  }
);
