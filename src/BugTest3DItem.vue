<script lang="ts" setup>
import {initThree} from "./BugTestF";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const oprogress = (data: any) => {
  console.log("callBackOprogress", data)
}
const error = () => {
  console.log("callBackError")
}

const loading = ref("asdasd");

const router = useRouter();

const init = () => {
  let url = "";
  let file = router.currentRoute.value.query.file.toString();
  if (file.startsWith("o_")) {
    url = "https://cdn.jsdelivr.net/gh/lingshiyao/wukongpose/original/" + file;
  } else {
    url = "https://cdn.jsdelivr.net/gh/lingshiyao/wukongpose/armour/" + file;
  }
  initThree(url, router.currentRoute.value.query, oprogress, error);
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="base">
    <div id="3d" class="threeD"></div>
    <div class="loading">{{loading}}</div>
  </div>
</template>

<style lang="css" scoped>

.loading {
  color: #ee9351;
  background: blue;
}

.base {
  width: 100vw;
  height: 150vw;
}

.threeD {
  width: 100vw;
  height: 150vw;
  /*background: red;*/
}

</style>
