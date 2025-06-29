import {
  createSignal,
  createEffect,
  onCleanup,
  type Component,
} from "solid-js";
import * as THREE from "three";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { useLanguage } from "../providers/LanguageProvider";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import HtmlProjection, {
  createHtmlOverlay,
} from "../components/HtmlProjection";
import "./three.css";

const ThreePage: Component = () => {
  const { dict } = useLanguage();
  let canvasRef: HTMLCanvasElement | undefined;
  let mountRef: HTMLDivElement | undefined;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let laptopModel: THREE.Group;
  let animationId: number;
  let htmlSystem: ReturnType<typeof createHtmlOverlay>;
  let currentOverlay: any; // Store reference to the overlay for updates

  // State for HTML projection
  const [htmlSystemReady, setHtmlSystemReady] = createSignal(false);
  const [threeReady, setThreeReady] = createSignal(false);
  const [threeCamera, setThreeCamera] = createSignal<THREE.PerspectiveCamera>();
  const [threeRenderer, setThreeRenderer] = createSignal<THREE.WebGLRenderer>();
  const [threeScene, setThreeScene] = createSignal<THREE.Scene>();
  const [htmlSystemRef, setHtmlSystemRef] =
    createSignal<ReturnType<typeof createHtmlOverlay>>();

  // Simple state
  const [isZoomed, setIsZoomed] = createSignal(false);
  const [isHovered, setIsHovered] = createSignal(false);
  const [controlMode, setControlMode] = createSignal<"hover" | "click">(
    "hover"
  );

  // Mouse position for tilt effect
  let mouseX = 0;
  let mouseY = 0;
  let raycaster: THREE.Raycaster;
  let mouse = new THREE.Vector2();

  // Camera positions
  const normalZ = 6;
  const zoomedZ = 1.5; // Much closer to fill canvas with laptop screen

  const initThreeJS = () => {
    if (!mountRef) return;

    // Simple scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202321);
    setThreeScene(scene);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0.3, normalZ);
    camera.lookAt(0, 0, 0);
    setThreeCamera(camera);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    setThreeRenderer(renderer);

    // Initialize raycaster
    raycaster = new THREE.Raycaster();

    // Set Three.js ready state
    setThreeReady(true);

    // Initialize HTML overlay system will be created after all objects are ready

    setupLighting();
    loadLaptopModel();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
  };

  const setupLighting = () => {
    // Basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load HDR environment
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("/potsdamer_platz_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.LinearSRGBColorSpace;
      texture.flipY = false; // Add this
      texture.needsUpdate = true;
      scene.environment = texture;
    });
  };

  const loadLaptopModel = () => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
      (gltf) => {
        laptopModel = gltf.scene;
        laptopModel.position.set(0, -1.3, 0);
        laptopModel.castShadow = true;
        laptopModel.receiveShadow = true;

        // Fix texture warnings by setting proper colorSpace and formats
        laptopModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material) {
              const material = child.material as THREE.MeshStandardMaterial;
              if (material.map) {
                material.map.colorSpace = THREE.SRGBColorSpace;
                material.map.format = THREE.RGBAFormat;
                material.map.type = THREE.UnsignedByteType;
              }
              if (material.normalMap) {
                material.normalMap.colorSpace = THREE.NoColorSpace;
              }
              if (material.roughnessMap) {
                material.roughnessMap.colorSpace = THREE.NoColorSpace;
              }
              if (material.metalnessMap) {
                material.metalnessMap.colorSpace = THREE.NoColorSpace;
              }
            }
          }
        });

        scene.add(laptopModel);

        // Initialize HTML overlay system after laptop model is loaded
        htmlSystem = createHtmlOverlay(camera, renderer, scene);
        setHtmlSystemRef(htmlSystem);
        setHtmlSystemReady(true);

        // Create HTML overlay
        setupHtmlOverlay();
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100 + "%"
        );
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  };

  const setupHtmlOverlay = () => {
    if (!htmlSystem) return;

    // Get laptop's bounding box to calculate screen size
    const box = new THREE.Box3().setFromObject(laptopModel);
    const laptopSize = box.getSize(new THREE.Vector3());

    // Use laptop size for overlay dimensions (scaled appropriately)
    const overlayWidth = Math.abs(laptopSize.x * 400); // Scale factor for reasonable size
    const overlayHeight = Math.abs(laptopSize.y * 350); // Scale factor for reasonable size

    // Create HTML content for the overlay
    const htmlContent = `
      <div style="
        width: ${overlayWidth}px; 
        height: ${overlayHeight}px; 
        background: #ff0000; 
        color: white; 
        padding: 20px; 
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        overflow: hidden;
        border-radius: 8px;
      ">
        <h1 style="font-size: 24px; margin: 0 0 15px 0; text-align: center;">
          LOREM IPSUM TEST
        </h1>
        
        <div style="background: #00ff00; color: black; padding: 10px; margin: 8px 0; border-radius: 5px;">
          <h2 style="margin: 0 0 5px 0; font-size: 16px;">Green Section</h2>
          <p style="margin: 0; font-size: 12px; line-height: 1.3;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div style="background: #0000ff; color: white; padding: 10px; margin: 8px 0; border-radius: 5px;">
          <h2 style="margin: 0 0 5px 0; font-size: 16px;">Blue Section</h2>
          <p style="margin: 0; font-size: 12px; line-height: 1.3;">
            Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div>
    `;

    // Add overlay to the system with initial position
    currentOverlay = htmlSystem.addOverlay({
      position: new THREE.Vector3(0, 0, 0), // Will be updated in animation loop
      content: htmlContent,
      distanceFactor: 1.5,
      center: true,
      className: "laptop-screen-overlay",
    });
  };

  const updateHtmlOverlayPosition = () => {
    if (!htmlSystem || !currentOverlay || !laptopModel) return;

    // Get laptop's current bounding box to calculate screen position
    const box = new THREE.Box3().setFromObject(laptopModel);
    const laptopCenter = box.getCenter(new THREE.Vector3());
    const laptopSize = box.getSize(new THREE.Vector3());

    // Calculate screen position based on laptop's current position and rotation
    const screenOffset = new THREE.Vector3(
      -1, // X: moved to the left
      2, // Y: lowered position (screen area)
      0.1 // Z: slightly forward from back (screen surface)
    );

    // Apply laptop's rotation to the screen offset
    screenOffset.applyEuler(
      new THREE.Euler(
        laptopModel.rotation.x,
        laptopModel.rotation.y,
        laptopModel.rotation.z
      )
    );

    // Update overlay position
    const newPosition = laptopCenter.clone().add(screenOffset);
    currentOverlay.position.copy(newPosition);
  };

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const handleMouseMove = (event: MouseEvent) => {
    // Normalize mouse position (-1 to 1)
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update mouse for raycasting
    mouse.x = mouseX;
    mouse.y = mouseY;

    // Check if mouse is over laptop
    if (laptopModel && raycaster) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(laptopModel, true);

      const wasHovered = isHovered();
      const nowHovered = intersects.length > 0;

      if (wasHovered !== nowHovered) {
        handleLaptopHover(nowHovered);
      }
    }
  };

  const performZoom = (shouldZoom: boolean) => {
    const targetZ = shouldZoom ? zoomedZ : normalZ;
    const targetX = shouldZoom ? -0.15 : 0; // Less tilt down when zoomed
    const targetY = shouldZoom ? 0.7 : 0.3; // Higher position when zoomed (25% higher)

    gsap.to(camera.position, {
      y: targetY,
      z: targetZ,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(camera.rotation, {
      x: targetX,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleCanvasClick = () => {
    // Switch to click mode
    setControlMode("click");

    const newZoomed = !isZoomed();
    setIsZoomed(newZoomed);
    performZoom(newZoomed);
  };

  const handleLaptopHover = (hovered: boolean) => {
    setIsHovered(hovered);

    // Only respond to hover in hover mode
    if (controlMode() === "hover") {
      setIsZoomed(hovered);
      performZoom(hovered);
    }
  };

  const animate = () => {
    animationId = requestAnimationFrame(animate);

    // Continuous hovering animation
    if (laptopModel) {
      const time = Date.now() * 0.001;

      // Floating up and down
      laptopModel.position.y = -1.3 + Math.sin(time) * 0.05;

      // Update HTML overlay position to follow laptop movement
      updateHtmlOverlayPosition();

      // Update HTML overlays
      if (htmlSystem) {
        htmlSystem.updateOverlays();
      }

      // Mouse tilt effect (only when hovered)
      if (isHovered()) {
        // Reduce tilt sensitivity when zoomed for better interaction
        const tiltMultiplier = isZoomed() ? 0.3 : 1.0; // 30% sensitivity when zoomed

        // Tilt based on mouse position
        const tiltAmountY = mouseX * 0.3 * tiltMultiplier; // Y-axis rotation (left/right turn)
        const tiltAmountX = -mouseY * 0.15 * tiltMultiplier; // X-axis rotation (up/down tilt)

        // Smooth interpolation to target tilt
        laptopModel.rotation.x = THREE.MathUtils.lerp(
          laptopModel.rotation.x,
          Math.sin(time * 1.2) * 0.01 + tiltAmountX,
          0.1
        );
        laptopModel.rotation.y = THREE.MathUtils.lerp(
          laptopModel.rotation.y,
          Math.sin(time * 0.8) * 0.03 + tiltAmountY,
          0.1
        );

        // Keep gentle Z rotation
        laptopModel.rotation.z = Math.cos(time * 0.6) * 0.01;
      } else {
        // Return to default gentle animation when not hovered
        laptopModel.rotation.x = THREE.MathUtils.lerp(
          laptopModel.rotation.x,
          Math.sin(time * 1.2) * 0.01,
          0.05
        );
        laptopModel.rotation.y = THREE.MathUtils.lerp(
          laptopModel.rotation.y,
          Math.sin(time * 0.8) * 0.03,
          0.05
        );
        laptopModel.rotation.z = THREE.MathUtils.lerp(
          laptopModel.rotation.z,
          Math.cos(time * 0.6) * 0.01,
          0.05
        );
      }
    }

    // Render WebGL scene
    renderer.render(scene, camera);
  };

  // Initialize
  createEffect(() => {
    if (dict()) {
      initThreeJS();
    }
  });

  // Cleanup
  onCleanup(() => {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
    if (renderer) renderer.dispose();
  });

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        cursor: "pointer",
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        class="three-canvas"
      />

      {/* HTML Projection overlay */}
      {htmlSystemReady() &&
        threeReady() &&
        threeCamera() &&
        threeRenderer() &&
        threeScene() &&
        htmlSystemRef() && (
          <HtmlProjection
            camera={threeCamera()!}
            renderer={threeRenderer()!}
            scene={threeScene()!}
            htmlSystem={htmlSystemRef()!}
          />
        )}

      {!dict() && (
        <div class="flex justify-center items-center absolute inset-0 bg-[#202321]">
          <span class="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
    </div>
  );
};

export default ThreePage;
