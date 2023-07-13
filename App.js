import * as THREE from 'three';
import { FirstPersonControls } from 'first-person-controls';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new FirstPersonControls(camera);
controls.movementSpeed = 70;
controls.lookSpeed = 0.05;
controls.noFly = true;
controls.lookVertical = false;

const joystick = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
};

document.addEventListener('touchstart', (event) => {
    joystick.x = event.touches[0].clientX;
    joystick.y = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
    const dx = event.touches[0].clientX - joystick.x;
    const dy = event.touches[0].clientY - joystick.y;

    controls.moveForward(dy / joystick.height * controls.movementSpeed);
    controls.moveRight(-dx / joystick.width * controls.movementSpeed);

    joystick.x += dx;
    joystick.y += dy;
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
