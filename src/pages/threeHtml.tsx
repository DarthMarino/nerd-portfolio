import {
  ContactShadows,
  Environment,
  Float,
  Html,
  PerformanceMonitor,
  PerspectiveCamera,
  PresentationControls,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Euler, Group, Quaternion, Vector3 } from "three";
import HtmlPage from "./html";

import infinity from "../assets/infinity.svg";
import toast from "react-hot-toast";

const focusedCamera: CameraProps = {
  position: new Vector3(0, 0.6, 2),
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
  setActive: (active: boolean) => void;
};

const Laptop = ({
  v = new Vector3(),
  onPointerOver,
  onPointerOut,
  active = false,
  setActive,
}: LaptopProps) => {
  const groupRef = useRef<Group>(new Group());
  const width = window.innerWidth;
  const [zoom, setZoom] = useState(false);
  const [clicked, setClicked] = useState(false);
  const computer = useMemo(
    () =>
      useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
      ),
    []
  );

  const handleChangeClicked = () => {
    if (width > 350) {
      setClicked(!clicked);
    }
  };

  const zSizeZoomed = () => {
    if (width < 400) {
      return 7.5;
    } else if (width < 450) {
      return 6.5;
    } else if (width < 500) {
      return 5.5;
    } else if (width < 600) {
      return 4.5;
    } else if (width < 700) {
      return 3.5;
    } else if (width < 800) {
      return 3;
    } else if (width < 900) {
      return 2.5;
    } else if (width < 1000) {
      return 2;
    } else {
      return 1.5;
    }
  };

  const focused = new Vector3(0, 0.3, zSizeZoomed());

  useEffect(() => {
    if (active && width > 350) {
      setZoom(true);
    } else {
      setZoom(false);
    }
  }, [active]);

  useEffect(() => {
    if (clicked && !active) {
      setActive(true);
    } else if (!clicked && active) {
      setActive(false);
    }
  }, [clicked]);

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
        zoom ? focused.z : unfocusedCamera.position.z
      ),
      0.1
    );

    state.camera.setRotationFromQuaternion(cameraRotation);
    state.camera.updateProjectionMatrix();
  });
  return (
    <group ref={groupRef}>
      <rectAreaLight
        width={2.5}
        height={1.65}
        intensity={65}
        color={"#28b6b9"}
        rotation={[-0.1, Math.PI, 0]}
        position={[0, 0.55, -1.15]}
      />
      <primitive
        object={computer.scene}
        position-y={-1.3}
        onClick={handleChangeClicked}
      />
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={0.58}
        position={[0, 0.25, -1.39]}
        rotation={[-0.25, 0, 0]}
        scale={1}
      >
        <div
          style={{
            width: "2048px",
            height: "1360px",
          }}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
        >
          <HtmlPage />
        </div>
      </Html>
    </group>
  );
};

type CameraProps = {
  position: Vector3;
  rotation: Euler;
};

const ThreePage = () => {
  const [dpr, setDpr] = useState(1.5);
  const [active, setActive] = useState(false);

  useCursor(active);
  const onPointerOver = () => {
    setActive(true);
  };

  const onPointerOut = () => {
    setActive(false);
  };

  useEffect(() => {
    if (window.innerWidth < 450) {
      toast(
        "This 3D render is not well supported on small screens. Please use the 2DPage button to have a better experience.",
        {
          icon: "❗",
          style: {
            borderRadius: "10px",
            minWidth: "200px",
            maxWidth: "300px",
          },
          duration: 10000,
        }
      );
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={infinity} alt="infinity" height="30%" width="30%" />
        </div>
      }
    >
      <Canvas dpr={dpr} className="canvas">
        <PerspectiveCamera makeDefault far={2000} near={0.1} fov={45} />
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        >
          <Environment files="/potsdamer_platz_1k.hdr" />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 0]} />
          <color args={["#202321"]} attach="background" />
          <PresentationControls
            global
            rotation={[active ? 0.25 : 0, 0, 0]}
            polar={[-0.1, 0.2]}
            azimuth={[-1.5, 1.5]}
            config={{ mass: 2, tension: 400 }}
            enabled={!active}
          >
            <Float rotationIntensity={0.04} floatIntensity={0.3}>
              <Laptop
                onPointerOut={onPointerOut}
                onPointerOver={onPointerOver}
                active={active}
                setActive={setActive}
              />
            </Float>
          </PresentationControls>
          <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
          />
        </PerformanceMonitor>
      </Canvas>
    </Suspense>
  );
};

export default ThreePage;
