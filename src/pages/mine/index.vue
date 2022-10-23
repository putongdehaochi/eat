<template>
  <view :class="styles.container">
    <view>
      <nut-cell title="用户名" :desc="user.username"></nut-cell>
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
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import styles from "./index.module.scss";
const msg = ref("个人信息");
const user = ref(Taro.getStorageSync("user"));
const loginOut = () => {
  Taro.removeStorageSync("user");
  Taro.redirectTo({ url: "/pages/login/index" });
};
</script>
