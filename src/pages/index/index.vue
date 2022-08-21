<template>
  <view class="index">
    <text
      >{{
        msg
      }}三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四三倒四</text
    >
  </view>
  <nut-button type="primary" size="large">主要按钮</nut-button>
  <nut-button type="info">信息按钮</nut-button>
  <nut-button type="default">默认按钮</nut-button>
  <nut-button type="danger">危险按钮</nut-button>
  <nut-button type="warning">警告按钮</nut-button>
  <nut-button type="success">成功按钮</nut-button>
</template>

<script>
import { ref } from "vue";
import "./index.scss";

export default {
  setup() {
    const msg = ref("Hello world");
    return {
      msg
    };
  }
};
</script>
