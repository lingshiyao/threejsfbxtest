<script lang="ts" setup>
import * as THREE from "three";
import {onMounted, ref} from "vue";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Utils} from "./api/Utils";
import {FlakesTexture} from "three/examples/jsm/textures/FlakesTexture";
import {armourPosePath, originalPose, print} from "./api/AppConstance";

print()

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
 * 原始皮肤的材质
 */
let ORIGINAL_MATERIAL = null;

/**
 * 金色皮肤的材质
 */
let GLODEN_MATERIAL = null;

/**
 * 跳转传参分隔符，点击菜单中的动作，会重新跳转，url传参中分隔用的分隔符
 */
const SEPARATOR = "__________";

/**
 * 模型加载进度的打印字符串
 */
const progress = ref<string>();

/**
 * 经典猴子的加载路径
 */
const ORIGINALPOSEBASEPATH = "https://cdn.jsdelivr.net/gh/lingshiyao/wukongpose/original/";

/**
 * 全装盔甲猴子的加载路径
 */
const ARMOURPOSEBASEPATH = "https://cdn.jsdelivr.net/gh/lingshiyao/wukongpose/armour/";



/**
 * 当前选中的模型路径，要么是原始猴子，要么是盔甲猴子
 */
let nowChooseModelPath = ORIGINALPOSEBASEPATH;

/**
 * 当前选中的模型名字，比如 Walking_-1_29_move.fbx
 */
let modelFile = originalPose[1].file;

/**
 * 从文件名初始化参数，解析出选择的帧数frame，总帧数totalFrame，人物是静止不动还是移动的move
 * @param name
 */
const initParmsFromFileName = (name: string) => {
  const data1 = name.split("_");
  console.log(data1);
  frame = parseInt(data1[2]);
  totalFrame = parseInt(data1[3]);
  if (data1[4] === 'nomove.fbx') {
    move = false;
  } else {
    move = true;
  }
}

initParmsFromFileName(modelFile);

/**
 * 当点击动作跳转后，初始化参数
 */
const initModelPath = () => {
  const path = window.location.href;
  const part = path.split("?");
  if (part.length == 2) {
    const data = part[1].split(SEPARATOR);
    if (data.length == 2) {
      if (data[0] === "original") {
        nowChooseModelPath = ORIGINALPOSEBASEPATH;
        modelFile = originalPose[data[1]].file;
      } else {
        nowChooseModelPath = ARMOURPOSEBASEPATH;
        modelFile = armourPosePath[data[1]].file;
      }
      try {
        initParmsFromFileName(modelFile);
      } catch (ee) {
        console.log(ee)
      }
    }
  }
}
initModelPath();

onMounted(() => {
  init();
  animate();
});

/**
 * 悟空模型
 */
let wukongModel = null;

let camera, scene, renderer, mixer;
let controls = null;
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
}

const getRender = (width: number, height: number) => {
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  return renderer;
}

const getScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
  return scene;
}

const getCamera = (width: number, height: number) => {
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  camera.position.set(100, 200, 300);
  return camera;
}

const getControl = (camera: any, renderer: any, wukongPos: any) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.target.set(wukongPos.x, wukongPos.y, wukongPos.z);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.update();
  return controls;
}

/**
 * 初始化地面
 * @param scene
 */
const initGround = (scene: THREE.Scene) => {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
    color: 0x999999,
    depthWrite: false
  }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

/**
 * 获取金色的材质
 */
const getGoldenMaterial = () => {
  const normalMap3 = new THREE.CanvasTexture(new FlakesTexture());
  normalMap3.wrapS = THREE.RepeatWrapping;
  normalMap3.wrapT = THREE.RepeatWrapping;
  normalMap3.repeat.x = 10;
  normalMap3.repeat.y = 6;
  normalMap3.anisotropy = 16;

  let material = new THREE.MeshPhysicalMaterial({
    clearcoat: 0.5,
    clearcoatRoughness: 0.5,
    metalness: 0.9,
    roughness: 0.5,
    color: 0xff7b00,
    emissive: 0x000000,
    normalMap: normalMap3,
    normalScale: new THREE.Vector2(0.15, 0.15)
  });
  return material;
}

