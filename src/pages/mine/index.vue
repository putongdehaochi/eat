<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
  <view :class="styles.btn">
    <nut-button
      @tap="loginOut"
      color="#ff6188"
      shape="square"
      type="primary"
      size="large"
      >退出登录</nut-button
    ></view
  >
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import styles from "./index.module.scss";
const msg = ref("个人信息");
const loginOut = () => {
  Taro.removeStorageSync("user");
  Taro.redirectTo({ url: "/pages/login/index" });
};
</script>
