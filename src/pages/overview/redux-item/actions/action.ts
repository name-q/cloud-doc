import { Command } from '../constant';
import { Dispatch } from '@/redux/types';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';

import { Fetch } from '@/kit/index'
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

    // 获取用户信息
    async getUserInfo() {
      let { result } = await Fetch('/api/getUserInfo',{noCache:false})
      if (result.code !== 1) message.error(result)

      message.success('获取用户信息成功')
      
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