<script lang="ts" setup>
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Phone3DFbx } from "./Phone3DFbx";

const props = withDefaults(
    defineProps<{
      url: string;
      status: {
        move: string;
        controlTarget: {
          x: number;
          y: number;
          z: number;
        };
        cameraPosition: {
          x: number;
          y: number;
          z: number;
        };
      };
    }>(),
    {
      url: "",
      status: () => {
        return {
          move: "0",
          controlTarget: {
            x: 200,
            y: 0,
            z: 200,
          },
          cameraPosition: {
            x: 200,
            y: 0,
            z: 200,
          },
        };
      },
    }
);

/**
 * fbx选中的帧数，-1播放动画，大于0固定某一帧
 */
let frame = -1;

/**
 * fbx的总帧数
 */
let totalFrame = 1;

/**
 * 猴子原地做动作为false，此时相机固定，controller绕着猴子转动
 * 猴子移动为true，此时相机跟随猴子移动，没有controller
 */
let move = false;

/**
 * 控制器焦点坐标
 */
let controlTarget = {
  x: 200,
  y: 0,
  z: 200,
};

/**
 *  相机坐标
 */
let cameraPosition = {
  x: 200,
  y: 0,
  z: 200,
};

/**
 * 原始皮肤的材质
 */
let ORIGINAL_MATERIAL = null;

/**
 * 模型加载进度的打印字符串
 */
const progress = ref<string>();

/**
 * 如果 status === 1 就移动，否则就是不移动
 * status
 */
const initStatus = async () => {
  if (props.status.toString() === "{}") return;
  if (!!props.status.move) {
    if (props.status.move === "1") {
      move = true;
    } else {
      move = false;
    }
  }

  if (!!props.status.controlTarget) {
    controlTarget = props.status.controlTarget;
  }
  if (!!props.status.cameraPosition) {
    cameraPosition = props.status.cameraPosition;
  }
};

onMounted(async () => {
  await initStatus();
  init();
  animate();
});

let model: any;
let camera: any, scene: any, renderer: any, mixer: any;
let controls: any;
const clock = new THREE.Clock();
let divWidth: number = 0;
let divHeight: number = 0;

const initLight = (scene: THREE.Scene) => {
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
};

const getRender = (width: number, height: number) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  return renderer;
};

const getScene = () => {
  const scene = new THREE.Scene();
  return scene;
};

const getCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  return camera;
};

const getControl = (camera: any, renderer: any) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.target.set(controlTarget.x, controlTarget.y, controlTarget.z);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.update();
  return controls;
};

const init = async () => {
  const threeDiv: any = document.getElementById("3d");
  divWidth = threeDiv.clientWidth;
  divHeight = threeDiv.clientHeight;
  renderer = getRender(divWidth, divHeight);
  threeDiv.appendChild(renderer.domElement);
  camera = getCamera(divWidth, divHeight);
  scene = getScene();
  initLight(scene);

  const loader = new FBXLoader();

  loader.setPath(props.url).load(
      "",
      function (object) {
        model = object;
        mixer = new THREE.AnimationMixer(object);
        const action = mixer.clipAction(object.animations[0]);
        mixer.timeScale = 1;

        if (frame != -1)
          mixer.update(
              Phone3DFbx.getChooseFrameWithAnimationClip(
                  object.animations[0],
                  totalFrame,
                  frame
              )
          );
        object.traverse(function (child: any) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          // 播放fbx动画
          action.play();
        });

        // 克隆模型的原始材质
        ORIGINAL_MATERIAL = model.children[0].material.clone();

        scene.add(model);

        // 把相机移到悟空身旁，并看向他
        camera.lookAt(model.children[1].position);
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();

        // 如果悟空是原地不动的静止或动画，则初始化control，好让control绕着悟空转
        console.log("=============>>>>>",move);
        if (!move) {
          console.log("=============>>>>>11", cameraPosition.x, cameraPosition.y, cameraPosition.z);
          console.log("=============>>>>>22", controlTarget.x, controlTarget.y, controlTarget.z);


          controls = getControl(camera, renderer);

          controls.object.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
          controls.target.set(controlTarget.x, controlTarget.y, controlTarget.z);
        }
      },
      function (event) {
        // 打印进度条
        const p = (event.loaded / event.total) * 100;
        if (p < 99) {
          progress.value = `模型加载中...${p.toFixed(0)}%`;
        } else {
          progress.value = "";
        }
      }
  );
  window.addEventListener("resize", onWindowResize);
};

function onWindowResize() {
  camera.aspect = divWidth / divHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(divWidth, divHeight);
}

const animate = async () => {
  const delta = clock.getDelta();

  // 当frame等于-1的时候，需要播放动画，动画需要通过mixer.update(delta)进行更新
  // delta如果大于悟空动画的总时间，则取模
  if (frame == -1) if (mixer) mixer.update(delta);

  // move为false的时候，表示模型是原地不动的）
  if (controls && !move)
      // 原地不动的模型转圈，是control更新来实现的，control里面有自动旋转的选项
    controls.update();

  // move为false的时候，表示模型是在向各个方向移动，把摄像机一直顶着他
  if (camera && model && move) {
    camera.position.set(
        model.children[1].position.x + 70,
        model.children[1].position.z,
        model.children[1].position.z + 170
    );
    camera.lookAt(model.children[1].position);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  // if (camera) {
  //   console.log(JSON.stringify(camera.position) + "        111111111");
  // }
  // if (model) {
  //   console.log(JSON.stringify(model.children[1].position) + "        222222222");
  // }
  // if (controls) {
  //   console.log(JSON.stringify(controls.target) + "       33333");
  // }
};
</script>

<template>
  <div class="phone-threeDBase">
    <div id="3d" class="phone-threeD"></div>
    <div class="phone-progress">{{ progress }}</div>
  </div>
</template>

<style scoped>

.phone-progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 4vw;
}

.phone-threeD {
  width: 100vw;
  height: 150vw;
  position: absolute;
}

.phone-threeDBase {
  width: 100vw;
  height: 150vw;
  background: red;
}
</style>
