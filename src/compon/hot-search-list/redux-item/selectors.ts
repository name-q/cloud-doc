import { IAllReducerProps } from './types';

export function store2Props({ hotSearchListMain }: any): IAllReducerProps {
  return {
    main: hotSearchListMain
  };
}