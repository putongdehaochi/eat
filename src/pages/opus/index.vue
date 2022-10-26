<template>
  <view :class="styles.container">
    <view v-for="item in opusList" :key="item.title">
      <view
        :class="styles.block"
        @tap="
          {
            Taro.navigateTo({ url: item.url });
          }
        "
      >
        <view :class="styles['block-title']">{{ item.title }}</view>
        <view :class="styles['block-author']">{{ item.author }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";
import { opusList } from "./constant";
</script>
