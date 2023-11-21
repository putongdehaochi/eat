<template>
  <view :class="styles.container">
    <nut-empty image="empty" description="我不想工作"></nut-empty>
    {{ ((code) => {
      depRelation = code;
      if (!depRelation) return;
      return evalCode(code)
    })() }}
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import styles from "./index.module.scss";
import { List } from "./constant.ts";
import { window } from '@tarojs/runtime'
import { Function, Interpreter } from "eval5";

let depRelation = null;
let externals = {
  // '@nutui/nutui-react-taro': require('@nutui/nutui-react-taro'),
  // "@tarojs/components": require("@tarojs/components"),
  // 'react/jsx-runtime': require('react/jsx-runtime'),
  // '@tarojs/runtime': require('@tarojs/runtime'),
  // '@nutui/nutui-react-taro/dist/style.css': require('@nutui/nutui-react-taro/dist/style.css'),
  // "@tarojs/extend": require("@tarojs/extend"),
  // "@tarojs/taro": require("@tarojs/taro"),
  // 'classnames': require('classnames'),
  // 'lodash': require('lodash-es'),
  // 'eval5': require('eval5'),
  // react: require("react"),
};

const _require = (moduleName) => {
  const modules = externals;
  if (modules[moduleName]) {
    return modules[moduleName];
  }

  throw new Error(
    `找不到'${moduleName}模块'，可选模块有：${Object.keys(modules).join(", ")}`
  );
};

function compileFunction(
  code,
  params,
  options
) {
  const ctx = options.parsingContext
  const timeout = options.timeout === undefined ? 0 : options.timeout

  const wrapCode = `
    (function anonymous(${params.join(',')}){
         ${code}
    });
    `

  const interpreter = new Interpreter(ctx, {
    ecmaVersion: options.ecmaVersion,
    timeout,
    // rootContext: options.rootContext,
    rootContext: window,
    globalContextInFunction: options.globalContextInFunction,
  })
  return interpreter.evaluate(wrapCode)
}

const evalCode = (code) => {
  try {
    console.log(+new Date(), 'enter');
    const fn = compileFunction(
      `var require = arguments[0], exports = arguments[1];\n ${code}`
    );
    const exports = { default: null };
    fn.call(null, _require, exports);
    // return () => exports.default;
    return exports.default

  } catch (error) {
    console.log(error);
  }
};

</script>

<style lang="scss"></style>
