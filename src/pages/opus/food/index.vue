<template>
  <view :class="styles.container">
    <view :class="styles.eyebrow">
      <view :class="styles['eyebrow-eye']" @tap="onLike"
        ><nut-icon
          font-class-name="iconfont"
          class-prefix="icon"
          color="#ff6188"
          name="smile"
        />
      </view>
      <view :class="styles['eyebrow-eye']" @tap="onDislike"
        ><nut-icon
          font-class-name="iconfont"
          class-prefix="icon"
          color="#ff6188"
          name="frown"
      /></view>
    </view>
    <view :class="styles.nose" @tap="add"
      >添加<nut-icon
        font-class-name="iconfont"
        class-prefix="icon"
        color="#ff6188"
        name="tianjia"
    /></view>
    <view v-if="status === 1">
      <view v-for="item in dataList" :key="item.id">
        <view :class="styles.block">{{ item }}</view>
      </view>
    </view>
    <view v-else>
      <view v-for="item in dataList" :key="item.id">
        <view :class="styles.block">{{ item }}</view>
      </view>
    </view>
  </view>
  <nut-dialog
    :title="status === 1 ? '添加至喜欢' : '添加至不喜欢'"
    v-model:visible="visible"
    @cancel="onCancel"
    @ok="onOk"
  >
    <template #default>
      <nut-input v-model="inputName" :border="false" label="" />
    </template>
    <template #footer>
      <view :class="styles.footer">
        <view :class="styles['footer-cancel']" @tap="onCancel">取消</view>
        <view :class="styles['footer-ok']" @tap="onOk">确认</view>
      </view>
    </template>
  </nut-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { handleError, promiseCatcher } from "../../../utils";
import usePageList from "../../../hooks/usePageList";
import styles from "./index.module.scss";
import api from "../api";

const inputName = ref("");
const status = ref(1);
const likeList = ref([]);
const dislikeList = ref([]);
const visible = ref(false);
const { userId } = Taro.getStorageSync("user");

const { dataList, getData } = usePageList({
  request: api.getFoodList
});

const onCancel = () => {
  visible.value = false;
};
const onOk = async () => {
  const [err, res] = await promiseCatcher(
    api.addFood({ userId, status: status.value, name: inputName.value })
  );
  if (err) return handleError(err);
  init();
  visible.value = false;
};

const init = async () => {
  const [err, res] = await promiseCatcher(
    api.getFoodList({ userId, status: status.value })
  );
  return res;
};

onMounted(async () => {
  getData({ userId, status: status.value });
});

const onLike = async () => {
  status.value = 1;
  getData({ userId, status: status.value });
};

const onDislike = async () => {
  status.value = 2;
  getData({ userId, status: status.value });
};

const add = () => {
  visible.value = true;
};
</script>
