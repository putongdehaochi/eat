<template>
  <nut-barrage ref="danmu" :danmu="list" speeds="3000"></nut-barrage>
  <!-- <div class="test">
    <button @click="addDanmu" class="add nut-button--primary">随机添加</button>
  </div> -->
</template>

<script setup>
import { ref } from "vue";
import "./index.module.scss";

const inputVal = ref("");
const danmu = ref(null);
let list = ref([
  "沙龙",
  "七里香",
  "枫",
  "矜持",
  "逃亡",
  "我",
  "棋子",
  "无条件"
]);
function addDanmu() {
  let n = Math.random();
  danmu.value.add("随机——" + String(n).substr(2, 10));
}
</script>
