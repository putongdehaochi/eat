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
  "火锅",
  "咖啡",
  "美酒",
  "炸鸡",
  "汉堡",
  "烤肉",
  "烧烤",
  "冷吃兔",
  "火锅鱼",
  "酥肉",
  "毛肚",
  "冒菜",
  "麻辣香锅",
  "面条",
  "小龙虾"
]);
function addDanmu() {
  let n = Math.random();
  danmu.value.add("随机——" + String(n).substr(2, 10));
}
</script>
