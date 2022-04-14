import { Command } from '../constant';
import { Dispatch } from '@/redux/types';
import { getActionProxy } from '@/redux/action-util';
import Action from './action';

import { asyncSend } from '@/kit/ipc'

// eslint-disable-next-line
export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      asyncSend('changeWindowsSize','350,650')
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
