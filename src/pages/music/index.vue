<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.module.scss";

const msg = ref("音乐");
</script>
