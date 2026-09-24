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

    if (productType === 'structural_steel' || productType === 'ms_angles') {
      // 3D Equal Angle Profile (L-Shape)
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
        bevelSegments: 2,
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
    } else if (productType === 'ms_channels') {
      // 3D ISMC Channel Profile (C-Shape)
      const shape = new THREE.Shape();
      const w = 1.5;
      const h = 2.2;
      const t = 0.25;
      shape.moveTo(0, 0);
      shape.lineTo(w, 0);
      shape.lineTo(w, t);
      shape.lineTo(t, t);
      shape.lineTo(t, h - t);
      shape.lineTo(w, h - t);
      shape.lineTo(w, h);
      shape.lineTo(0, h);
      shape.closePath();

      const extrudeSettings = {
        depth: 3.5,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();

      const mat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.9,
        roughness: 0.18,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mainGroup.add(mesh);
    } else if (productType === 'ms_flats') {
      // 3D MS Flat / Patti Strip Profile (Elongated hot-rolled steel flat strip)
      // Realistic proportions: wide (0.95), slender gauge thickness (0.12), elongated commercial stock strip (5.4)
      const stripWidth = 0.95;
      const stripThickness = 0.12;
      const stripLength = 5.4;

      // Create procedural canvas textures for authentic hot-rolled mill scale steel
      const createMillScaleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Base dark blue-gray steel mill finish
        ctx.fillStyle = '#2b313b';
        ctx.fillRect(0, 0, 512, 512);

        // Rolling mill grain striations along the length
        for (let i = 0; i < 500; i++) {
          const y = Math.random() * 512;
          const h = 1 + Math.random() * 2.5;
          const alpha = 0.04 + Math.random() * 0.08;
          ctx.fillStyle = Math.random() > 0.4 
            ? `rgba(20, 24, 30, ${alpha})` 
            : `rgba(65, 75, 88, ${alpha})`;
          ctx.fillRect(0, y, 512, h);
        }

        // Mill scale micro-mottling & thermal oxidation specks
        for (let j = 0; j < 3000; j++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const radius = Math.random() * 1.8;
          const shade = Math.random();
          if (shade > 0.6) {
            ctx.fillStyle = 'rgba(78, 88, 102, 0.12)'; // cooler steel fleck
          } else if (shade > 0.2) {
            ctx.fillStyle = 'rgba(15, 18, 22, 0.18)'; // dark magnetite scale
          } else {
            ctx.fillStyle = 'rgba(92, 60, 38, 0.09)'; // subtle oxidation tint
          }
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 4);
        return texture;
      };

      const createBumpTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 256, 256);

        // Subtle hot-rolled surface roughness
        for (let k = 0; k < 2000; k++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          const val = Math.floor(Math.random() * 60);
          ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
          ctx.fillRect(x, y, 1.5, 1.5);
        }

        const bumpMap = new THREE.CanvasTexture(canvas);
        bumpMap.wrapS = THREE.RepeatWrapping;
        bumpMap.wrapT = THREE.RepeatWrapping;
        bumpMap.repeat.set(1, 4);
        return bumpMap;
      };

      const millScaleTex = createMillScaleTexture();
      const bumpTex = createBumpTexture();

      const geo = new THREE.BoxGeometry(stripWidth, stripThickness, stripLength);

      // Authentic hot-rolled structural steel material:
      // Dark slate/gunmetal with cool charcoal-blue undertone (#333842)
      const mat = new THREE.MeshStandardMaterial({
        color: 0x333b45,
        map: millScaleTex || null,
        bumpMap: bumpTex || null,
        bumpScale: 0.015,
        metalness: 0.86,
        roughness: 0.42,
      });

      const mesh = new THREE.Mesh(geo, mat);
      // Realistic diagonal dynamic display angle so buyer sees the elongated flat strip profile clearly
      mesh.rotation.x = THREE.MathUtils.degToRad(18);
      mesh.rotation.y = THREE.MathUtils.degToRad(-35);
      mesh.rotation.z = THREE.MathUtils.degToRad(22);
      mainGroup.add(mesh);
    } else if (productType === 'ms_rounds') {
      // 3D MS Round Bar - Gol (Smooth Solid Cylinder)
      const cylGeo = new THREE.CylinderGeometry(0.45, 0.45, 4, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x94A3B8,
        metalness: 0.92,
        roughness: 0.15,
      });
      const cyl = new THREE.Mesh(cylGeo, mat);
      cyl.rotation.z = Math.PI / 4;
      mainGroup.add(cyl);
    } else if (productType === 'ms_squares') {
      // 3D MS Square Bar - Chakor (Cuboidal Solid Rod, square cross-section)
      const sqGeo = new THREE.BoxGeometry(0.8, 0.8, 4);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.88,
        roughness: 0.2,
      });
      const sqMesh = new THREE.Mesh(sqGeo, mat);
      sqMesh.rotation.z = Math.PI / 4;
      sqMesh.rotation.y = Math.PI / 6;
      mainGroup.add(sqMesh);
    } else {
      // 3D TMT Fe-500D Bar with Ribs
      const barGroup = new THREE.Group();
      const cylGeo = new THREE.CylinderGeometry(0.4, 0.4, 4, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        metalness: 0.9,
        roughness: 0.15,
      });
      const cyl = new THREE.Mesh(cylGeo, mat);
      barGroup.add(cyl);

      // Rib rings
      const ribGeo = new THREE.TorusGeometry(0.42, 0.04, 8, 16);
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
      <div className="relative w-full h-72 sm:h-80 md:h-96 liquid-glass bg-steel-50/80 overflow-hidden border border-black my-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-steel-200 to-steel-300 opacity-50" />
            <p className="text-steel-600 text-sm">3D viewer not available</p>
            <p className="text-steel-500 text-xs mt-2">WebGL not supported on this device</p>
          </div>
        </div>
        <div className="absolute top-3 left-3 badge-base px-3 py-1 text-[10px] font-bold text-growth-700 flex items-center gap-1.5 backdrop-blur-md">
          <span>Product Inspection</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 liquid-glass bg-steel-50/80 overflow-hidden border border-black my-4">
      
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* 3D Overlay Badge */}
      <div className="absolute top-3 left-3 badge-base px-3 py-1 text-[10px] font-bold text-growth-700 flex items-center gap-1.5 backdrop-blur-md bg-white/50 border border-black">
        <span>3D Interactive Inspection</span>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={`badge-base px-3 py-1 text-[10px] font-bold transition-all flex items-center gap-1 bg-white/50 border border-black ${
            isRotating ? 'text-growth-700 bg-growth-50 group-hover:bg-growth-100' : 'text-steel-600'
          }`}
        >
          <Rotate3D className="w-3.5 h-3.5" />
          <span>{isRotating ? 'Auto-Orbiting' : 'Paused'}</span>
        </button>
        <div className="badge-base px-2.5 py-1 text-[10px] text-steel-600 flex items-center gap-1 bg-white/50 border border-black">
          <Eye className="w-3.5 h-3.5 text-growth-600" />
          <span>Drag to Rotate 360°</span>
        </div>
      </div>

    </div>
  );
};
