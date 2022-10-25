<script lang="ts" setup>
import {onMounted, ref} from "vue";

const data = [{
  "file": "o_Cartwheel_-1_106_move.fbx",
  "action": "翻跟头",
  "type": "action",
  "level": 400,
  "rarity": "SR"
}, {
  "file": "o_Drunk Idle Variation_-1_119_nomove.fbx",
  "action": "喝醉了",
  "type": "action",
  "level": 140,
  "rarity": "SSR"
}, {
  "file": "o_Fist Fight A_-1_140_nomove.fbx",
  "action": "耍一套军体拳",
  "type": "action",
  "level": 180,
  "rarity": "SSR"
}, {
  "file": "o_Male Action Pose_-1_1_nomove.fbx",
  "action": "推箱子",
  "type": "model",
  "level": 500,
  "rarity": "R"
}, {
  "file": "o_Male Laying Pose_-1_1_nomove.fbx",
  "action": "睡觉",
  "type": "model",
  "level": 500,
  "rarity": "R"
}, {
  "file": "o_Male Locomotion Pose_-1_1_nomove.fbx",
  "action": "跑步",
  "type": "model",
  "level": 500,
  "rarity": "R"
}, {
  "file": "o_Male Sitting Pose_-1_1_nomove.fbx",
  "action": "看天上云彩",
  "type": "model",
  "level": 400,
  "rarity": "SR"
}, {
  "file": "o_Male Standing Pose_-1_1_nomove.fbx",
  "action": "解释",
  "type": "model",
  "level": 500,
  "rarity": "R"
}, {
  "file": "o_Military Signaling_-1_195_nomove.fbx",
  "action": "红孩儿乖",
  "type": "action",
  "level": 180,
  "rarity": "SSR"
}, {
  "file": "o_Nervously Look Around_-1_188_nomove.fbx",
  "action": "不安",
  "type": "action",
  "level": 340,
  "rarity": "SR"
}, {
  "file": "o_Praying_-1_206_nomove.fbx",
  "action": "求菩萨",
  "type": "action",
  "level": 280,
  "rarity": "SR"
}, {
  "file": "o_Running_-1_21_move.fbx",
  "action": "慢跑",
  "type": "action",
  "level": 400,
  "rarity": "SR"
}, {
  "file": "o_Silly Dancing_-1_115_nomove.fbx",
  "action": "接着奏乐接着舞",
  "type": "action",
  "level": 80,
  "rarity": "UR"
}, {
  "file": "o_Situps_-1_67_nomove.fbx",
  "action": "仰卧起坐",
  "type": "action",
  "level": 400,
  "rarity": "SR"
}, {
  "file": "a_Drinking_-1_266_nomove.fbx",
  "action": "喝了这杯酒啊",
  "type": "action",
  "level": 140,
  "rarity": "SSR"
}, {
  "file": "a_Drunk1_-1_75_move.fbx",
  "action": "喝醉了",
  "type": "action",
  "level": 40,
  "rarity": "LR"
}, {
  "file": "a_Female Action Pose_-1_1_nomove.fbx",
  "action": "格挡下盘进攻",
  "type": "model",
  "level": 120,
  "rarity": "SSR"
}, {
  "file": "a_Female Locomotion Pose1_-1_1_nomove.fbx",
  "action": "行者大圣",
  "type": "model",
  "level": 340,
  "rarity": "SR"
}, {
  "file": "a_Male Laying Pose_-1_1_nomove.fbx",
  "action": "看孩儿们操练",
  "type": "model",
  "level": 400,
  "rarity": "SR"
}, {
  "file": "a_Male Standing Pose Skirt_-1_1_nomove.fbx",
  "action": "叉腰站立",
  "type": "model",
  "level": 420,
  "rarity": "R"
}, {
  "file": "a_Male Standing Pose Skirt01_-1_1_nomove.fbx",
  "action": "向龙王解释",
  "type": "model",
  "level": 220,
  "rarity": "SR"
}, {
  "file": "a_Male Standing Pose1_-1_1_nomove.fbx",
  "action": "踩在石头上凹造型",
  "type": "model",
  "level": 400,
  "rarity": "SR"
}, {
  "file": "a_Praying_-1_58_nomove.fbx",
  "action": "我佛慈悲",
  "type": "action",
  "level": 160,
  "rarity": "SSR"
}, {"file": "a_Walking1_-1_29_move.fbx", "action": "大步向前走", "type": "action", "level": 160, "rarity": "SSR"}]

let print = "";
for (let i = 0; i < data.length; i++) {
  print += `nameToTotalMap.put("${data[i].file.split(".")[0]}", ${data[i].level});`;
}
for (let i = 0; i < data.length; i++) {
  print += `nameToAttrMap.put("${data[i].file.split(".")[0]}", "${data[i].rarity}");`;
}
console.log(print)


const printData = ref([]);

const getUrl = (name) => {
  return new URL(`./assets/${name}`, import.meta.url).href;
}

const init = () => {
  for (let i = 0; i < data.length; i++) {
    const part = data[i].file.split("_")
    console.log(part);
    const totalFrame = parseInt(part[3]);
    let src = "";
    if (totalFrame > 1) {
      src = data[i].file.split(".")[0] + ".gif";
    } else {
      src = data[i].file.split(".")[0] + ".png";
    }
    let name = ""
    if (data[i].file.startsWith("o_")) {
      name = "3D孙悟空-" + data[i].action;
    } else {
      name = "3D齐天大圣-" + data[i].action;
    }
    printData.value.push({
      src: src,
      level: data[i].rarity,
      count: data[i].level,
      name: name
    })
  }
}

onMounted(() => {
  init();
});

</script>

<template>
  <div class="grid">
    <div v-for="(item, index) in printData" :key="index">
      <div class="card111">
        <div class="name">{{ item.name }}</div>
        <img :src="getUrl(item.src)" class="img"/>
        <div class="prop">
          <div class="sr">等级：{{ item.level }}</div>
          <div></div>
          <div class="total">&nbsp;&nbsp;&nbsp;总数：{{ item.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">

.name {
  color: aqua;
}

.total {
  color: green;
}

.sr {
  color: #ee9351;
}

.prop {
  display: flex;
  flex-direction: row;
}

.card111 {
  display: flex;
  flex-direction: column;
  background: black;
  border: 0.5px solid #222222;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
  width: 100vw;
  grid-template-columns: 16.6% 16.6% 16.6% 16.6% 16.6% 16.6%;
}

.img {
  width: 220px;
  heigth: 220px;
  border-radius: 7px 7px 7px 7px;
}

</style>
