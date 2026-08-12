'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3D, ZoomIn, Eye } from 'lucide-react';
import { ProductType } from '@/types';

interface SteelProductViewerProps {
  productType: ProductType;
}

export const SteelProductViewer: React.FC<SteelProductViewerProps> = ({ productType }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 4.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    mainGroup.position.set(0, 0.55, 0);
    mainGroup.scale.set(0.82, 0.82, 0.82);
    scene.add(mainGroup);

    if (productType === 'structural_steel') {
      // 3D Angle/Channel Profile
      const shape = new THREE.Shape();
      const w = 1.6;
      const h = 1.6;
      const t = 0.25;
      shape.moveTo(0, 0);
      shape.lineTo(w, 0);
      shape.lineTo(w, t);
      shape.lineTo(t, t);
      shape.lineTo(t, h);
      shape.lineTo(0, h);
      shape.closePath();

      const extrudeSettings = {
        depth: 3.5,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();

      const mat = new THREE.MeshStandardMaterial({
        color: 0x64748B,
        metalness: 0.88,
        roughness: 0.2,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mainGroup.add(mesh);
    } else {
      // 3D TMT Fe-500D Bar with Ribs
      const barGroup = new THREE.Group();
      const cylGeo = new THREE.CylinderGeometry(0.4, 0.4, 4, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        metalness: 0.9,
        roughness: 0.15,
      });
      const cyl = new THREE.Mesh(cylGeo, mat);
      barGroup.add(cyl);

      // Rib rings
      const ribGeo = new THREE.TorusGeometry(0.42, 0.04, 16, 32);
      const ribMat = new THREE.MeshStandardMaterial({
        color: 0xD97706,
        metalness: 0.95,
        roughness: 0.1,
      });
      for (let y = -1.8; y <= 1.8; y += 0.3) {
        const rib = new THREE.Mesh(ribGeo, ribMat);
        rib.position.y = y;
        rib.rotation.x = Math.PI / 2;
        barGroup.add(rib);
      }
      barGroup.rotation.z = Math.PI / 4;
      mainGroup.add(barGroup);
    }

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const goldLight = new THREE.PointLight(0xf59e0b, 3, 10);
    goldLight.position.set(0, 2, 2);
    scene.add(goldLight);

    // Interactive Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.style.cursor = 'grab';
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        mainGroup.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
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
      cancelAnimationFrame(reqId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [productType, isRotating]);

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl liquid-glass bg-slate-950/80 overflow-hidden border border-white/15 my-4">
      
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* 3D Overlay Badge */}
      <div className="absolute top-3 left-3 glass-pill px-3 py-1 text-[10px] font-bold text-amber-300 flex items-center gap-1.5 backdrop-blur-md">
        <span>3D Interactive Inspection</span>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={`glass-pill px-3 py-1 text-[10px] font-bold transition-all flex items-center gap-1 ${
            isRotating ? 'text-amber-300 bg-amber-500/20' : 'text-slate-300'
          }`}
        >
          <Rotate3D className="w-3.5 h-3.5" />
          <span>{isRotating ? 'Auto-Orbiting' : 'Paused'}</span>
        </button>
        <div className="glass-pill px-2.5 py-1 text-[10px] text-slate-300 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>Drag to Rotate 360°</span>
        </div>
      </div>

    </div>
  );
};
