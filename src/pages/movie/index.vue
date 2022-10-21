<template>
  <nut-searchbar
    @focus="showSearch = true"
    input-background="#ffeef1"
    v-model="searchValue"
    background="#ffe9ee"
    @search="search"
  >
    <template v-slot:leftin>
      <nut-icon size="14" name="search2" />
    </template>
    <template v-slot:rightout>
      <view @tap="cancel">取消</view>
    </template></nut-searchbar
  >
  <template v-if="showSearch">
    <view :class="styles.list" v-for="(item, index) in dbResult" :key="index">
      <MovieBlock :data="item" :showHeart="true" />
    </view>
  </template>
  <template v-else>
    <nut-menu scroll-fixed :title-class="styles.title">
      <nut-menu-item title="类型" ref="select">
        <view :class="styles.select">
          <view v-for="item in state.types" :key="item">
            <span
              :class="{ mv_square: true, mv_highlight: active === item }"
              @tap="setActive(item)"
            >
              {{ item }}
            </span>
          </view></view
        >
      </nut-menu-item>
    </nut-menu>
    <view :class="styles.list" v-for="(item, index) in result" :key="index">
      <MovieBlock :data="item" :showHeart="true" />
    </view>
  </template>
</template>

<script setup>
import { ref, onMounted, reactive, watchEffect } from "vue";
import { promiseCatcher, handleError } from "@/utils";
import Taro, { useReachBottom } from "@tarojs/taro";
import _ from "lodash";
import MovieBlock from "./components/MovieBlock";
import styles from "./index.module.scss";
import { TYPES } from "./constant";
import api from "./api";

const state = reactive({
  types: TYPES
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
  const [err, res] = await promiseCatcher(
    api.getMyMovieList({ keyword: val === "全部类型" ? "" : val })
  );
  if (err) return handleError(err);
  result.value = _.get(res, "results", []);
  page = 1;
  select.value.toggle();
};

onMounted(async () => {
  result.value = _.get(await api.getMyMovieList({ page }), "results", []);
});

useReachBottom(async () => {
  if (showSearch.value) {
    const [err, res] = await promiseCatcher(
      api.getDbMovieList({ page: (dbPage += 1), keyword: searchValue.value })
    );
    if (err) return handleError(err);
    dbResult.value = _.concat(dbResult.value, _.get(res, "results", []));
  } else {
    const [err, res] = await promiseCatcher(
      api.getMyMovieList({ page: (page += 1) })
    );
    if (err) return handleError(err);
    result.value = _.concat(result.value, _.get(res, "results", []));
  }
});
</script>

<style>
.mv_square {
  background-color: #ffdde9;
  border-radius: 3px;
  padding: 5px;
  margin: 5px 10px 5px 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.3);
}
.mv_highlight {
  color: #ff6188;
}
.nut-menu-item__content {
  padding-top: 0;
  background-color: #fff0f6;
}
</style>
