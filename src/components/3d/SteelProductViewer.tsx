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
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          setIsWebGLAvailable(false);
          return false;
        }
        return true;
      } catch (e) {
        setIsWebGLAvailable(false);
        return false;
      }
    };

    if (!checkWebGL()) {
      mediaQuery.removeEventListener('change', handleMotionChange);
      return;
    }

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

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Cap pixel ratio for mobile performance
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);
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
        bevelSegments: 2, // Reduced for mobile
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
      const cylGeo = new THREE.CylinderGeometry(0.4, 0.4, 4, 24); // Reduced segments for mobile
      const mat = new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        metalness: 0.9,
        roughness: 0.15,
      });
      const cyl = new THREE.Mesh(cylGeo, mat);
      barGroup.add(cyl);

      // Rib rings
      const ribGeo = new THREE.TorusGeometry(0.42, 0.04, 8, 16); // Reduced segments for mobile
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

    // Lighting setup - Simplified for mobile
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const goldLight = new THREE.PointLight(0xf59e0b, 2.5, 10);
    goldLight.position.set(0, 2, 2);
    scene.add(goldLight);

    // Interactive Drag Controls - Touch and Mouse
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

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.style.cursor = 'grab';
    domElem.addEventListener('mousedown', onMouseDown);
    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Reduce animation speed for reduced motion
      const rotationSpeed = prefersReducedMotion ? 0.001 : 0.008;
      
      if (isRotating && !isDragging && !prefersReducedMotion) {
        mainGroup.rotation.y += rotationSpeed;
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
      domElem.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [productType, isRotating, prefersReducedMotion]);

  // Fallback for WebGL unavailable
  if (!isWebGLAvailable) {
    return (
      <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl liquid-glass bg-slate-950/80 overflow-hidden border border-white/15 my-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full opacity-50" />
            <p className="text-slate-400 text-sm">3D viewer not available</p>
            <p className="text-slate-500 text-xs mt-2">WebGL not supported on this device</p>
          </div>
        </div>
        <div className="absolute top-3 left-3 glass-pill px-3 py-1 text-[10px] font-bold text-amber-300 flex items-center gap-1.5 backdrop-blur-md">
          <span>Product Inspection</span>
        </div>
      </div>
    );
  }

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
