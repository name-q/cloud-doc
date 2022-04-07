import { IAllReducerProps } from './types';

export function store2Props({ overviewMain }: any): IAllReducerProps {
  return {
    main: overviewMain
  };
}