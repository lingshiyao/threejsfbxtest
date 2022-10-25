<script lang="ts" setup>

import {useRouter} from "vue-router";

const router = useRouter();

const data = [{
  file: "o_Drunk Idle Variation_-1_119_nomove.fbx",
  value: {
    camerax: 255.4294836901275,
    cameray: 55.348231763908245,
    cameraz: 40.854947307062325,
    controlx: -2.471876973438579,
    controly: 55.64585526964676,
    controlz: 4.563223499417714
  }
}, {
  file: "o_Fist Fight A_-1_140_nomove.fbx",
  value: {
    camerax: -259.1356725779969,
    cameray: 34.39693213897889,
    cameraz: -22.412514468945574,
    controlx: -0.1590141892097308,
    controly: 53.50796000474227,
    controlz: -2.50903104292833
  }
}, {
  file: "o_Male Action Pose_-1_1_nomove.fbx",
  value: {
    camerax: -165.31217559874622,
    cameray: 54.383805196472885,
    cameraz: -182.33508310368018,
    controlx: 5.528208753403458,
    controly: 50.60247144544018,
    controlz: -3.4046469574715585
  }
}, {
  file: "o_Male Laying Pose_-1_1_nomove.fbx",
  value: {
    camerax: -68.45096783951466,
    cameray: 30.8616031704905,
    cameraz: -219.20286983341893,
    controlx: -6.518834961253293,
    controly: 47.044020733037044,
    controlz: 6.191077273658718
  }
}, {
  file: "o_Male Locomotion Pose_-1_1_nomove.fbx",
  value: {
    camerax: -50.052536419808455,
    cameray: 40.83169632183307,
    cameraz: 243.71286050883344,
    controlx: 1.4935122683597852,
    controly: 50.38791278241329,
    controlz: 1.9102137458215063
  }
}, {
  file: "o_Male Sitting Pose_-1_1_nomove.fbx",
  value: {
    camerax: -82.65509754936755,
    cameray: 56.83047389882397,
    cameraz: 241.7106288108741,
    controlx: 0.6945127418751728,
    controly: 49.91353121790913,
    controlz: 8.85480483770238
  }
}, {
  file: "o_Male Standing Pose_-1_1_nomove.fbx",
  value: {
    camerax: 4.195322576781349,
    cameray: 41.48830280003345,
    cameraz: -243.46373305392905,
    controlx: 6.072664017776543,
    controly: 51.27520710259909,
    controlz: 3.755862616141851
  }
}, {
  file: "o_Military Signaling_-1_195_nomove.fbx",
  value: {
    camerax: -212.43907974734984,
    cameray: 31.530335303072288,
    cameraz: -79.96714755396236,
    controlx: 4.898939252485684,
    controly: 48.77339530813004,
    controlz: 7.868250895977647
  }
}, {
  file: "o_Nervously Look Around_-1_188_nomove.fbx",
  value: {
    camerax: 162.41348677677732,
    cameray: 39.09513282013187,
    cameraz: -186.59688259846533,
    controlx: 1.7461691584716086,
    controly: 52.135073375141054,
    controlz: 1.1071647463807293
  }
}, {
  file: "o_Praying_-1_206_nomove.fbx",
  value: {
    camerax: -205.2677435367036,
    cameray: 48.61173095803475,
    cameraz: -99.69839299184603,
    controlx: 0.573307288159022,
    controly: 49.26218779239788,
    controlz: 13.779505927886216
  }
}, {
  file: "o_Silly Dancing_-1_115_nomove.fbx",
  value: {
    camerax: -169.45007781665393,
    cameray: 32.90167269754318,
    cameraz: 179.33360940842704,
    controlx: 3.7700010827190127,
    controly: 51.418445373359006,
    controlz: 3.638504793167343
  }
}, {
  file: "o_Situps_-1_67_nomove.fbx",
  value: {
    camerax: -21.55918974833006,
    cameray: 51.018463060103215,
    cameraz: 248.68270099931215,
    controlx: 3.3790532025884636,
    controly: 49.08287697773686,
    controlz: 14.968062204327563
  }
}, {
  file: "a_Drinking_-1_266_nomove.fbx",
  value: {
    camerax: -271.9623381866127,
    cameray: 32.39269181880139,
    cameraz: -30.84940856336018,
    controlx: -1.9508636012786098,
    controly: 57.45778396829386,
    controlz: -0.9123611140851625
  }
}, {
  file: "a_Female Action Pose_-1_1_nomove.fbx",
  value: {
    camerax: 210.9125162573383,
    cameray: 15.70262814416187,
    cameraz: -193.59733357649907,
    controlx: 0.5869131805917117,
    controly: 61.155844655860726,
    controlz: 20.81282908967242
  }
}, {
  file: "a_Female Locomotion Pose1_-1_1_nomove.fbx",
  value: {
    camerax: -261.77269420922494,
    cameray: 65.21088002782311,
    cameraz: -117.59456916617273,
    controlx: 3.379828858194935,
    controly: 60.052081284263224,
    controlz: -3.817033657400718
  }
}, {
  file: "a_Male Laying Pose_-1_1_nomove.fbx",
  value: {
    camerax: -209.23026713022432,
    cameray: 43.820695589669455,
    cameraz: -193.19494628250823,
    controlx: -5.919537774846927,
    controly: 61.431820753966754,
    controlz: 10.845238189661895
  }
}, {
  file: "a_Male Standing Pose Skirt_-1_1_nomove.fbx",
  value: {
    camerax: -72.57175165744223,
    cameray: 46.124518505704465,
    cameraz: -280.64018843553293,
    controlx: -6.018287852317619,
    controly: 51.968313009985366,
    controlz: 0.09863645566439357
  }
}, {
  file: "a_Male Standing Pose Skirt01_-1_1_nomove.fbx",
  value: {
    camerax: -168.89266870348666,
    cameray: 63.4544502199675,
    cameraz: 230.4279111779063,
    controlx: 5.864887394668972,
    controly: 51.537859884922725,
    controlz: 1.0906208360243819
  }
}, {
  file: "a_Male Standing Pose1_-1_1_nomove.fbx",
  value: {
    camerax: -270.3458157714,
    cameray: 58.182925742483484,
    cameraz: 104.36619379074524,
    controlx: -0.09614847417999252,
    controly: 60.02388390603347,
    controlz: 3.1756335651972623
  }
}, {
  file: "a_Praying_-1_58_nomove.fbx",
  value: {
    camerax: 259.8020966148087,
    cameray: 56.462446510917324,
    cameraz: 57.91999338809593,
    controlx: 4.389265560222862,
    controly: 56.44004584448005,
    controlz: 6.983023909218803
  }
}, {
  file: "a_Drunk1_-1_75_move.fbx",
},{
  file: "a_Walking1_-1_29_move.fbx",
},{
  file: "o_Cartwheel_-1_106_move.fbx",
},{
  file: "o_Running_-1_21_move.fbx",
}]

