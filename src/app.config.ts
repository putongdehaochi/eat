export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/work/index',
    'pages/chest/index',
    'pages/mine/index',
    'pages/movie/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffe9ee',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#121212",
    selectedColor: "#ff6188",
    backgroundColor: "#ffe9ee",
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home_selected.png',
      },
      {
        pagePath: 'pages/work/index',
        text: '工作',
        iconPath: 'assets/tabbar/work.png',
        selectedIconPath: 'assets/tabbar/work_selected.png',
      },
      {
        pagePath: 'pages/chest/index',
        text: '喜欢',
        iconPath: 'assets/tabbar/heart.png',
        selectedIconPath: 'assets/tabbar/heart_selected.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tabbar/user.png',
        selectedIconPath: 'assets/tabbar/user_selected.png',
      }
    ]
  }
})
