import { Command } from '../constant';
import { Dispatch } from '@/redux/types';
import { getActionProxy } from '@/redux/action-util';
import Action from './action';

import { Fetch } from '@/kit/index'

// eslint-disable-next-line
export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      let { result } = await Fetch('/api/ping', {
        noCache:true
      })
    },

    /**
     * 重置
     */
    async clean() {
      dispatch({ type: Command.clean });
    },
  };

  return { actions };
};
