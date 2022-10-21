<template>
  <view :class="styles.body">
    <view :class="styles.container">
      <view :class="styles.head">
        <!-- <img :class="logo" /> -->
        <view :class="styles.name">
          <view :class="styles.title">今夜月色真美</view>
          <view :class="styles.tips"></view>
        </view>
      </view>
      <view :class="styles.form">
        <nut-form :model-value="state.ruleForm" ref="loginForm">
          <nut-form-item
            :rules="state.rules.username"
            prop="username"
            label="账号"
          >
            <input
              v-model.trim="state.ruleForm.username"
              placeholder="请输入账号"
              autocomplete="off"
              type="text"
            />
          </nut-form-item>
          <nut-form-item
            :rules="state.rules.password"
            prop="password"
            label="密码"
          >
            <input
              v-model.trim="state.ruleForm.password"
              placeholder="请输入密码"
              autocomplete="off"
              type="password"
            />
          </nut-form-item>
          <nut-form-item>
            <view :class="styles.opts">
              <view style="color: #121212; margin-bottom: 16px;"
                >登录表示您已同意<text style="color: #3499d8"
                  >《服务条款》</text
                ></view
              >
              <nut-button
                style="width: 100%"
                color="#ff6188"
                shape="square"
                type="primary"
                @tap="submit"
                >立即登录</nut-button
              >
              <!-- <nut-checkbox v-model="state.checked" @change="!state.checked"
                >下次自动登录</nut-checkbox
              > -->
            </view>
          </nut-form-item>
        </nut-form>
      </view>
    </view>
  </view>
</template>

<script setup>
import { promiseCatcher, handleError } from "@/utils";
import { reactive, ref, toRefs } from "vue";
import styles from "./index.module.scss";
import Taro from "@tarojs/taro";
import API from "./api";

const loginForm = ref(null);
const state = reactive({
  ruleForm: {
    username: "",
    password: ""
  },
  checked: true,
  rules: {
    username: [{ required: "true", message: "账户不能为空", trigger: "blur" }],
    password: [{ required: "true", message: "密码不能为空", trigger: "blur" }]
  }
});

const submit = () => {
  loginForm.value.validate().then(async valid => {
    if (valid) {
      const [err, data] = await promiseCatcher(
        API.login({
          username: state.ruleForm.username,
          password: state.ruleForm.password
        })
      );
      if (err) handleError(err);
      Taro.setStorageSync("user", data);
      Taro.switchTab({ url: "/pages/index/index" });
    } else {
      return false;
    }
  });
};
const resetForm = () => {
  loginForm.value.resetFields();
};
</script>
