<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
  <nut-button type="primary" size="large" @tap="loginOut"
    >退出登录</nut-button
  >
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import "./index.scss";
const msg = ref("个人信息");
const loginOut = () => {
  Taro.removeStorageSync("user");
  Taro.redirectTo({ url: "/pages/login/index" });
};
</script>
