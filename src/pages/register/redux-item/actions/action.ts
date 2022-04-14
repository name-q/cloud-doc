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
    async register(body) {
      let { result } = await Fetch('/api/registerAnAccount', {
        method: 'POST',
        body,
        publicApi: true,
        noCache:true
      })
      if (result.code === 1) {
        message.success('注册成功')
        history.goBack()
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
    main: getReducerData('registerMain'),
  };
}