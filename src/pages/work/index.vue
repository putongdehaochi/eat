<template>
  <view :class="styles.container">
    <view :class="styles.title">待办事项</view>
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
  let arr = new Array(100).fill(0);
  const len = count.value.length;
  count.value = count.value.concat(arr.map((item, index) => len + index + 1));
};

onMounted(() => {
  // count.value = count.value.map((item, index) => index + 1);
});
</script>

<style lang="scss"></style>
