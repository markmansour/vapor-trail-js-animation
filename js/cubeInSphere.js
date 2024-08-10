// http://www.colourlovers.com/palette/92095/Giant_Goldfish
// 0x69D2E7, 0xA7DBD8, 0xE0E4CC, 0xF38630, 0xFA6900

var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

 //LIGHTS
 var light = new THREE.AmbientLight(0x404040, 1);
 scene.add(light);
 
 var light1 = new THREE.PointLight(0xE0E4CC, 1, 0, 2);
 light1.position.set( 0, 0, 500 );
 scene.add(light1);

// camera.position.set( 0, 0, 100 );
// camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var sphereGeometry = new THREE.SphereGeometry(
    100,
    16,
    16);

var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x69D2E7 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

var lineMaterial = new THREE.LineBasicMaterial( { color: 0xFA6900, linewidth: 2 } );
var edgesGeometry = new THREE.EdgesGeometry( sphereGeometry );
var edges = new THREE.LineSegments(edgesGeometry, lineMaterial);
scene.add(edges);

camera.position.z = 500;

function animate() {
    requestAnimationFrame(animate);

    edges.rotation.x = cube.rotation.x += 0.01;
    edges.rotation.y = cube.rotation.y += 0.01;
    edges.rotation.z = cube.rotation.z += 0.001;
    // line.rotation.x += 0.1;

    renderer.render(scene, camera);
}

animate();
//renderer.render(scene, camera);
