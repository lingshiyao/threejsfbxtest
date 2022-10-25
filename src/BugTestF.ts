import * as THREE from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Phone3DFbx} from "./Phone3DFbx";

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let controls: OrbitControls;

let model: any;

let mixer: any;

let divWidth: number = 0;

let divHeight: number = 0;

let animateID = 0;

const clock = new THREE.Clock();
/**
 * 猴子原地做动作为false，此时相机固定，controller绕着猴子转动
 * 猴子移动为true，此时相机跟随猴子移动，没有controller
 */
let move = false;

/**
 * fbx选中的帧数，-1播放动画，大于0固定某一帧
 */
let frame = -1;

/**
 * fbx的总帧数
 */
let totalFrame = 1;

/**
 * 控制器焦点坐标
 */
let controlTarget = {
    x: 200, y: 0, z: 200,
};

/**
 *  相机坐标
 */
let cameraPosition = {
    x: 200, y: 0, z: 200,
};

const initGround = (scene: THREE.Scene) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
        color: 0x999999,
        depthWrite: false
    }));
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
}

export function initThree(fbxUrl: string, status: any, oprogress: Function, error: Function) {
    initStatus(status);
    const threeDiv: any = document.getElementById("3d");
    divWidth = threeDiv.clientWidth;
    divHeight = threeDiv.clientHeight;
    console.log(threeDiv, divWidth, divHeight);
    renderer = getRender(divWidth, divHeight);
    threeDiv.appendChild(renderer.domElement);
    camera = getCamera(divWidth, divHeight);
    scene = getScene();
    scene.add( new THREE.AxesHelper( 1000 * 5 ) );
    initGround(scene);
    initLight(scene);
    const loader = new FBXLoader();
    function onProgress(xhr: any) {
        console.log("onProgress", xhr)
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            // @ts-ignore
            oprogress(Math.trunc(percentComplete));
        }
    }

    function onError() {
        console.log("onError")
        error();
    }

    loader.load(fbxUrl, function (object) {
        model = object;
        mixer = new THREE.AnimationMixer(object);
        const action = mixer.clipAction(object.animations[0]);
        action.play();
        mixer.timeScale = 1;
        object.traverse(function (child: any) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

        });
        scene.add(model);
        console.log(model)
        camera.lookAt(model.children[1].position);
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        console.log(move)
        if (!move) {
            console.log(cameraPosition.x, cameraPosition.y, cameraPosition.z)
            console.log(controlTarget.x, controlTarget.y, controlTarget.z)
            // controls = getControl(camera, renderer);
            // controls.object.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
            // controls.target.set(controlTarget.x, controlTarget.y, controlTarget.z);
        }
    }, onProgress, onError);
    animate();
}

// @ts-ignore
const animate = async () => {
    animateID = requestAnimationFrame(animate);
    render();
};

const render = () => {
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (controls && !move) {
        controls.update();
    }
    if (camera && model && move) {
        camera.position.set(model.children[1].position.x + 70, model.children[1].position.y, model.children[1].position.z + 280);
        camera.lookAt(model.children[1].position);
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
    }
    renderer.render(scene, camera);
};


// 释放
function beforeDestroy() {
    try {
        scene.clear();
        renderer.dispose();
        renderer.forceContextLoss();
        cancelAnimationFrame(animateID); // 去除animationFrame
        let gl = renderer.domElement.getContext("webgl");
    } catch (e) {
        console.log(e);
    }
}

/*释放webGL占用内存write by wuweiwei*/
export var releaseRender = function (renderer: any, scene: any) {
    let clearScene = function (scene: any) {
        let arr = scene.children.filter((x) => x);
        arr.forEach((item) => {
            if (item.children.length) {
                clearScene(item);
            } else {
                if (item.type === "Mesh") {
                    item.geometry.dispose();
                    item.material.dispose();
                    !!item.clear && item.clear();
                }
            }
        });
        !!scene.clear && scene.clear(renderer);
        arr = null;
    };
    try {
        clearScene(scene);
    } catch (e) {
    }
    try {
        renderer.renderLists.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement = null;
        renderer.content = null;
        renderer = null;
    } catch (e) {
    }
    if (animateID) {
        alert("=======")
        model = null;
        cancelAnimationFrame(animateID);
    }
    THREE.Cache.clear();
};

/*
*  初始化灯光
*/
function initLight(scene) {
    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    scene.add(dirLight);
}


/**
 * 如果 status === 1 就移动，否则就是不移动
 * status
 */
function initStatus(status: any) {
    let fileName = status.file;
    if (fileName.endsWith("_move.fbx")) {
        move = true;
    } else {
        move = false;
        console.log(status, JSON.stringify(status.value))
        controlTarget.x = status.controlx;
        controlTarget.y = status.controly;
        controlTarget.z = status.controlz;
        cameraPosition.x = status.camerax;
        cameraPosition.y = status.cameray;
        cameraPosition.z = status.cameraz;
    }
}

/*
*   初始化场景
*/
function getScene() {
    const scene = new THREE.Scene();
    return scene;
}

function getRender(width: number, height: number) {
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    return renderer;
}

/*
*   初始化相机
*/
function getCamera(width: number, height: number) {
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    return camera;
}

/*
*   初始化控制器
*/
function getControl(camera: any, renderer: any) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.update();
    return controls;
}
