'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SteelHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for objects
    const group = new THREE.Group();
    group.position.set(0, 0.4, 0);
    scene.add(group);

    // 1. Create Metallic Structural Steel Beam (I-Beam shape using ExtrudeGeometry)
    const beamShape = new THREE.Shape();
    // I-Beam profile
    const w = 1.2;
    const h = 2.4;
    const t = 0.2;
    beamShape.moveTo(-w / 2, h / 2);
    beamShape.lineTo(w / 2, h / 2);
    beamShape.lineTo(w / 2, h / 2 - t);
    beamShape.lineTo(t / 2, h / 2 - t);
    beamShape.lineTo(t / 2, -h / 2 + t);
    beamShape.lineTo(w / 2, -h / 2 + t);
    beamShape.lineTo(w / 2, -h / 2);
    beamShape.lineTo(-w / 2, -h / 2);
    beamShape.lineTo(-w / 2, -h / 2 + t);
    beamShape.lineTo(-t / 2, -h / 2 + t);
    beamShape.lineTo(-t / 2, h / 2 - t);
    beamShape.lineTo(-w / 2, h / 2 - t);
    beamShape.closePath();

    const extrudeSettings = {
      depth: 6,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const beamGeo = new THREE.ExtrudeGeometry(beamShape, extrudeSettings);
    beamGeo.center();

    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x94A3B8,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });

    const steelBeam = new THREE.Mesh(beamGeo, steelMaterial);
    steelBeam.position.set(-1.8, 0, 0);
    steelBeam.rotation.set(0.4, 0.6, 0.2);
    group.add(steelBeam);

    // 2. Create Metallic TMT Rebar (Cylinder with rib rings)
    const rebarGroup = new THREE.Group();
    const rodGeo = new THREE.CylinderGeometry(0.35, 0.35, 6.5, 32);
    const goldSteelMaterial = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      metalness: 0.9,
      roughness: 0.2,
    });
    const mainRod = new THREE.Mesh(rodGeo, goldSteelMaterial);
    rebarGroup.add(mainRod);

    // Add TMT rib rings
    const ringGeo = new THREE.TorusGeometry(0.37, 0.04, 12, 24);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD97706,
      metalness: 0.95,
      roughness: 0.15,
    });
    for (let i = -3; i <= 3; i += 0.4) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = i;
      ring.rotation.x = Math.PI / 2;
      rebarGroup.add(ring);
    }

    rebarGroup.position.set(2.2, 0.2, -1);
    rebarGroup.rotation.set(-0.3, -0.5, 0.3);
    group.add(rebarGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff0dd, 2.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x2563eb, 3, 20);
    blueLight.position.set(-5, -3, 3);
    scene.add(blueLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 4, 20);
    amberLight.position.set(5, 3, 4);
    scene.add(amberLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      steelBeam.rotation.y += 0.005;
      steelBeam.rotation.x += 0.002;

      rebarGroup.rotation.y -= 0.006;
      rebarGroup.rotation.z += 0.003;

      // Parallax smooth camera movement
      group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.05;
      group.rotation.x += (-mouseY * 0.3 - group.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      beamGeo.dispose();
      steelMaterial.dispose();
      rodGeo.dispose();
      goldSteelMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 opacity-85 overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
