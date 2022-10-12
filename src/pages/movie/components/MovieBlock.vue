<template>
  <view :class="styles.block">
    <image :class="styles.img" :src="data.COVER || ''" />
    <view :class="styles.right">
      <view>{{ data.NAME }}</view>
      <view>年份: {{ data.YEAR }}</view>
      <view>豆瓣评分: {{ data.DOUBAN_SCORE || "-" }}</view>
      <view>{{ data.LANGUAGES }}</view>
      <view>{{ data.GENRES }}</view>
      <view :class="styles.desc">{{ data.STORYLINE }}</view>
      <view
        :class="[
          active ? styles.heart_active : styles.heart_silent,
          styles.heart
        ]"
        v-if="showHeart"
        @tap="favor"
      />
    </view>
  </view>
</template>

<script setup>
import { promiseCatcher, handleError } from "@/utils";
import Taro from "@tarojs/taro";
import { ref } from "vue";
import _ from "lodash";
import styles from "./index.module.scss";
import api from "../api";

const props = defineProps({
  showHeart: {
    type: Boolean,
    default: false
  },
  data: Object
});
const active = ref(_.get(props.data, "LOVER", false));
const emit = defineEmits(["onClick", "onCancel"]);
const { userId } = Taro.getStorageSync("user");

const favor = async () => {
  if (!active.value) {
    const [err] = await promiseCatcher(
      api.addFavorMovie({ ...props.data, userId })
    );
    if (err) return handleError(err);
    active.value = true;
  } else {
    const [err] = await promiseCatcher(
      api.removeFavorMovie({ userId, movieId: _.get(props.data, "MOVIE_ID") })
    );
    if (err) return handleError(err);
    active.value = false;
  }
};
</script>

<style></style>
