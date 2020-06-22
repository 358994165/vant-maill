import { request } from './request'

export function getCategoru() {
  return request({
    url: '/category'
  })
}
export function getTop() {
  return request({
    url: '/subcategory?maitKey=5253'
  })
}
export function getBut() {
  return request({
    url: '/subcategory/detail?miniWallkey=10062603&type=new'
  })
}
