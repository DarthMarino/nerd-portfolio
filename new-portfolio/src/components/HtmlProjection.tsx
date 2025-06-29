import {
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  type Component,
  type JSX,
} from "solid-js";
import * as THREE from "three";

interface OverlayConfig {
  position: THREE.Vector3;
  content: string | (() => JSX.Element);
  transform?: boolean;
  distanceFactor?: number;
  occluders?: THREE.Object3D[];
  center?: boolean;
  className?: string;
  visible?: boolean;
}

interface Overlay extends OverlayConfig {
  id: string;
  screenPos: { x: number; y: number; z: number };
  scale: number;
  isOccluded: boolean;
  isBehindCamera: boolean;
}

interface HtmlProjectionProps {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  htmlSystem?: {
    overlays: () => any[];
    addOverlay: (config: OverlayConfig) => any;
    removeOverlay: (id: string) => void;
    updateOverlays: () => void;
  };
  children?: JSX.Element;
}

export function createHtmlOverlay(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
) {
  const [overlays, setOverlays] = createSignal<Overlay[]>([]);
  const raycaster = new THREE.Raycaster();

  // Project 3D position to screen coordinates
  const projectToScreen = (position: THREE.Vector3) => {
    const vector = position.clone();
    vector.project(camera);

    const canvas = renderer.domElement;
    const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (vector.y * -0.5 + 0.5) * canvas.clientHeight;
    const z = vector.z;

    return { x, y, z };
  };

  // Calculate distance-based scale
  const calculateScale = (position: THREE.Vector3, distanceFactor = 1) => {
    const distance = camera.position.distanceTo(position);
    return Math.max(0.1, Math.min(2, distanceFactor / distance));
  };

  // Check occlusion
  const checkOcclusion = (position: THREE.Vector3, occluders: THREE.Object3D[] = []) => {
    if (occluders.length === 0) return false;

    const direction = position.clone().sub(camera.position).normalize();
    raycaster.set(camera.position, direction);

    const intersects = raycaster.intersectObjects(occluders, true);
    if (intersects.length === 0) return false;

    const targetDistance = camera.position.distanceTo(position);
    return intersects[0].distance < targetDistance - 0.1;
  };

  // Add overlay
  const addOverlay = (config: OverlayConfig): Overlay => {
    const id = Math.random().toString(36).substring(2, 11);
    const overlay: Overlay = {
      id,
      position: config.position || new THREE.Vector3(0, 0, 0),
      content: config.content || "<div>HTML Content</div>",
      transform: config.transform || false,
      distanceFactor: config.distanceFactor,
      occluders: config.occluders || [],
      center: config.center || false,
      className: config.className || "",
      visible: config.visible !== false,
      // Computed properties
      screenPos: { x: 0, y: 0, z: 0 },
      scale: 1,
      isOccluded: false,
      isBehindCamera: false,
    };

    setOverlays((prev) => [...prev, overlay]);
    return overlay;
  };

  // Remove overlay
  const removeOverlay = (id: string) => {
    setOverlays((prev) => prev.filter((overlay) => overlay.id !== id));
  };

  // Update overlay positions and states
  const updateOverlays = () => {
    setOverlays((prev) =>
      prev.map((overlay) => {
        if (!overlay.visible) return overlay;

        const screenPos = projectToScreen(overlay.position);
        const isBehindCamera = screenPos.z > 1;
        const isOccluded =
          !isBehindCamera && checkOcclusion(overlay.position, overlay.occluders);

        let scale = 1;
        if (overlay.distanceFactor !== undefined && !isBehindCamera) {
          scale = calculateScale(overlay.position, overlay.distanceFactor);
        }

        return {
          ...overlay,
          screenPos,
          scale,
          isOccluded,
          isBehindCamera,
        };
      })
    );
  };

  return {
    overlays,
    addOverlay,
    removeOverlay,
    updateOverlays,
  };
}

const HtmlOverlayElement: Component<{
  overlay: Overlay;
  containerRef: HTMLDivElement;
}> = (props) => {
  let elementRef: HTMLDivElement | undefined;

  onMount(() => {
    if (elementRef && props.containerRef) {
      props.containerRef.appendChild(elementRef);
    }
  });

  onCleanup(() => {
    if (elementRef && elementRef.parentNode) {
      elementRef.parentNode.removeChild(elementRef);
    }
  });

  createEffect(() => {
    if (!elementRef) return;

    const overlay = props.overlay;

    if (overlay.isBehindCamera) {
      elementRef.style.display = "none";
      return;
    }

    elementRef.style.display = "block";

    let transform = "";

    if (overlay.transform) {
      // Transform mode
      const z = -overlay.position.z * 100;
      transform = `translate3d(${overlay.screenPos.x}px, ${overlay.screenPos.y}px, ${z}px) scale(${overlay.scale})`;
      elementRef.style.transformStyle = "preserve-3d";
    } else {
      // Screen space mode
      transform = `translate3d(${overlay.screenPos.x}px, ${overlay.screenPos.y}px, 0) scale(${overlay.scale})`;
    }

    if (overlay.center) {
      transform += " translate(-50%, -50%)";
    }

    elementRef.style.transform = transform;

    // Update classes
    const classes = [
      "html-overlay",
      overlay.className,
      overlay.transform ? "transform-mode" : "",
      overlay.isOccluded ? "occluded" : "",
    ]
      .filter(Boolean)
      .join(" ");

    elementRef.className = classes;
  });

  return (
    <div
      ref={elementRef}
      class="html-overlay"
      style={{
        position: "absolute",
        "pointer-events": "auto",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "12px 16px",
        "border-radius": "8px",
        "transform-origin": "center center",
        transition: "all 0.2s ease",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        "backdrop-filter": "blur(10px)",
        "font-size": "14px",
        "max-width": "200px",
        "z-index": "1000",
      }}
      innerHTML={typeof props.overlay.content === "string" ? props.overlay.content : ""}
    >
      {typeof props.overlay.content === "function" && props.overlay.content()}
    </div>
  );
};

const HtmlProjection: Component<HtmlProjectionProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;
  const htmlSystem = props.htmlSystem || createHtmlOverlay(props.camera, props.renderer, props.scene);

  return (
    <div
      ref={containerRef}
      class="html-projection-container"
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        "pointer-events": "none",
        "z-index": "1000",
      }}
    >
      <style>
        {`
          .html-overlay.occluded {
            opacity: 0.2;
            transform: scale(0.9);
          }
          
          .html-overlay.transform-mode {
            transform-style: preserve-3d;
          }
          
          .html-overlay h3 {
            margin: 0 0 8px 0;
            font-size: 16px;
            color: #4fc3f7;
          }
          
          .html-overlay p {
            margin: 0;
            line-height: 1.4;
            opacity: 0.9;
          }
        `}
      </style>
      
      {/* Render overlay elements */}
      {htmlSystem.overlays().map((overlay) => (
        <HtmlOverlayElement
          overlay={overlay}
          containerRef={containerRef!}
        />
      ))}

      {props.children}
    </div>
  );
};

export { HtmlProjection, type OverlayConfig, type Overlay };
export default HtmlProjection;