<template>
  <view :class="styles.block">
    <image :class="styles.img" :src="data.COVER || noImg" />
    <view :class="styles.right">
      <view :class="styles.head">{{ data.NAME || "-" }}</view>
      <view :class="styles.intro">年份: {{ data.YEAR || "-" }}</view>
      <view :class="styles.intro"
        >豆瓣评分: {{ data.DOUBAN_SCORE || "-" }}</view
      >
      <view :class="styles.intro">{{ data.LANGUAGES || "-" }}</view>
      <view :class="styles.genres">{{ data.GENRES || "-" }}</view>
      <view :class="styles.desc">{{ data.STORYLINE || "-" }}</view>
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
import noImg from "../../../assets/noImg.png";
import styles from "./index.module.scss";
import api from "../api";

const props = defineProps({
  showHeart: {
    type: Boolean,
    default: false
  },
  data: Object,
  refresh: {
    type: Function,
    default: () => {
      return Function;
    }
  }
});
const active = ref(_.get(props.data, "LOVER", false));
const emit = defineEmits(["onClick", "onCancel"]);
const { userId } = Taro.getStorageSync("user");

const favor = async () => {
  if (!active.value) {
    Taro.showLoading({
      title: "添加中"
    });
    const [err] = await promiseCatcher(
      api.addFavorMovie({ ...props.data, userId })
    );
    if (err) return handleError(err);
    Taro.hideLoading();
    active.value = true;
  } else {
    Taro.showLoading({
      title: "移除中"
    });
    const [err] = await promiseCatcher(
      api.removeFavorMovie({ userId, movieId: _.get(props.data, "MOVIE_ID") })
    );
    if (err) return handleError(err);
    Taro.hideLoading();
    props.refresh();
    active.value = false;
  }
};
</script>
