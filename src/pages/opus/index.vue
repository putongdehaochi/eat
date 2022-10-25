<template>
  <view :class="styles.container">
    <view :class="styles.eyebrow">
      <view :class="styles['eyebrow-eye']" @tap="onLike">喜欢</view>
      <view :class="styles['eyebrow-eye']" @tap="onDislike">不喜欢</view>
    </view>
    <view :class="styles.nose" @tap="add">添加</view>
    <view v-if="status">
      <view v-for="(item, index) in likeList" :key="index">
        <view :class="styles.block">{{ item }}</view>
      </view>
    </view>
    <view v-else>
      <view v-for="(item, index) in dislikeList" :key="index">
        <view :class="styles.block">{{ item }}</view>
      </view>
    </view>
  </view>
  <nut-dialog
    :title="status ? '添加至喜欢' : '添加至不喜欢'"
    content="这是基础弹框。"
    v-model:visible="visible"
    @cancel="onCancel"
    @ok="onOk"
  >
    <template #default>
      <nut-input :model="inputName" :border="false" label="" />
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
import styles from "./index.module.scss";

const inputName = ref("");
const status = ref(true);
const likeList = ref([]);
const dislikeList = ref([]);
const visible = ref(false);

const onCancel = () => {
  visible.value = false;
};
const onOk = async () => {
  if (status.value) {
    // 添加至喜欢接口
  } else {
    // 添加至不喜欢接口
  }
  init();
  visible.value = false;
};

const init = () => {
  // api.getFoodBook({ type: status.value, page: 1})
};

onMounted(() => {
  init();
  likeList.value = [1, 2, 3, 4, 5];
});

const onLike = () => {
  status.value = true;
  init();
  likeList.value = [1, 2, 3, 4, 5];
};

const onDislike = () => {
  status.value = false;
  init();
  dislikeList.value = [6, 7, 8, 9, 10];
};

const add = () => {
  visible.value = true;
};
</script>
