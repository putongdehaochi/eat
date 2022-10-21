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
        <nut-icon
          font-class-name="iconfont"
          class-prefix="icon-eat_"
          style="color: #1296db"
          name="{item.icon}"
          size="40"
        />
        <span :class="styles.title">{{ item.title }}</span>
      </nut-grid-item>
    </nut-grid>
  </view>
</template>

<script setup>
import styles from "./index.module.scss";
import menus from "../chest/constant";
import Taro from "@tarojs/taro";
</script>

<style>
.nut-grid-item__content {
  background: 0;
}
</style>
