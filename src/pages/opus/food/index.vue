<template>
  <view :class="styles.container">
    <view :class="styles.eyebrow">
      <view :class="styles['eyebrow-eye']" @tap="onLike"
        ><nut-icon
          font-class-name="iconfont"
          class-prefix="icon"
          color="#ff6188"
          name="smile"
          size="24"
        />
      </view>
      <view :class="styles['eyebrow-eye']" @tap="onDislike"
        ><nut-icon
          font-class-name="iconfont"
          class-prefix="icon"
          color="#ff6188"
          name="frown"
          size="24"
      /></view>
    </view>
    <view :class="styles.nose" @tap="() => dispatch('add')"
      >添加<nut-icon
        font-class-name="iconfont"
        class-prefix="icon"
        style="margin-left: 12px"
        color="#ff6188"
        name="tianjia"
        size="20"
    /></view>
    <view v-if="status === 1" style="width: 100%">
      <view v-for="item in dataList" :key="item.id">
        <Action @dispatch="dispatch" :data="item" />
      </view>
    </view>
    <view v-else style="width: 100%">
      <view v-for="item in dataList" :key="item.id">
        <view>
          <Action @dispatch="dispatch" :data="item" />
        </view>
      </view>
    </view>
  </view>
  <nut-dialog
    :custom-class="styles.dialog"
    v-model:visible="visible"
    :title="curAction.title"
    @cancel="onCancel"
    @ok="onOk"
  >
    <template #default>
      <nut-input
        v-if="curAction.showInput"
        :error-message="errorTip"
        :class="styles.input"
        v-model="inputName"
        :border="false"
        label=""
      />
      <view v-else>是否删除{{ curAction.curValue }}?</view>
    </template>
    <template #footer>
      <view :class="styles.footer">
        <view :class="styles['footer-btn']" @tap="onCancel">取消</view>
        <view :class="styles['footer-btn']" @tap="onOk">确认</view>
      </view>
    </template>
  </nut-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { handleError, promiseCatcher } from "../../../utils";
import usePageList from "../../../hooks/usePageList";
import Action from "../components/action/Action";
import styles from "./index.module.scss";
import api from "../api";
import _ from "lodash";

const inputName = ref("");
const errorTip = ref("");
const status = ref(1);
const likeList = ref([]);
const dislikeList = ref([]);
const visible = ref(false);
const curAction = ref({});
const { userId } = Taro.getStorageSync("user");

const { dataList, getData, noData, noMore } = usePageList({
  request: api.getFoodList,
  params: { userId, status: status.value },
  enableReachBottom: true,
  enablePullDownRefresh: true
});

const onCancel = () => {
  visible.value = false;
};
const onOk = async () => {
  switch (curAction.value.action) {
    case "add":
      if (!inputName.value) return (errorTip.value = "请输入添加项");
      errorTip.value = "";
      const [addErr] = await promiseCatcher(
        api.addFood({
          status: status.value,
          name: inputName.value,
          userId
        })
      );
      if (addErr) return handleError(addErr);
      inputName.value = "";
      break;

    case "edit":
      if (!inputName.value) return (errorTip.value = "请输入编辑项");
      errorTip.value = "";
      const [editErr] = await promiseCatcher(
        api.editFood({
          name: inputName.value,
          id: curAction.value.id,
          userId
        })
      );
      if (editErr) return handleError(editErr);
      break;

    case "delete":
      const [removeErr] = await promiseCatcher(
        api.removeFood({
          id: curAction.value.id,
          userId
        })
      );
      if (removeErr) return handleError(removeErr);
      break;

    default:
      break;
  }
  getData({ status: status.value });
  visible.value = false;
};

onMounted(async () => {
  getData();
});

const onLike = async () => {
  if (status.value === 1) return;
  status.value = 1;
  getData({ status: status.value });
};

const onDislike = async () => {
  if (status.value === 2) return;
  status.value = 2;
  getData({ status: status.value });
};

const dispatch = (action, name, id) => {
  const title =
    action === "add"
      ? status.value === 1
        ? "添加至喜欢"
        : "添加至不喜欢"
      : action === "edit"
      ? "编辑"
      : "删除";
  const showInput = action === "delete" ? false : true;
  curAction.value = {
    action,
    title,
    showInput,
    curValue: name || "",
    id
  };
  if (action === "edit") inputName.value = name;
  visible.value = true;
};
</script>
