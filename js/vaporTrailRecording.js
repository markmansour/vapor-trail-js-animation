function init() {
    // http://www.colourlovers.com/palette/92095/Giant_Goldfish
    // 0x69D2E7, 0xA7DBD8, 0xE0E4CC, 0xF38630, 0xFA6900
    // to write out an animated gif, the file needs to be loaded via http:// not file:// URLs.
    // > npm install -g http-server
    // my-project> http-server
    // https://stackoverflow.com/questions/18586921/how-to-launch-html-using-chrome-at-allow-file-access-from-files-mode

    let  scene = new THREE.Scene();
    let  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    let  renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //LIGHTS
    let  light = new THREE.AmbientLight(0x404040, 1);
    scene.add(light);

    let  light1 = new THREE.PointLight(0xE0E4CC, 1, 0, 2);
    light1.position.set(0, 0, 500);
    scene.add(light1);

    let  frames = 10;
    let  boxes = [];

    let  cubeGeometry = new THREE.CubeGeometry(150, 150, 150);
    let  cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x69D2E7 });
    let  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    let  boxGeometry = new THREE.EdgesGeometry(cubeGeometry);
    let  magnification = 2;

    let  colors = chroma.scale(['#fafa6e', '#2A4858', '#000000'])
        .mode('lch').colors(frames)

    for (let  i = 0; i < frames; i++) {
        let  lineMaterial = new THREE.LineBasicMaterial({ color: colors[i], linewidth: 2 });
        let  box = new THREE.LineSegments(boxGeometry, lineMaterial);
        scene.add(box);

        boxes[i] = box;
    }

    camera.position.z = 500;
    let  counter = 0;
    let  xDirection = -1;
    let  xRotDiff;
    let  countdown = 0;
    let  delay = 15;
    let  delayCounter = delay;

    // let  capturer = new CCapture({ format: 'webm', framerate: 50 });
    let  capturer = new CCapture( { format: 'gif', workersPath: 'js/' } );
    capturer.start();
    let  downs = 0;

    function animate() {
        if (downs < 1) {
            requestAnimationFrame(animate);
        } else {
            capturer.stop();
            capturer.save();
        }
        for (let  i = 0; i < frames; i++) {
            box = boxes[i];
            box.rotation.x += Math.sin((counter + i) / 120) / 90;
            box.rotation.y += Math.sin((counter + i) / 175) / 45;
            box.rotation.z += Math.sin((counter + i) / 35) / 135;
        }

        xRotDiff = boxes[0].rotation.x - boxes[frames - 1].rotation.x;

        if (xDirection == -1 && xRotDiff > 0) {
            xDirection = 1;
            console.log("xUp");
            countdown = frames - 1;
        } else if (xDirection == 1 && xRotDiff < 0) {
            xDirection = -1;
            console.log("xDown");
            countdown = frames - 1;
            downs++;
        }

        if (countdown > 0 && delayCounter-- == 0) {
            delayCounter = delay;

            if (xDirection == 1) {
                box = boxes[countdown];
                box.material.opacity = 0;
                box.material.transparent = true;
            } else if (xDirection == -1) {
                box = boxes[frames - countdown];
                box.material.opacity = 1;
                box.material.transparent = false;
            }
            countdown--;
        }
        counter++;

        renderer.render(scene, camera);
        capturer.capture(renderer.domElement);
    }

    animate();
}

window.onload = init;