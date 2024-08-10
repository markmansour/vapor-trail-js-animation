function init() {
    // http://www.colourlovers.com/palette/92095/Giant_Goldfish
    // 0x69D2E7, 0xA7DBD8, 0xE0E4CC, 0xF38630, 0xFA6900

    var scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //LIGHTS
    var light = new THREE.AmbientLight(0x404040, 1);
    scene.add(light);

    var light1 = new THREE.PointLight(0xE0E4CC, 1, 0, 2);
    light1.position.set(0, 0, 500);
    scene.add(light1);

    var frames = 10;
    var boxes = [];

    var cirlceGeometry = new THREE.CircleGeometry(100,50);
    var circleMaterial = new THREE.MeshLambertMaterial({ color: 0x69D2E7 });
    var circle = new THREE.Mesh(cirlceGeometry, circleMaterial);

    scene.add(circle);

    var colors = chroma.scale(['#fafa6e', '#2A4858', '#000000'])
        .mode('lch').colors(frames)

    // for (var i = 0; i < frames; i++) {
    //     var lineMaterial = new THREE.LineBasicMaterial({ color: colors[i], linewidth: 2 });
    //     var box = new THREE.LineSegments(boxGeometry, lineMaterial);
    //     scene.add(box);

    //     boxes[i] = box;
    // }

    camera.position.z = 500;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

window.onload = init;