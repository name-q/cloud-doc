import cache from "./cache";
const crypto = require('crypto-js');

// 判断是否登入 登入返回QWT
export function isLogin() {
  let data = getStorage(cache.LOGIN_DATA);
  if (data) return data
  return '';
}

// 插入缓存 可设置过期时间SSS 0-永不删除
export function setStorage(key, data, expiration = 0) {
  expiration = expiration ? expiration + new Date().getTime() : 0
  let value = JSON.stringify({ expiration, data })
  localStorage.setItem(key, value)
}

// 获取缓存 如缓存过期则删除缓存并返回false
export function getStorage(key) {
  let data = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data)
    if (data.expiration === 0) return data.data
    if (data.expiration <= new Date().getTime()) {
      removeStorage(key)
      return false
    } else {
      return data.data
    }
  }
  return false
}

// 删除缓存
export function removeStorage(key) {
  localStorage.removeItem(key)
}

// 删除所有缓存
export function removeStorageAll() {
  localStorage.clear()
}

// 获取MD5值
export function getMd5(data, salt = '') {
  if (!data) return '';
  data = data.toString() + salt
  return crypto.MD5(data).toString()
}