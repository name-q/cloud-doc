import { Dispatch } from './types';

export function getActionProxy<T>(action): T {
  return ( (dispatch: Dispatch) => {
    return action(dispatch);
  } ) as any ;
}