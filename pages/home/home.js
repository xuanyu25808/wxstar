// pages/home/home.js
import {
  getTopData,
  getGoodsData
} from '../../network/home'
Page({
  data: {
    banners: [],
    recommend: [],
    title: ['流行', '精选', '可爱'],
    goods: [{
        type: 'pop',
        page: 0,
        list: []
      },
      {
        type: 'new',
        page: 0,
        list: []
      },
      {
        type: 'sell',
        page: 0,
        list: []
      }
    ],
    currentIndex: 0,
  },
  onLoad: function () {
    // 请求轮播图和推荐图片数据
    this.getTopData()
    // 请求商品列表数据,请求三次
    for (let index = 0; index < this.data.title.length; index++) {
      this.getGoodsData(index)
    }
  },
  /**
   * 网络请求方法
   */
  // 请求轮播图和推荐图片数据
  getTopData() {
    getTopData().then(res => {
      this.setData({
        banners: res.data.data.banner.list,
        recommend: res.data.data.recommend.list
      })
    }).catch(err => {
      console.log(err);
    })
  },
  // 请求商品列表数据
  getGoodsData(index) {
    let tempGoods = this.data.goods[index]
    let type = tempGoods.type
    let page = tempGoods.page + 1
    getGoodsData(type, page).then(res => {
      // 获取list
      const list = res.data.data.list
      const oldList = tempGoods.list
      oldList.push(...list)
      const goodsKey = `goods[${index}].list`
      const pageKey = `goods[${index}].page`
      this.setData({
        [goodsKey]: oldList,
        [pageKey]: page
      })
      console.log(this.data.goods[index]);
    })
  },
  /**
   * 事件监听方法
   */
  // 选项卡切换
  tabClick(e) {
    let index = e.detail.index
    this.setData({
      currentIndex: index,
    })
  },
  // 上拉加载更多
  onReachBottom:function(){
    console.log(123);
    this.getGoodsData(this.data.currentIndex)
  }
})