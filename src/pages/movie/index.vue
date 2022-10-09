<template>
  <nut-searchbar
    v-model="searchValue"
    @search="search"
    @focus="showSearch = true"
  >
    <template v-slot:leftin>
      <nut-icon size="14" name="search2"></nut-icon>
    </template>
    <template v-slot:rightout>
      <view @tap="cancel">取消</view>
    </template></nut-searchbar
  >
  <template v-if="showSearch">
    <view :class="styles.list" v-for="(item, index) in dbResult" :key="index">
      <view :class="styles.block">
        <img :class="styles.img" src="{{item.COVER}}" />
        <view>{{ item.NAME }}</view>
        <view>{{ item.DOUBAN_SCORE }}</view>
        <view>{{ item.LANGUAGES }}</view>
        <view>{{ item.GENRES }}</view>
        <view>{{ item.YEAR }}</view>
      </view>
    </view>
  </template>
  <template v-else>
    <nut-menu scroll-fixed>
      <nut-menu-item title="类型" ref="select">
        <view :class="styles.select">
          <view v-for="item in state.types" :key="item">
            <span
              :class="{ square: true, highlight: active === item }"
              @tap="setActive(item)"
            >
              {{ item }}
            </span>
          </view></view
        >
      </nut-menu-item>
    </nut-menu>
    <view :class="styles.list" v-for="(item, index) in result" :key="index">
      <view :class="styles.block">
        <img :class="styles.img" src="{{item.COVER}}" />
        <view>{{ item.NAME }}</view>
        <view>{{ item.DOUBAN_SCORE }}</view>
        <view>{{ item.LANGUAGES }}</view>
        <view>{{ item.GENRES }}</view>
        <view>{{ item.YEAR }}</view>
      </view>
    </view>
  </template>
</template>

<script setup>
import { ref, onMounted, reactive, watchEffect } from "vue";
import Taro, { useReachBottom } from "@tarojs/taro";
import styles from "./index.module.scss";
import { promiseCatcher, handleError } from "@/utils";
import _ from "lodash";
import api from "./api";

const state = reactive({
  types: [
    "全部类型",
    "喜剧",
    "爱情",
    "动作",
    "科幻",
    "动画",
    "悬疑",
    "犯罪",
    "惊悚",
    "冒险",
    "音乐",
    "历史",
    "奇幻",
    "恐怖",
    "战争",
    "传记",
    "歌舞",
    "武侠",
    "情色",
    "灾难",
    "西部",
    "纪录片",
    "短片"
  ]
});
const result = ref([]);
const dbResult = ref([]);
const select = ref("");
const searchValue = ref("");
const showSearch = ref(false);
const active = ref("全部类型");
let page = 1;
let dbPage = 1;

const cancel = () => {
  showSearch.value = false;
};

const search = async () => {
  Taro.showLoading({ title: "搜索中" });
  const [err, res] = await promiseCatcher(
    api.getDbMovieList({ dbPage, keyword: searchValue.value })
  );
  if (err) {
    Taro.hideLoading();
    handleError(err);
  }
  dbResult.value = _.get(res, "results", []);
  Taro.hideLoading();
};

const setActive = async val => {
  active.value = val;
  result.value = _.get(
    await api.getMyMovieList({ page, keyword: val === "全部类型" ? "" : val }),
    "results",
    []
  );
  select.value.toggle();
};

onMounted(async () => {
  result.value = _.get(await api.getMyMovieList({ page }), "results", []);
});

useReachBottom(async () => {
  if (showSearch.value) {
    const [err, res] = await promiseCatcher(
      api.getDbMovieList({ dbPage: (dbPage += 1), keyword: searchValue.value })
    );
  } else {
    result.value = _.get(
      await api.getMyMovieList({ page: (page += 1) }),
      "results",
      []
    );
  }
});
</script>

<style>
.square {
  background-color: #f3f3f3;
  border-radius: 3px;
  padding: 5px;
  margin: 5px 10px 5px 0;
  font-size: 15px;
}
.highlight {
  color: green;
}
.nut-menu-item__content {
  padding-top: 0;
}
</style>
