import { Command } from '../constant';
import { Dispatch } from '@/redux/types';
import { IAllReducerProps } from '../types';
import { getReducerData } from '@/redux/store';
import { extraPathsValue } from '@/redux/util';

// eslint-disable-next-line
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },
  };
  return action;
};

// eslint-disable-next-line
function getData(): IAllReducerProps {
  return {
    main: getReducerData('loginMain'),
  };
}