const getUrl = (name) => {
  if (parseInt(name.split(".")[0].split("_")[3]) > 1) {
    name = name.split(".")[0] + ".gif";
  } else {
    name = name.split(".")[0] + ".png";
  }
  return new URL(`./assets/${name}`, import.meta.url).href;
}

const gotoPageB = (item) => {
  let str = JSON.stringify(item);
  router.push({
    path: "/page2",
    query: {
      file: item.file,
      camerax: item.value === undefined ? 0 : item.value.camerax,
      cameray: item.value === undefined ? 0 : item.value.cameray,
      cameraz: item.value === undefined ? 0 : item.value.cameraz,
      controlx: item.value === undefined ? 0 : item.value.controlx,
      controly: item.value === undefined ? 0 : item.value.controly,
      controlz: item.value === undefined ? 0 : item.value.controlz,
    }
  })
}

</script>

<template>
  <div class="grid">
    <div v-for="(item, index) in data" :key="index">
      <div class="img-border">
        <img :src="getUrl(item.file)" class="img" @click="gotoPageB(item)"/>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.img-border {
  /*background: #ee9351;*/
}

.grid {
  width: 100vw;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  /*background: red;*/
}

.img {
  width: 100px;
  heigth: 100px;
  border-radius: 7px 7px 7px 7px;
}

</style>
