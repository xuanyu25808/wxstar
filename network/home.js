import {
  request
} from './request'
// 请求轮播图和推荐图片数据
export function getTopData() {
  return request({
    url: '/home/multidata'
  })
}
// 请求商品数据
export function getGoodsData(type,page){
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}