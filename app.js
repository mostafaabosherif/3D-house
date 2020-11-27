let container;
let camera;
let renderer;
let scene;
let house;
let loader;
let lightnum = 4;
let controls;
function init() {
  container = document.querySelector(".scene");

  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 500;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 2, 25);

  //   controls = new THREE.OrbitControls(camera);
  //   controls.addEventListener("change", renderer);
  //   let controls = new THREE.OrbitControls(camera);
  //   controls.addEventListener("change", renderer);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0x405040, lightnum);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 100);
  scene.add(directionalLight);

  scene.add(ambient);
  loader = new THREE.GLTFLoader();
  loader.load("./house/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });
}
function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.005;
  renderer.render(scene, camera);
}
init();

function resizing() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener("resize", resizing);
