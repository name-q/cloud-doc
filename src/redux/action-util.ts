import { Dispatch } from './types';

export function getActionProxy (action:any) {
  return ( (dispatch: Dispatch) => {
    return action(dispatch);
  } ) as any ;
}