<template>
  <view :class="styles.container">
    <view :class="styles.title">忌口</view>
    <nut-cell :class="styles.list">
      <nut-list :height="50" :listData="count" @scroll-bottom="handleScroll">
        <template v-slot="{ item }">
          <view :class="styles.item">
            {{ item }}
          </view>
        </template>
      </nut-list>
    </nut-cell>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import styles from "./index.module.scss";
import { List } from "./constant.ts";

const count = ref(List);

const handleScroll = () => {

};

onMounted(() => {
});
</script>

<style lang="scss"></style>
