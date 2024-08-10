function init() {
    // http://www.colourlovers.com/palette/92095/Giant_Goldfish
    // 0x69D2E7, 0xA7DBD8, 0xE0E4CC, 0xF38630, 0xFA6900
    // to write out an animated gif, the file needs to be loaded via http:// not file:// URLs.
    // > npm install -g http-server
    // my-project> http-server
    // https://stackoverflow.com/questions/18586921/how-to-launch-html-using-chrome-at-allow-file-access-from-files-mode
    
    var scene = new THREE.Scene();
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

    var cubeGeometry = new THREE.CubeGeometry(150, 150, 150);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x69D2E7 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    var boxGeometry = new THREE.EdgesGeometry(cubeGeometry);
    var magnification = 2;

    var colors = chroma.scale(['#fafa6e', '#2A4858', '#000000'])
        .mode('lch').colors(frames)

    for (var i = 0; i < frames; i++) {
        var lineMaterial = new THREE.LineBasicMaterial({ color: colors[i], linewidth: 2 });
        var box = new THREE.LineSegments(boxGeometry, lineMaterial);
        scene.add(box);

        boxes[i] = box;
    }

    camera.position.z = 500;
    var counter = 0;
    var xDirection = -1;
    var xRotDiff;
    var countdown = 0;
    var delay = 15;
    var delayCounter = delay;

    // var capturer = new CCapture({ format: 'webm', framerate: 50 });
    var capturer = new CCapture( { format: 'gif', workersPath: 'js/' } );
    capturer.start();
    var downs = 0;

    function animate() {
        if (downs < 1) {
            requestAnimationFrame(animate);
        } else {
            capturer.stop();
            capturer.save();
        }
        for (var i = 0; i < frames; i++) {
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