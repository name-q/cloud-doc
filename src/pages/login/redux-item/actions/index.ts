import { Command } from '../constant';
import { Dispatch } from '@/redux/types';
import { getActionProxy } from '@/redux/action-util';
import Action from './action';

// eslint-disable-next-line
export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      dispatch({
        type: Command.init,
        payload: {
          main: {
            testText: 'redux test output'
          },
        },
      });
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
