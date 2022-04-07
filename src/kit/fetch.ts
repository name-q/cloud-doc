import 'whatwg-fetch';
import config from '../config';
import { isLogin, getMd5, getStorage, setStorage, history, removeStorage, cache } from './index';
import * as _ from 'lodash';

/**
 * 定义异步返回结果
 */
export interface IAsyncResult {
  result: {
    code: number,
    msg?: string,
    data?: any
  };
}

// 补充： publicApi-是否是公开接口（qwt不存在依旧可以访问） noCache-不要缓存接口值（有验证码或动态访问的接口不要缓存）
interface RequestInitx extends RequestInit {
  publicApi?: boolean
  noCache?:boolean
}

/**
 * 封装业务fetch
 * @param api 输入url等
 * @param init 初始化http header信息等
 */
export default async function Fetch(
  api: RequestInfo,
  init?: RequestInitx
): Promise<IAsyncResult> {
  try {
    let qwt = isLogin()
    // @ts-ignore
    if ((!qwt && !init.publicApi) || !api) throw new error('未登入且不是公共接口 或未传接口则直接退出')

    // 设置缓存的key
    let storageKey = api

    // GET
    if (typeof api === 'string') {
      storageKey += '_GET'
      api += `${api.indexOf('?') === -1 ? '?reqId=' : '&reqId='
        }${Math.random()}`;
    }


    const request = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        qwt,
      },
    };
    let r = init?.body;
    // POST
    if (r) {
      init.body = JSON.stringify(trimValueDeep(r as string));
      storageKey += '_POST'
      storageKey += init.body
    }
    const merge = Object.assign({}, request, init);

    // 如果无缓存则查询接口 并将接口返回的成功值缓存1mm
    storageKey = getMd5(storageKey)
    let storage = getStorage(storageKey)
    let resJSON = storage
    if (!storage) {
      // 去掉url中可能存在的//
      let url = config.HOST + api;
      url = url.replace(/([^:])\/\//, '$1/');
      const result = await fetch(url, merge);
      resJSON = await result.json();
      if (resJSON.code === 1 && !init.noCache) {
        setStorage(storageKey, JSON.stringify(resJSON), 60000)
      }
      if (resJSON.code === 2) {
        removeStorage(cache.LOGIN_DATA)
        history.push('/login')
        return
      }
    }

    return {
      result: resJSON
    };

  } catch (err) {
    //dev
    if (process.env.NODE_ENV !== 'production') {
      console.log(err);
    }
    return {
      result: {
        code: 0,
        msg: '操作失败'
      }
    }
  }
}

/**
 * 所有请求参数trim
 * @param value
 */
function trimValueDeep(value) {
  return value && !_.isNumber(value) && !_.isBoolean(value) && !_.isDate(value)
    ? _.isString(value)
      ? _.trim(value)
      : _.isArray(value)
        ? _.map(value, trimValueDeep)
        : _.mapValues(value, trimValueDeep)
    : value;
}
