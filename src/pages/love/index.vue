<template>
  <view :class="styles.index">
    <nut-grid :border="false" :direction="horizontal" :column-num="3" square>
      <nut-grid-item
        @click="
          {
            Taro.navigateTo({ url: item.url });
          }
        "
        v-for="item in menus"
        :key="item.key"
      >
        <img :src="`../../assets/icons/${item.icon}.png`" :class="styles.img" />
        <span :class="styles.title">{{ item.title }}</span>
      </nut-grid-item>
    </nut-grid>
  </view>
</template>

<script setup>
import styles from "./index.module.scss";
import menus from "./constant";
import Taro from "@tarojs/taro";
import tea from "../../assets/icons/tea.png";
</script>

<style>
.nut-grid-item__content {
  background: 0;
}
</style>