const init = async () => {
  const threeDiv: any = document.getElementById("3d")
  divWidth = threeDiv.clientWidth;
  divHeight = threeDiv.clientHeight;
  renderer = getRender(divWidth, divHeight);
  threeDiv.appendChild(renderer.domElement);
  camera = getCamera(divWidth, divHeight);
  scene = getScene();
  initLight(scene);

  // TODO 地面，可要可不要
  // initGround(scene);

  const loader = new FBXLoader();
  loader.setPath(nowChooseModelPath).load(modelFile, function (object) {

    wukongModel = object;
    mixer = new THREE.AnimationMixer(object);
    const action = mixer.clipAction(object.animations[0]);
    mixer.timeScale = 1

    // 播放fbx动画
    action.play();

    if (frame != -1)
      mixer.update(Utils.getChooseFrameWithAnimationClip(object.animations[0], totalFrame, frame));
    object.traverse(function (child: any) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // 克隆模型的原始材质
    ORIGINAL_MATERIAL = wukongModel.children[0].material.clone();

    // 初始化金色材质
    GLODEN_MATERIAL = getGoldenMaterial();

    scene.add(wukongModel);

    // 把相机移到悟空身旁，并看向他
    camera.position.set(wukongModel.children[1].position.x + 150, wukongModel.children[1].position.y, wukongModel.children[1].position.z + 150);
    camera.lookAt(wukongModel.children[1].position);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    // 如果悟空是原地不动的静止或动画，则初始化control，好让control绕着悟空转
    // if (!move)
    controls = getControl(camera, renderer, wukongModel.children[1].position);
  }, function (event) {
    // 打印进度条
    const p = event.loaded / event.total * 100;
    if (p < 99) {
      progress.value = `loading...${p.toFixed(0)}%`
    } else {
      progress.value = ""
    }
  });
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = divWidth / divHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(divWidth, divHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  // 当frame等于-1的时候，需要播放动画，动画需要通过mixer.update(delta)进行更新
  // delta如果大于悟空动画的总时间，则取模
  if (frame == -1)
    if (mixer) mixer.update(delta);

  // move为false的时候，表示模型是原地不动的）
  // if (controls && !move)
  // 原地不动的模型转圈，是control更新来实现的，control里面有自动旋转的选项
  controls.update();

  // move为false的时候，表示模型是在向各个方向移动，把摄像机一直顶着他
  // if (camera && wukongModel && move) {
  //   camera.position.set(wukongModel.children[1].position.x + 70, wukongModel.children[1].position.y, wukongModel.children[1].position.z + 170);
  //   camera.lookAt(wukongModel.children[1].position);
  //   camera.updateProjectionMatrix();
  //   camera.updateMatrixWorld();
  // }
  renderer.render(scene, camera);
}

/**
 * 把window.location.href里面的初始地址提出来
 */
const getBasePath = () => {
  const path = window.location.href;
  const index = path.indexOf("?")
  if (index == -1) {
    return path;
  } else {
    return path.substring(0, index);
  }
}

/**
 * 点击选择动作
 *
 * @param model
 * @param index
 */
const clickChooseModel = (model: string, index: number) => {
  console.log(model, index, window.location.href);
  window.location.href = `${getBasePath()}?${model}${SEPARATOR}${index}`
}

/**
 *
 * @param index 0：原始皮肤
 *              1：金色皮肤
 */
const clickChooseMaterial = (index: number) => {
  switch (index) {
    case 0:
      wukongModel.children[0].material = ORIGINAL_MATERIAL;
      break;
    case 1:
      wukongModel.children[0].material = GLODEN_MATERIAL;
      break;
  }
}

</script>

<template>
  <div class="base">
    <div class="threeDBase">
      <div id="3d" class="threeD"></div>
      <div class="progress">{{ progress }}</div>
    </div>
    <!--    <div class="line">-->
    <!--      <div class="btn2" @click="clickChooseMaterial(0)">原始皮肤</div>-->
    <!--      <div class="btn3" @click="clickChooseMaterial(1)">金色皮肤</div>-->
    <!--      &lt;!&ndash;      <div class="btn4" @click="chooseMaterial(2)">银色皮肤</div>&ndash;&gt;-->
    <!--    </div>-->
    <!--    <div v-for="(item, index) in armourPosePath" :key="index">-->
    <!--      <div class="btn" @click="clickChooseModel('armour', index)">齐天大圣-{{ item.action }}</div>-->
    <!--    </div>-->
    <!--    <div v-for="(item, index) in originalPose" :key="index">-->
    <!--      <div class="btn" @click="clickChooseModel('original', index)">经典悟空-{{ item.action }}</div>-->
    <!--    </div>-->
  </div>
</template>

<style scoped>

.line {
  display: flex;
  flex-direction: row;
}

.base {
  background: #333333;
}

.progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ee9351;
  font-size: 10vw;
}

.btn {
  background-color: #ee9351;
  border-radius: 0.63rem;
  height: 2.81rem;
  width: 100vw;
  border: solid 0.063rem #000000;
  line-height: 2.81rem;
  color: #000000;
}

.btn2 {
  background-color: #5A5652;
  border-radius: 0.63rem;
  height: 2.81rem;
  border: solid 0.063rem #000000;
  width: 30vw;
  line-height: 2.81rem;
  color: #ffffff;
}

.btn3 {
  background-color: #1C0404;
  border-radius: 0.63rem;
  height: 2.81rem;
  border: solid 0.063rem #000000;
  width: 30vw;
  line-height: 2.81rem;
  color: #F1B311;
}

.btn4 {
  background-color: #F2F2F2;
  border-radius: 0.63rem;
  height: 2.81rem;
  border: solid 0.063rem #000000;
  width: 30vw;
  line-height: 2.81rem;
  color: #858585;
}

.threeD {
  width: 100vw;
  height: 100vh;
  background: #000000;
  /*position: absolute;*/
}

.threeDBase {
  width: 100vw;
  height: 100vh;
  background: #000000;
}
</style>
