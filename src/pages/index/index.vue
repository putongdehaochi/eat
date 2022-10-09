<template>
  <view class="index">
    {{ msg }}
  </view>
</template>

<script setup>
import { ref } from "vue";
import "./index.scss";

const msg = ref("首页");
</script>
