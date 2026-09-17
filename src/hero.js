// hero.js - Three.js hero section with rotating torus

// Assumes Three.js is loaded globally as THREE and GLTFLoader is available.

(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 4);

  // Light
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 5, 5);
  scene.add(directional);

  // Simple torus geometry (replace with GLTF model if provided later)
  const geometry = new THREE.TorusKnotGeometry(0.7, 0.2, 150, 20);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6a00, metalness: 0.5, roughness: 0.2 });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  // Animation loop
  function animate(time) {
    torus.rotation.x = time * 0.0005;
    torus.rotation.y = time * 0.0008;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Resize handling
  function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
})();
