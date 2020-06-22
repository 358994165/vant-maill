import { request } from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export class GoodsParam {
  constructor (info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}