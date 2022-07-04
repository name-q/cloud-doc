import { IAllReducerProps } from './types';

export function store2Props({ homeMain }: any): IAllReducerProps {
  return {
    main: homeMain
  };
}