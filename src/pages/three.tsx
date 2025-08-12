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
import "./three.css";

const ThreePage: Component = () => {
  const { dict } = useLanguage();
  let canvasRef: HTMLCanvasElement | undefined;
  let mountRef: HTMLDivElement | undefined;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let css3dRenderer: CSS3DRenderer;
  let laptopModel: THREE.Group;
  let animationId: number;
  let htmlElement: HTMLDivElement;
  let css3dObject: CSS3DObject;

  // State for HTML projection
  const [htmlReady, setHtmlReady] = createSignal(false);

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

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0.3, normalZ);
    camera.lookAt(0, 0, 0);

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

    // CSS3D Renderer for HTML content
    css3dRenderer = new CSS3DRenderer();
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
    css3dRenderer.domElement.style.position = "absolute";
    css3dRenderer.domElement.style.top = "0";
    css3dRenderer.domElement.style.left = "0";
    css3dRenderer.domElement.style.pointerEvents = "none";
    css3dRenderer.domElement.style.zIndex = "1";
    mountRef.appendChild(css3dRenderer.domElement);
    
    console.log("CSS3D Renderer created and added to DOM:", css3dRenderer.domElement);

    // Initialize raycaster
    raycaster = new THREE.Raycaster();

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
        console.log("Laptop model added to scene:", laptopModel);

        // Create HTML content directly on laptop
        createHtmlContent();
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

  const createHtmlContent = () => {
    // Create HTML element
    htmlElement = document.createElement("div");
    htmlElement.style.width = "400px";
    htmlElement.style.height = "250px";
    htmlElement.style.background = "#ff0000";
    htmlElement.style.color = "white";
    htmlElement.style.padding = "20px";
    htmlElement.style.boxSizing = "border-box";
    htmlElement.style.fontFamily = "Arial, sans-serif";
    htmlElement.style.overflow = "hidden";
    htmlElement.style.borderRadius = "8px";
    htmlElement.style.border = "3px solid #00ff00";
    
    htmlElement.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .cv-container { font-family: 'Inter', sans-serif; line-height: 1.4; color: #333; background: white; padding: 15px; }
        .header { display: flex; align-items: center; margin-bottom: 15px; padding-bottom: 12px; border-bottom: 2px solid #2563eb; }
        .profile-img { width: 60px; height: 60px; border-radius: 50%; background: #2563eb; margin-right: 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; }
        .header-content { flex: 1; }
        .name { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 3px; }
        .title { font-size: 12px; color: #2563eb; font-weight: 500; margin-bottom: 8px; }
        .contact-info { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; font-size: 8px; color: #64748b; }
        .contact-info a { color: #2563eb; text-decoration: none; }
        .summary { background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 15px; border-left: 3px solid #2563eb; }
        .summary p { color: #475569; font-size: 9px; line-height: 1.4; }
        .section { margin-bottom: 15px; }
        .section-title { font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 8px; padding-bottom: 3px; border-bottom: 1px solid #e2e8f0; }
        .section-title::before { content: ''; width: 3px; height: 12px; background: #2563eb; margin-right: 6px; border-radius: 1px; display: inline-block; }
        .experience-item { margin-bottom: 12px; padding: 8px; background: #fafafa; border-radius: 4px; border-left: 2px solid #2563eb; }
        .experience-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
        .job-title { font-weight: 600; color: #1e293b; font-size: 10px; }
        .company { color: #2563eb; font-weight: 500; font-size: 9px; }
        .date { color: #64748b; font-size: 8px; font-weight: 500; }
        .achievements { list-style: none; margin-top: 6px; }
        .achievements li { margin-bottom: 3px; padding-left: 8px; position: relative; color: #475569; font-size: 8px; line-height: 1.3; }
        .achievements li::before { content: '▸'; position: absolute; left: 0; color: #2563eb; font-weight: bold; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .skill-category { background: #f8fafc; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0; }
        .skill-category h4 { color: #1e293b; margin-bottom: 4px; font-weight: 600; font-size: 9px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 3px; }
        .skill-tag { background: #2563eb; color: white; padding: 2px 6px; border-radius: 8px; font-size: 7px; font-weight: 500; }
      </style>
      <div class="cv-container">
        <header class="header">
          <div class="profile-img">MG</div>
          <div class="header-content">
            <h1 class="name">Marino Gomez</h1>
            <p class="title">Frontend Software Engineer</p>
            <div class="contact-info">
              <div>📍 Passaic, NJ, USA</div>
              <div>📧 marinogomez24@gmail.com</div>
              <div>📱 +1 (829) 926-5003</div>
              <div>🔗 linkedin.com/in/maghiworks</div>
              <div>📱 +1 (862) 287-1241</div>
              <div>💻 github.com/DarthMarino</div>
            </div>
          </div>
        </header>

        <div class="summary">
          <p>Passionate 24-year-old Frontend Software Engineer with 3+ years of experience specializing in modern web and mobile development. Expert in creating visually appealing, user-centric applications using React, TypeScript, and cutting-edge design principles.</p>
        </div>

        <section class="section">
          <h2 class="section-title">Professional Experience</h2>
          
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="job-title">Software Engineer</div>
                <div class="company">Xoultec</div>
              </div>
              <div class="date">Feb 2022 - Present</div>
            </div>
            <ul class="achievements">
              <li>Developed comprehensive mobile ERP application serving entire sales team for inventory management</li>
              <li>Built responsive web dashboard using React, TypeScript, and TailwindCSS with real-time data visualization</li>
              <li>Led modernization of legacy Windows Forms accounting system to web-based solution</li>
              <li>Collaborated with cross-functional teams using Agile methodologies to deliver projects on schedule</li>
            </ul>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="job-title">Frontend Engineer</div>
                <div class="company">Curbo Technologies</div>
              </div>
              <div class="date">June 2021 - March 2023</div>
            </div>
            <ul class="achievements">
              <li>Enhanced user experience across main website and back-office platform with improved navigation</li>
              <li>Implemented advanced filtering systems with URL query integration for better search functionality</li>
              <li>Optimized frontend performance using modern JavaScript frameworks</li>
              <li>Collaborated with UX/UI designers to implement responsive designs across multiple devices</li>
            </ul>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Technical Skills</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h4>Frontend Development</h4>
              <div class="skill-tags">
                <span class="skill-tag">React</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">Next.js</span>
                <span class="skill-tag">Three.js</span>
              </div>
            </div>
            <div class="skill-category">
              <h4>Styling & Design</h4>
              <div class="skill-tags">
                <span class="skill-tag">CSS</span>
                <span class="skill-tag">TailwindCSS</span>
                <span class="skill-tag">Figma</span>
                <span class="skill-tag">UI/UX</span>
              </div>
            </div>
            <div class="skill-category">
              <h4>Backend & Database</h4>
              <div class="skill-tags">
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">C#</span>
                <span class="skill-tag">GoLang</span>
                <span class="skill-tag">SQL</span>
              </div>
            </div>
            <div class="skill-category">
              <h4>Tools & Technologies</h4>
              <div class="skill-tags">
                <span class="skill-tag">Git</span>
                <span class="skill-tag">Ionic</span>
                <span class="skill-tag">Blender</span>
                <span class="skill-tag">Rust</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    // Create CSS3D object and position it at laptop origin
    css3dObject = new CSS3DObject(htmlElement);
    css3dObject.position.set(0, 0, 0); // Start at origin, will be positioned on laptop
    css3dObject.scale.set(0.002, 0.002, 0.002); // Small scale for laptop screen
    
    scene.add(css3dObject);
    setHtmlReady(true);
    
    console.log("HTML content created and added to scene");
  };

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
  };

  const handleMouseMove = (event: MouseEvent) => {
    // Normalize mouse position (-1 to 1)
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update mouse for raycasting
    mouse.x = mouseX;
    mouse.y = mouseY;

    // Check if mouse is over laptop or HTML content
    if (laptopModel && css3dObject && raycaster) {
      raycaster.setFromCamera(mouse, camera);
      
      // Check intersections with both laptop and HTML content
      const laptopIntersects = raycaster.intersectObject(laptopModel, true);
      const htmlIntersects = raycaster.intersectObject(css3dObject, true);
      
      const wasHovered = isHovered();
      const nowHovered = laptopIntersects.length > 0 || htmlIntersects.length > 0;

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

      // Update HTML content position to match laptop position and rotation
      if (css3dObject) { // Re-enabled to position on laptop
        // Position CSS3D object exactly at laptop's position
        css3dObject.position.copy(laptopModel.position);
        css3dObject.rotation.copy(laptopModel.rotation);
        
        // Add offset to position further back on screen area
        css3dObject.position.y += 0.1; // Slightly above laptop
        css3dObject.position.z -= 0.5; // Much further back, inside laptop screen
        
        // Debug: Log position occasionally
        if (Math.random() < 0.005) { // Log 0.5% of the time
          console.log("CSS3D object position:", css3dObject.position);
          console.log("CSS3D object visible:", css3dObject.visible);
        }
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

    // Render both WebGL and CSS3D
    renderer.render(scene, camera);
    css3dRenderer.render(scene, camera);
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
    if (css3dRenderer?.domElement?.parentNode) {
      css3dRenderer.domElement.parentNode.removeChild(css3dRenderer.domElement);
    }
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


      {!dict() && (
        <div class="flex justify-center items-center absolute inset-0 bg-[#202321]">
          <span class="loading loading-spinner loading-lg text-white"></span>
        </div>
      )}
    </div>
  );
};

export default ThreePage;
