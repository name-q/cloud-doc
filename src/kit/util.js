import cache from "./cache";

export function isLogin() {
  let data = localStorage.getItem(cache.LOGIN_DATA);
  if (data) return true
  return false;
}