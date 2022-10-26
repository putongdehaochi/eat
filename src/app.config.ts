export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/work/index',
    'pages/love/index',
    'pages/mine/index',
    'pages/index/detail/detail',
    'pages/index/setting/setting',
  ],
  subPackages: [
    {
      "root": "pages/movie",
      "name": "movie",
      "pages": [
        'index',
      ]
    },
    {
      "root": "pages/opus",
      "name": "opus",
      "pages": [
        'index',
        'food/index'
      ]
    },
    {
      "root": "pages/food",
      "name": "food",
      "pages": [
        'index',
      ]
    },
    {
      "root": "pages/music",
      "name": "music",
      "pages": [
        'index',
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffe9ee',
    navigationBarTitleText: '火锅乌龙茶',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#939293",
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
        pagePath: 'pages/love/index',
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
