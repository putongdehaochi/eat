import {
  Button, Icon, Input, Form, FormItem, Checkbox, Cell, CellGroup, Grid, GridItem,
  Menu, MenuItem, OverLay, Popup, SearchBar, List, Barrage, BackTop, Dialog
} from "@nutui/nutui-taro";
import { createApp } from 'vue'
// import Taro from "@tarojs/taro";
import './assets/iconfont/iconfont.css';
import './app.css'
import { loadWeatherData } from "./pages/index/api";

const App = createApp({
  onShow() {
    // const { token } = Taro.getStorageSync("user");
    // if (token) { Taro.switchTab({ url: "/pages/index/index" }) }
    // else {
    //   Taro.showToast({ title: "请登录", icon: 'none', success: () => Taro.redirectTo({ url: "/pages/login/index" }) },)
    // }
  },

  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  onLaunch: function () {
    //加载天气数据
    var citySelected = wx.getStorageSync('citySelected') || [];
    if (citySelected.length == 0) {
      citySelected.unshift("__location__");
      wx.setStorageSync('citySelected', citySelected);
    }

    var that = this
    for (var idx in citySelected) {
      var cityCode = citySelected[idx];
      loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = wx.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        wx.setStorageSync('weatherData', weatherData);
      });
    }
  },

})
App.use(Button).use(Cell).use(Icon).use(Input).use(Form)
  .use(FormItem).use(Checkbox).use(Cell).use(CellGroup).use(Grid).use(GridItem)
  .use(Menu).use(MenuItem).use(OverLay).use(Popup).use(SearchBar).use(List).use(Barrage).use(BackTop).use(Dialog);

export default App
