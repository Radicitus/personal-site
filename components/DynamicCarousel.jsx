"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import "@/utils/carouselUtils.js";

export default function DynamicCarousel({ projects }) {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
      <fog attach="fog" args={["#d5d4d4", 8.5, 12]} />
      <ScrollControls pages={4} infinite style={{ scrollbarWidth: "none" }}>
        <Rig rotation={[0, 0, 0.15]}>
          <Carousel projects={projects} />
        </Rig>
        <Banner position={[0, -0.15, 0]} />
      </ScrollControls>
      <Environment background blur={0.5}>
        <color attach="background" args={["black"]} />
      </Environment>
    </Canvas>
  );
}

function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, projects }) {
  return Array.from({ length: projects.length }, (_, i) => (
    <Card
      key={i}
      url={projects[i].attributes.cover.data.attributes.url}
      title={projects[i].attributes.title}
      position={[
        Math.sin((i / projects.length) * Math.PI * 2) * radius,
        0,
        Math.cos((i / projects.length) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / projects.length) * Math.PI * 2, 0]}
    />
  ));
}

function Card({ url, title, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  const updateProjectTitle = (title) => {
    document.getElementById("projectTitle").textContent = title;
  };
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.25 : 0.1,
      0.2,
      delta
    );
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={(e) => {
        pointerOver(e);
        updateProjectTitle(title);
      }}
      onPointerOut={(e) => {
        pointerOut(e);
        updateProjectTitle();
      }}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props) {
  const ref = useRef();
  const texture = useTexture("/cam-projects-carousel-banner-texture.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map.offset.x += delta / 2;
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}