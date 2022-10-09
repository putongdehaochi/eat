export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/index/index',
    'pages/work/index',
    'pages/chest/index',
    'pages/mine/index',
    'pages/movie/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#515151",
    selectedColor: "#1296db",
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home_selected.png',
      },
      {
        pagePath: 'pages/work/index',
        text: '工作台',
        iconPath: 'assets/tabbar/work.png',
        selectedIconPath: 'assets/tabbar/work_selected.png',
      },
      {
        pagePath: 'pages/chest/index',
        text: '百宝箱',
        iconPath: 'assets/tabbar/message.png',
        selectedIconPath: 'assets/tabbar/message_selected.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tabbar/mine.png',
        selectedIconPath: 'assets/tabbar/mine_selected.png',
      }
    ]
  }
})
