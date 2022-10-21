import { Button, Icon, Input, Form, FormItem, Checkbox, Cell, CellGroup, Grid, GridItem, Menu, MenuItem, OverLay, Popup, SearchBar } from "@nutui/nutui-taro";
import { createApp } from 'vue'
// import Taro from "@tarojs/taro";
import './assets/iconfont/iconfont.css';
import './app.css'

const App = createApp({
  onShow() {
    // const { token } = Taro.getStorageSync("user");
    // if (token) { Taro.switchTab({ url: "/pages/index/index" }) }
    // else {
    //   Taro.showToast({ title: "请登录", icon: 'none', success: () => Taro.redirectTo({ url: "/pages/login/index" }) },)
    // }
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(Button).use(Cell).use(Icon).use(Input).use(Form).use(FormItem).use(Checkbox).use(Cell).use(CellGroup).use(Grid).use(GridItem).use(Menu).use(MenuItem).use(OverLay).use(Popup).use(SearchBar);

export default App
