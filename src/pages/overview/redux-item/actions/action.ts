import { Command } from '../constant';
import { Dispatch } from '@/redux/types';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';

import { Fetch, setStorage, cache, history } from '@/kit/index'
import { message } from 'antd';

// eslint-disable-next-line
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    // 登入
    async login(body) {
      let { result } = await Fetch('/api/loginAccount', {
        method: 'POST',
        body,
        publicApi: true,
        noCache:true
      })
      if (result.code === 1) {
        // 储存有效期为3周的 QWT
        setStorage(cache.LOGIN_DATA, result.data, 1814400000)
        message.success('登入成功')
        history.push('/')
      }else{
        message.error(result.msg)
        return 'RefreshCode'
      }
    }


  };
  return action;
};

// eslint-disable-next-line
function getData(): IAllReducerProps {
  return {
    main: getReducerData('overviewMain'),
  };
}