import { useEffect, useRef, useState } from "react";
import {
  Environment,
  useGLTF,
  Float,
  PresentationControls,
  Html,
  ContactShadows,
  PerspectiveCamera,
  useCursor,
  PerformanceMonitor,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { Euler, Group, Quaternion, Vector3 } from "three";

import "./App.css";

const focusedCamera: CameraProps = {
  position: new Vector3(0, 0.3, 1.5),
  rotation: new Euler(-0.4, 0, 0),
};
const unfocusedCamera: CameraProps = {
  position: new Vector3(0, 0.3, 6),
  rotation: new Euler(0, 0, 0),
};

type LaptopProps = {
  v?: Vector3;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  active?: boolean;
};
const Laptop = ({
  v = new Vector3(),
  onPointerOver,
  onPointerOut,
  active = false,
}: LaptopProps) => {
  const groupRef = useRef<Group>(new Group());
  const [zoom, set] = useState(false);
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  useEffect(() => {
    if (active) {
      set(true);
    } else {
      set(false);
    }
  }, [active]);

  const startRotation = new Quaternion();
  const endRotation = new Quaternion();
  startRotation.setFromEuler(unfocusedCamera.rotation);
  endRotation.setFromEuler(focusedCamera.rotation);
  const cameraRotation = new Quaternion();
  useFrame((state) => {
    state.camera.position.lerp(
      v.set(
        zoom ? focusedCamera.position.x : unfocusedCamera.position.x,
        zoom ? focusedCamera.position.y : unfocusedCamera.position.y,
        zoom ? focusedCamera.position.z : unfocusedCamera.position.z
      ),
      0.1
    );

    state.camera.setRotationFromQuaternion(cameraRotation);
    state.camera.updateProjectionMatrix();
  });
  return (
    <group ref={groupRef}>
      <primitive object={computer.scene} position-y={-1.3} />
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.17}
        position={[0, 0.25, -1.39]}
        rotation={[-0.25, 0, 0]}
      >
        <div>
          <iframe
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            src="https://bruno-simon.com/html/"
          />
        </div>
      </Html>
    </group>
  );
};

type CameraProps = {
  position: Vector3;
  rotation: Euler;
};

function App() {
  const [dpr, setDpr] = useState(1.5);
  const [active, setActive] = useState(false);

  useCursor(active);

  const onPointerOver = () => {
    setActive(true);
    console.log("active");
  };

  const onPointerOut = () => {
    setActive(false);
    console.log("not active");
  };

  return (
    <Canvas dpr={dpr} className="canvas">
      <PerspectiveCamera makeDefault far={2000} near={0.1} fov={45} />
      <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      >
        <Environment preset={"city"} />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 0]} />
        <color args={["#5b695e"]} attach="background" />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.1, 0.2]}
          azimuth={[-1.5, 1.5]}
          config={{ mass: 2, tension: 400 }}
        >
          <Float
            rotationIntensity={0.04}
            floatIntensity={active ? 0.1 : undefined}
          >
            <Laptop
              onPointerOut={onPointerOut}
              onPointerOver={onPointerOver}
              active={active}
            />
          </Float>
        </PresentationControls>
        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
      </PerformanceMonitor>
    </Canvas>
  );
}

export default App;
